<template>
  <form action="" class="search_form">
    <input type="text" class="home_r_search" placeholder="搜索关键字以空格形式隔开" v-model="key" />
    <span class="search" @click="startSearch"></span>
  </form>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Search',
  emits: ['clickSearch'],
  setup(_, { emit }) {
    const key = ref('')
    function startSearch() {
      emit('clickSearch', key.value)
    }
    return {
      startSearch,
      key
    }
  }
}
</script>

<style lang="less" scoped>
.search_form {
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
</style>
