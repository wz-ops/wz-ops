<template>
  <div class="el_pagination" v-if="artData.length">
    <div class="el_pagination_content clear-fix">
      <span>
        <el-pagination :hide-on-single-page="true" :page-count="totalPage" @click="changePage" v-model:current-page="curPage" background prev-text="上一页" next-text="下一页" layout="prev, pager, next"> </el-pagination>
      </span>
      <span class="total_page"
        >共 <span>{{ totalPage }}</span> 页</span
      >
      <span class="total_record"
        >共 <span>{{ total }}</span> 条记录</span
      >
    </div>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
export default {
  name: 'ElementuiPagination',
  props: {
    // 总页数
    totalPage: Number,
    // 总记录
    total: Number,
    // 文章数据列表
    artData: Array
  },
  components: {},
  emits: ['earnPage'],
  setup(_, { emit }) {
    const curPage = ref(1)
    // 当页码变化时调用
    function changePage() {
      // 把 curPage的值传给 父级组件
      emit('earnPage', curPage.value)
    }
    return {
      changePage,
      curPage
    }
  }
}
</script>
<style lang="less" scoped>
.el_pagination {
  height: 90px;
  position: relative;
  .el_pagination_content {
    position: absolute;
    right: 0;
    top: 30px;
    > span {
      float: left;
    }
    .total_page,
    .total_record {
      line-height: 30px;
      margin-left: 15px;
      font-size: 14px;
      > span {
        color: #2782ef;
      }
    }
  }
}
</style>
