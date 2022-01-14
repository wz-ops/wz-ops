<template>
  <div class="container mt3">
    <div class="assortBox">
      <div class="assort" v-if="assort">
        <div class="one_two_assort">
          <label>一级分类:</label>
          <ul class="one_two_assort_list clear-fix">
            <li v-for="item in assort" :key="item.id" @click="showSecondAssort(item.children, item.id)">
              <span :class="curOneId === item.id ? 'cur_assort' : ''">{{ item.name }}</span>
            </li>
          </ul>
        </div>
        <div class="one_two_assort cancel_mborder">
          <label>二级分类:</label>
          <ul class="one_two_assort_list clear-fix">
            <li v-for="item in secondAssortList" :key="item.id" @click="currentTwoAssort(item.id)">
              <span :class="curTwoId === item.id ? 'cur_assort' : ''">{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container_content container_content_mt30 clear-fix">
      <div class="container_content_left">
        <Article :artData="artData">
          <template v-slot:bottom_desc="{ item }">
            <span class="tag" v-for="(tag, index) in item.tags" :key="index">
              <a href="">{{ tag.name }}</a>
            </span>
            <span class="author">
              分享人： <a href="#">{{ item.shareUser }}</a>
            </span>
            <span class="achapter">
              分类：
              <a href="#">{{ item.superChapterName }}</a>
              /
              <a href="#">{{ item.chapterName }}</a>
            </span>
            <span class="aniceDate">时间：{{ item.niceDate }}</span>
          </template>
        </Article>
      </div>
      <div class="container_content_right" v-if="artData.length">
        <Search />
        <SearchKey title="大家都在搜" />
      </div>
    </div>
  </div>
  <Loading :loading="loading" />
</template>

<script>
// 导入 分类 及 分类文章的 接口
import { getSystemAssort, getSystemArt } from '@/api/index.js'
// 导入 下拉加载更多hook
import usescrollAssortLoad from '@/hooks/usescrollAssortLoad.js'
// 导入 文章组件
import Article from '@/components/Article/Article.vue'
// 导入 加载组件
import Loading from '@/components/Loading/Loading.vue'
// 导入 搜索组件
import Search from '@/components/Search/Search.vue'
// 导入 搜索热词组件
import SearchKey from '@/components/SearchKey/SearchKey.vue'
export default {
  name: 'System',
  components: { Article, Loading, SearchKey, Search },
  emits: ['showFooter'],
  setup(_, { emit }) {
    const { loading, assort, secondAssortList, curTwoId, curOneId, artData, showSecondAssort, currentTwoAssort } = usescrollAssortLoad({ emit, callback: getSystemArt, callback1: getSystemAssort })
    return {
      showSecondAssort,
      secondAssortList,
      currentTwoAssort,
      loading,
      assort,
      curTwoId,
      curOneId,
      artData
    }
  }
}
</script>

<style lang="less" scoped>
.mt3 {
  margin-top: 3px;
}
.assortBox {
  background-color: #1f77bb;
  color: white;
  .assort {
    width: 1260px;
    max-width: 1260px;
    margin: 0 auto;
    .one_two_assort {
      padding: 20px 0;
      border-bottom: 1px solid #4488bb;
      font-size: 14px;
      &.cancel_mborder {
        border-bottom: none;
      }
      > label {
        float: left;
        padding: 12px 0;
      }
      .one_two_assort_list {
        margin-left: 80px;
        > li {
          float: left;
          padding: 10px;
          > span {
            cursor: pointer;
            padding: 4px 5px;
            &:hover {
              text-decoration: underline;
            }
            &.cur_assort {
              border: 1px solid white;
              border-radius: 3px;
            }
          }
        }
      }
    }
  }
}
.container_content_mt30 {
  margin-top: 30px;
}
</style>
