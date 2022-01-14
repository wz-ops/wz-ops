<template>
  <div class="container">
    <div class="container_content clear-fix">
      <div class="container_content_left">
        <div class="block">
          <h2 class="title">热门项目</h2>
        </div>
        <Article :artData="artData">
          <template v-slot:bottom_desc="{ item }">
            <div class="art_desc">{{ item.desc }}</div>
            <span class="aniceDate">时间：{{ item.niceShareDate }}</span>
            <span class="author"> 作者：{{ item.author }} </span>
            <span class="same_art" @click="projectAssort(item.chapterId)"> 查看同类项目 </span>
          </template>
          <template v-slot:small_big_pic="{ item }">
            <div class="small_big_pic clear-fix">
              <div class="small_big_content">
                <a href="#">
                  <img :src="item.envelopePic" alt="" class="s_b_img" />
                </a>
              </div>
              <img :src="item.envelopePic" alt="" class="big_img" />
            </div>
          </template>
        </Article>
      </div>
      <div class="container_content_right">
        <Search />
        <div class="block user_ops">
          <a href="#" class="btn">本站开放API</a>
          <a href="#" class="btn">待办清单</a>
          <a href="#" class="btn">分享文章</a>
          <a href="#" class="btn">分享项目</a>
          <a href="#" class="btn new">本站APP下载</a>
          <a href="#" class="btn new">问答征集</a>
        </div>
      </div>
    </div>
  </div>
  <Loading :loading="loading" />
</template>

<script>
// 热门文章接口
import { getProjectArt } from '@/api/index.js'
// 导入 路由
import { useRouter } from 'vue-router'
// 导入向下加载更多的hooks
import usescrollLoad from '@/hooks/usescrollLoad.js'
// 导入文章组件
import Article from '@/components/Article/Article.vue'
// 导入加载组件
import Loading from '@/components/Loading/Loading.vue'
// 导入搜做组件
import Search from '@/components/Search/Search.vue'
export default {
  name: 'Project',
  components: { Article, Loading, Search },
  emits: ['showFooter'],
  setup(_, { emit }) {
    const { loading, artData } = usescrollLoad({ emit, callback: getProjectArt })
    // 获取路由实例
    const router = useRouter()
    // 编程式路由跳转
    function projectAssort(id) {
      router.replace({
        // params传参必须结合路由命名使用,使用path 不行
        name: 'projectClassification',
        params: {
          cid: id
        }
      })
    }
    return {
      loading,
      artData,
      projectAssort
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/public.less';
.art_desc {
  width: 100%;
  transform: translateY(-10px);
  color: #545c63;
  font-size: 14px;
}
.small_big_pic {
  float: right;
  width: 230px;
  height: 78px;
  &:hover {
    > .big_img {
      display: inline;
      animation: ani 0.4s ease-in-out forwards;
    }
  }
  .small_big_content {
    position: absolute;
    width: 230px;
    height: 78px;
    margin-top: 2%;
    overflow: hidden;
    top: 0;
    right: 30px;
    border-radius: 5px;
    > a {
      width: 250px;
      height: 78px;
      .s_b_img {
        width: 100%;
        height: auto;
      }
    }
  }
  .big_img {
    width: 230px;
    height: auto;
    position: absolute;
    right: 30px;
    filter: blur(20px);
    z-index: 9999;
    transform: scale(0);
    display: none;
    border-radius: 5px;
  }
}
:deep(.same_art) {
  color: black !important;
  cursor: pointer;
  &:hover {
    color: #2782ef !important;
    text-decoration: underline;
  }
}
@keyframes ani {
  0% {
    transform: scale(0);
    filter: blur(20px);
  }
  100% {
    transform: scale(1);
    filter: blur(0);
  }
}
</style>
