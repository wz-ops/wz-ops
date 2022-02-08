<template>
  <div class="container">
    <div class="container_content clear-fix bg_white">
      <div class="container_top">
        <input type="text" name="" id="searchText" @keydown.enter="searchKeyArt" v-model="key" @blur="backInitArt" placeholder="请输入搜索内容" />
        <span class="search_btn" @click="searchKeyArt">搜索</span>
      </div>
      <div class="container_bottom clear-fix">
        <div class="left_team">
          <ul class="team_ls">
            <li v-for="item in teamList" :key="item.id" @click="earnArt(item.id)">
              <i class="collect"></i>
              <span class="team" :class="publicId === item.id ? 'actived' : ''">{{ item.name }}</span>
            </li>
          </ul>
        </div>
        <div class="public_right_art">
          <div class="public_right_art_content">
            <Article :artData="artData">
              <template v-slot:bottom_desc="{ item }">
                <span class="aniceDate">时间：{{ item.niceDate || item.niceShareDate }}</span>
              </template>
            </Article>
            <ElementuiPagination @earnPage="againArt" :artData="artData" :totalPage="totalPage" :total="total" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onBeforeUnmount } from 'vue'
import useelementuipagination from '@/hooks/useelementuipagination.js'
import { getChapters, getPublicArt, getHistoryPublicArt } from '@/api/index.js'
import Article from '@/components/Article/Article.vue'
import ElementuiPagination from '@/components/Pagination/ElementuiPagination.vue'
export default {
  name: 'Public',
  components: { Article, ElementuiPagination },
  emits: ['showFooter'],
  setup(_, { emit }) {
    // 公众号队伍
    const teamList = reactive([])
    // 公众号id
    const publicId = ref(408)
    // 关键字 ==> 双向绑定
    const key = ref('')
    const { earnArt, commonCode, artData, changePage, curPage, pageSize, total, totalPage } = useelementuipagination(emit, getPublicArtFun, publicId)
    async function getChaptersFun() {
      const result = await getChapters()
      if (result.data.errorCode === 0) {
        // 说明数据请求成功且数据正确,把数据解构到 teamList中
        teamList.push(...result.data.data)
      }
    }
    async function getPublicArtFun(id, size, pageSize) {
      const result = await getPublicArt(id, size, pageSize)
      commonCode(result)
    }
    // 按搜索键和键盘enter键触发
    async function searchKeyArt() {
      // key为空就没必要请求,浪费资源
      // if (key.value === '') return
      const result = await getHistoryPublicArt({ publicId: publicId.value, size: curPage.value, page_size: pageSize.value, key: key.value })
      commonCode(result)
    }
    // 当 key值再输入后又被清空时触发
    function backInitArt() {
      if (key.value === '') {
        changePage(getPublicArtFun)
      }
    }
    // 当页码值变化时调用(页码值由分页子组件传来)
    function againArt(id) {
      curPage.value = id
      changePage(getPublicArtFun)
    }

    // 初始化公众号队伍数据
    getChaptersFun()
    // 初始化数据
    getPublicArtFun(publicId.value, curPage.value, pageSize.value)
    onBeforeUnmount(() => {
      // 卸载前把footer组件隐藏
      emit('showFooter', true)
    })
    return {
      teamList,
      artData,
      curPage,
      pageSize,
      total,
      totalPage,
      publicId,
      againArt,
      changePage,
      earnArt,
      searchKeyArt,
      backInitArt,
      key
    }
  }
}
</script>

<style lang="less" scoped>
.container_bottom {
  .left_team {
    width: 30%;
    text-align: center;
    float: left;
    .team_ls {
      .collect {
        display: inline-block;
        width: 30px;
        height: 30px;
        background: url('../../assets/img/top_icon.svg') no-repeat center center;
        vertical-align: middle;
        margin-right: 10px;
        cursor: pointer;
        &:hover {
          background: url('../../assets/img/top_icon_hover.svg') no-repeat center center;
        }
      }
      .team {
        display: inline-block;
        padding: 12px 0 12px 5px;
        width: 130px;
        color: #484848;
        border-bottom: 1px solid #dbe2e8;
        cursor: pointer;
        &:hover {
          color: #2782ef;
          border-bottom: 1px solid #2782ef;
        }
        &.actived {
          color: #2782ef;
          border-bottom: 1px solid #2782ef;
        }
      }
    }
  }
  .public_right_art {
    width: 70%;
    float: left;
    .public_right_art_content {
      width: 90%;
    }
  }
}
</style>
