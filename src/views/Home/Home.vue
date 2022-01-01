<template>
  <div class="home">
    <div class="home_content clear-fix">
      <div class="home_left">
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
            <HoemArticle :pageSize="size">
              <template v-slot:bottom_desc="{ item }">
                <span class="istop">置顶</span>
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
            </HoemArticle>
          </div>
        </div>
      </div>
      <div class="home_right">
        <form action="">
          <input type="text" class="home_r_search" placeholder="搜索关键字以空格形式隔开" />
          <span class="search"></span>
        </form>
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
        <div class="block key mt20">
          <h2 class="title"><span>搜索热词</span></h2>
          <ul class="clear-fix key-ul">
            <li v-for="item in key" :key="item.id">
              <a :href="rootUrl + '/article/query?k=' + item.name">{{ item.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <Loading :loading="loading" />
</template>

<script>
// getCurrentInstance 组件实例中通过 getCurrentInstance 获取proxy，再获取全局挂载的实例
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { getWebsite, getTools, getChecks, getKey } from '@/api/index.js'
import HomeBanner from '@/components/HomeBanner/HomeBanner.vue'
import HoemArticle from '@/components/HomeArticle/HoemArticle.vue'
import ToolCheck from '@/components/ToolCheck/ToolCheck.vue'
import Loading from '@/components/Loading/Loading.vue'
export default {
  name: 'Home',
  components: { HomeBanner, HoemArticle, ToolCheck, Loading },
  setup() {
    // 获取全局定义的数据
    const { proxy } = getCurrentInstance()
    // 网站根地址
    const rootUrl = proxy.$rootUrl
    // 常用网站的数据
    const websiteLs = reactive([])
    // 工具及速查数据
    const toolCheckList = reactive([])
    let size = ref(20)
    // 搜索热词数据
    const key = reactive([])
    let loading = ref(true)
    onMounted(() => {
      // 获取常用网站的数据
      getWebsitefun()
      // 获取 常用工具数据
      getToolsfun()
      // 获取 速查数据
      getChecksfun()
      // 获取 搜索热词数据
      getKeyFun()

      // 监听页面滚动事件
      window.addEventListener('scroll', () => {
        // 获取可视区域的高度
        let wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        // 获取被卷去的文档的高度
        let srollWh = document.documentElement.scrollTop || document.body.scrollTop
        // 获取 文档的高度(获取文档可滚动的高度)
        let docWh = document.documentElement.scrollHeight || document.body.scrollHeight
        if (Math.ceil(wh + srollWh) === docWh) {
          console.log(1231)
          size.value += 5
          if (size.value > 40) {
            // 接口问题 // 接口描述只能传 1-40的值,但是 大于 40很多也没错且有数据加载,只是重复而已
            size.value = 40
            loading.value = false
            return
          }
        }
      })
    })
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
    async function getKeyFun() {
      // 获取 搜索热词数据
      let result = await getKey()
      if (result.status === 200) {
        // 请求成功把数据变成模板可用的响应式数据
        const {
          data: { data: res }
        } = result
        key.push(...res)
      }
    }
    return {
      rootUrl,
      websiteLs,
      toolCheckList,
      key,
      size,
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
  width: 100%;
  height: 100%;
  margin-top: 30px;
  .home_content {
    width: 1260px;
    max-width: 1260px;
    margin: 0 auto;
    // background: gold;
    .home_left {
      width: 73%;
      margin-right: 2%;
      float: left;
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
      width: 25%;
      float: left;
      form {
        width: 99%;
        position: relative;
        height: 33px;
        border-radius: 10px;
        margin-bottom: 15px;
        background-color: #fafafa;
        border: 1px solid #dadada;
        .home_r_search {
          width: 178px;
          padding-left: 10px;
          border-radius: 10px;
          background-color: #fafafa;
          box-sizing: border-box;
          height: 33px;
          line-height: 33px;
          outline: none;
          &::placeholder {
            font-size: 14px;
          }
        }
        .search {
          width: 40px;
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
          cursor: pointer;
          background: url('../../assets/img/search_icon.svg') no-repeat center center;
        }
      }
      .user_ops {
        padding: 10px;
        .btn {
          display: inline-block;
          padding: 12px;
          background-color: #3498db;
          color: white;
          margin-right: 12px;
          margin-bottom: 12px;
          border-radius: 3px;
          position: relative;
        }
      }
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
      .key {
        .key-ul {
          margin-top: 10px;
          li {
            float: left;
            margin: 8px 10px;
            > a {
              font-size: 14px;
              color: #3367d6;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>
