<template>
  <div class="pagination">
    <div class="pagination_content">
      <span class="normal_page" :class="!(page - 1) ? 'disabled' : ''" @click="currentPage(1)">首页</span>
      <span class="normal_page" :class="!(page - 1) ? 'disabled' : ''" @click="upDownPage(false)">上一页</span>
      <span v-for="(todo, index) in pageCount" :class="curPage === todo ? 'disabled' : ''" @click="currentPage(todo)" :key="index">{{ todo }}</span>
      <span class="normal_page" :class="page === pageCount ? 'disabled' : ''" @click="upDownPage(true)">下一页</span>
      <span class="normal_page" :class="page === pageCount ? 'disabled' : ''" @click="currentPage(pageCount)">尾页</span>
      <span class="total_page">共 {{ pageCount }} 页</span>
      <span class="total_record">共 {{ total }} 条记录</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Pagination',
  props: {
    total: {
      default: 0,
      type: Number
    },
    pageCount: {
      default: 0,
      type: Number
    },
    curPage: {
      default: 1,
      type: Number
    }
  },
  emits: ['getNewCurPage'],
  setup(props, { emit }) {
    const page = ref(1)
    function currentPage(userClickPage) {
      if (page.value === userClickPage) return
      // 把最新的 页值存储起来
      page.value = userClickPage
      emit('getNewCurPage', userClickPage)
    }
    function upDownPage(isDown) {
      // isDown 的值 为 true则下一页, 反之上一页
      // 优化
      if (page.value === 1 || page.value === props.pageCount) return
      isDown ? page.value++ : page.value--
      emit('getNewCurPage', page.value)
      /*       if (isDown) {
        // 页码值 加 1, 再把最新的页码值传给父组件
        page.value++
        if (page.value === 1 || page.value === props.pageCount) return
        emit('getNewCurPage', page.value)
      } else {
        // 页码值 减 1, 再把最新的页码值传给父组件
        page.value--
        if (page.value === 1 || page.value === props.pageCount) return
        emit('getNewCurPage', page.value)
      } */
    }
    return {
      currentPage,
      upDownPage,
      page
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  width: 100%;
  height: 90px;
  line-height: 90px;
  font-size: 14px;
  background-color: #fff;
  .pagination_content {
    float: right;
    margin-right: 20px;
    .disabled {
      border: 1px solid #c1c1c1;
      color: #767676;
      background-color: #e2e2e2;
    }
    > span {
      display: inline-block;
      cursor: pointer;
      min-width: 30px;
      height: 28px;
      line-height: 30px;
      color: #2782ef;
      border: 1px solid #2782ef;
      margin: 0 4px;
      text-align: center;
    }
    .total_record,
    .total_page {
      color: black;
      border: none;
    }
    .normal_page {
      padding: 0 8px;
    }
    .total_page {
      margin: 0 10px 0 4px;
    }
  }
}
</style>
