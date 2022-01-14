<template>
  <li v-html="name" :class="cid === id ? 'actived' : ''" class="ellipsis" @click="earnArt(id)"></li>
</template>
<script>
export default {
  name: '',
  components: {},
  props: ['name', 'cid', 'id'],
  emits: ['earnData'],
  setup(_, { emit }) {
    function earnArt(id) {
      emit('earnData', id)
    }
    return {
      earnArt
    }
  }
}
</script>
<style lang="less" scoped>
.assort_list {
  > li {
    width: 100px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border: 1px solid #dbe2e8;
    // margin-bottom: -1px;
    cursor: pointer;
    border-bottom: 0;
    color: #333;
    &:last-child {
      border: 1px solid #dbe2e8;
    }
    &:hover {
      color: #2782ef;
    }
    &.actived {
      color: #2782ef;
    }
  }
}
</style>
