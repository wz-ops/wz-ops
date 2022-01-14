<template>
  <div class="home container">
    <div class="home_content container_content clear-fix">
      <div class="home_left container_content_left">
        <HomeBanner />
        <div class="home_l_content">
          <div class="home_l_left">
            <div class="tag_block">
              <a href="#" target="_blank">站长在线招Android！</a>
            </div>
            <div class="block mt20">
              <div class="sidebar">
                <div class="sidebar_t_b">
                  <h3>推荐</h3>
                  <ul>
                    <li><a href="#" class="act">热门博文</a></li>
                    <li><a href="#">每日一问</a></li>
                  </ul>
                </div>
                <div class="sidebar_t_b">
                  <h3>专题</h3>
                  <ul>
                    <li><a href="#">面试相关</a></li>
                    <li><a href="#">性能优化</a></li>
                    <li><a href="#">framework</a></li>
                    <li><a href="#">开源库源码</a></li>
                    <li><a href="#">大厂分享</a></li>
                    <li><a href="#" class="more">去添加>></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="home_r_right">
            <Article :artData="artData" :ml="true">
              <template v-slot:fresh="{ item }">
                <span class="fresh" v-if="item.fresh">新</span>
              </template>
              <template v-slot:bottom_desc="{ item }">
                <span class="istop" v-if="item.type">置顶</span>
                <span class="tag" v-for="(tag, index) in item.tags" :key="index">
                  <a href="">{{ tag.name }}</a>
                </span>
                <span class="author" v-if="item.author">
                  作者： <a href="#">{{ item.author }}</a>
                </span>
                <span class="author" v-else>
                  分享人： <a href="#">{{ item.shareUser }}</a>
                </span>
                <span class="achapter">
                  分类：
                  <a href="#">{{ item.superChapterName }}</a>
                  /
                  <a href="#">{{ item.chapterName }}</a>
                </span>
                <span class="aniceDate">时间：{{ item.niceDate === '刚刚' ? item.niceDate : item.niceShareDate }}</span>
              </template>
              <template #more="{ item }">
                <div class="art_right_more">
                  <a :href="rootUrl + '/article/' + item.id + '/detail'" :title="item.title">...</a>
                </div>
              </template>
            </Article>
          </div>
        </div>
      </div>
      <div class="home_right container_content_right">
        <Search />
        <div class="block user_ops">
          <a href="#" class="btn">本站开放API</a>
          <a href="#" class="btn">待办清单</a>
          <a href="#" class="btn">分享文章</a>
          <a href="#" class="btn">分享项目</a>
          <a href="#" class="btn new">本站APP下载</a>
          <a href="#" class="btn new">问答征集</a>
        </div>
        <div class="block user_info mt20">
          <h2 class="title ellipsis"><span>个人信息&福利</span></h2>
          <ul class="proson-list">
            <li>
              <a target="_blank" href="#">消息中心: <span style="color: red">需登录</span></a>
            </li>
            <li>
              <a target="_blank" href="#">本站积分: <span style="color: red">需登录</span></a>
            </li>
            <li>
              <a target="_blank" href="#">积分规则</a>
              <a target="_blank" href="#" style="margin-left: 5px">积分排行榜</a>
            </li>
          </ul>
        </div>
        <div class="block mt20">
          <h2 class="title"><span>常用网站</span></h2>
          <template v-for="(ul, index) in websiteLs" :key="index">
            <ul class="link-list" :class="index === 0 ? 'first' : ''">
              <li class="bgBlue">
                <a>{{ ul[0].category }}:</a>
              </li>
              <li v-for="li in ul" :key="li.id">
                <a :href="li.link" target="_blank">{{ li.name }}</a>
              </li>
            </ul>
          </template>
        </div>
        <ToolCheck :toolChecks="toolCheckList"></ToolCheck>
        <div class="block contact mt20">
          <h2 class="title"><span>联系我们</span></h2>
          <ul class="proson-list">
            <li><a href="#">我要反馈</a></li>
            <li><a href="#">本站开放API</a></li>
            <li><a href="#">友情链接 </a></li>
            <li><a href="#">本站Apk下载</a></li>
            <li><a href="#">交流群：591683946</a></li>
            <li><a href="#">本站历史</a></li>
            <li><a href="#">商务合作</a></li>
            <li><a href="#">赞助本站</a></li>
          </ul>
        </div>
        <SearchKey title="搜索热词" />
      </div>
    </div>
  </div>
  <Loading :loading="loading" />
</template>

<script>
import { inject, reactive } from 'vue'
import { getWebsite, getTools, getChecks, getArt, getTopArt } from '@/api/index.js'
import usescrollLoad from '@/hooks/usescrollLoad.js'
import HomeBanner from '@/components/HomeBanner/HomeBanner.vue'
import Article from '@/components/Article/Article.vue'
import ToolCheck from '@/components/ToolCheck/ToolCheck.vue'
import Loading from '@/components/Loading/Loading.vue'
import Search from '@/components/Search/Search.vue'
import SearchKey from '@/components/SearchKey/SearchKey.vue'
export default {
  name: 'Home',
  components: { HomeBanner, Article, ToolCheck, Loading, Search, SearchKey },
  emits: ['showFooter'],
  setup(_, { emit }) {
    // let artData = reactive([])
    let topResult = reactive([])
    // 导入 hook (一个跟下拉加载 相关联 的函数)
    let { loading, artData } = usescrollLoad({ emit, callback: getArt })
    // 常用网站的数据
    const websiteLs = reactive([])
    // 工具及速查数据
    const toolCheckList = reactive([])
    // 注入 根路径
    const rootUrl = inject('rootUrl')
    // 获取常用网站的数据
    getWebsitefun()
    // 获取 常用工具数据
    getToolsfun()
    // 获取 速查数据
    getChecksfun()
    // 获取 普通文章列表
    // getArtFun(0, 16)
    // 获取置顶文章
    getTopArtfun()
    async function getWebsitefun() {
      // 获取常用网站的数据
      const result = await getWebsite()
      // 判断数据是否请求成功
      if (result.status === 200) {
        // 解构赋值 得到常用网站数据
        const arr1 = []
        const {
          data: { data: res }
        } = result
        let arr2 = []
        res.forEach((item, index) => {
          /*
            因为在我们加载对象的时候，用的是异步模式，
            即使promise立刻被处理返回，但是浏览器在开始加载对象的时候，
            这个对象还是没有定义，所以也就读不到属性
            解决办法: 模板中 {{res[index + 1]?.category}}
            forEach方法的问题: 可能遍历过快,获取 遍历异步
            数组中的三层数据会 报undefined 错误,
            解决办法: res[index + 1]?.category,加个问号
          */
          // console.log(item, index)
          if (item.category === res[index + 1]?.category) {
            // category值相同则把其归类到一个数组中
            arr2.push(item)
          } else {
            // 不相等则把最后一个对象追加到arr2中去
            arr2.push(item)
            // 把arr2 整体都追加到 arr1 数组中去
            arr1.push(arr2)
            // 把 arr2数组清空
            arr2 = []
          }
        })
        // 把 category 为 "设计" 的整合到一个数组中去
        // 获取arr1 数组中最后一个 category 为 "设计"的数组
        const shejiData1 = arr1[arr1.length - 1]
        // 把category 为 "设计"的数组整合到一个去,使其变为arr1数组的倒数第二的元素
        arr1[arr1.length - 3].push(...shejiData1)
        // 删除 arr1 数组的最后一个 category 为 "设计" 的 数组
        arr1.pop()
        // 追加到响应式数组中
        websiteLs.push(...arr1)
      }
    }
    async function getToolsfun() {
      // 获取 常用工具数据
      let result = await getTools()
      // console.log(result)
      if (result.status === 200) {
        // 把数据变成响应式数据且模板能访问
        toolCheckList.unshift(result.data.data)
      }
    }
    async function getChecksfun() {
      // 获取 速查数据
      let result = await getChecks()
      if (result.status === 200) {
        // 把数据变成响应式数据且模板能访问
        toolCheckList.push(result.data.data)
      }
    }
    async function getTopArtfun() {
      // 置顶文章
      const result = await getTopArt()
      if (result.status === 200) {
        // 解构赋值 置顶文章
        let {
          data: { data: res1 }
        } = result
        // 把置顶文章存储到 topResult响应数组中
        topResult.push(...res1)
        // 把置顶文章添加在文章列表 的 最前面
        artData.unshift(...topResult)
      }
    }
    // async function getArtFun(size, pageSize) {
    //   let i = 0
    //   // 注意: 一个异步函数 把 async await 后获得的数据返回出去 仍是一个promise对象
    //   // 非置顶文章
    //   let result = await getArt(size, pageSize)
    //   // 判断数据是否请求成功
    //   if (result.status === 200) {
    //     // 解构赋值 非置顶文章
    //     let {
    //       data: {
    //         data: { datas: res }
    //       }
    //     } = result
    //     // 清空原有的数据
    //     if (i === size.value) {
    //       artData.splice(len.value, artData.length)
    //     } else {
    //       i = size.value
    //       len.value = artData.length
    //     }
    //     // 三点运算符(把置顶与非置顶文章整合到一个数组中)
    //     artData.push(...res)
    //     // 去除重复
    //     for (let i = 0; i < artData.length; i++) {
    //       for (let j = i + 1; j < artData.length; j++) {
    //         if (artData[i].id == artData[j].id) {
    //           //第一个等同于第二个，splice方法删除第二个
    //           artData.splice(j, 1)
    //           j--
    //         }
    //       }
    //     }
    //   }
    // }
    return {
      rootUrl,
      artData,
      websiteLs,
      toolCheckList,
      loading
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/public.less';
.bgBlue {
  background-color: #1b93fb;
  line-height: 15px !important;
  > a {
    display: inline-block;
    padding: 0 6px;
    color: white !important;
    text-decoration: none !important;
  }
}
.home {
  // width: 100%;
  // height: 100%;
  // margin-top: 30px;
  .home_content {
    // width: 1260px;
    // max-width: 1260px;
    // margin: 0 auto;
    // background: gold;
    .home_left {
      // width: 73%;
      // margin-right: 2%;
      // float: left;
      .home_l_content {
        width: 100%;
        .home_l_left {
          width: 140px;
          float: left;
          .tag_block {
            height: 28px;
            line-height: 28px;
            background: #fffadd;
            font-size: 13px;
            text-align: center;
            color: #ad8b44;
            border: 1px solid #eadab8;
            border-radius: 3px;
          }
          .block {
            width: 100%;
            background-color: #fff;
            .sidebar {
              width: 120px;
              margin: 0 auto;
              // text-align: center;
              .sidebar_t_b {
                ul {
                  border-bottom: 1px solid #e2e2e2;
                  li {
                    > a {
                      display: block;
                      height: 30px;
                      line-height: 30px;
                      padding-left: 15px;
                      margin: 5px 0;
                      color: black;
                      font-size: 14px;
                    }
                    .act {
                      background-color: #1b93fb;
                      border-radius: 3px;
                      color: white;
                    }
                    .more {
                      text-decoration: underline;
                      color: #1b93fb;
                    }
                  }
                  li:hover > a {
                    background-color: #1b93fb;
                    border-radius: 3px;
                    color: white;
                    cursor: pointer;
                  }
                }
              }
              h3 {
                text-align: left;
                color: #276692;
                height: 40px;
                line-height: 40px;
                font-weight: bold;
              }
            }
          }
        }
        .home_r_right {
          width: calc(100% - 140px);
          float: left;
        }
      }
    }
    .home_right {
      // width: 25%;
      // float: left;
      .user_info {
        .ls();
      }
      .link-list {
        padding: 10px 15px;
        border-top: 1px dashed #e2e2e2;
        li {
          display: inline-block;
          margin: 3px 8px;
          line-height: 20px;
          > a {
            color: #767676;
            font-size: 14px;
          }
          > a:hover {
            color: #1b93fb;
            text-decoration: underline;
          }
        }
      }
      .contact {
        .ls();
      }
    }
  }
}
</style>
