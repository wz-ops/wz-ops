<template>
  <div class="block mt20" v-for="item in toolChecks" :key="item.id">
    <h2 class="title ellipsis">
      <span>{{ item.title }}</span>
    </h2>
    <ul class="ul-list">
      <li v-for="todo in item.list" :key="todo.id">
        <a :class="todo.new ? 'new' : ''" :href="item.url && !todo.be ? item.url + todo.id : todo.url">{{ todo.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ToolCheck',
  props: ['toolChecks']
}
</script>

<style lang="less" scoped>
@import url('../../assets/css/public.less');
.ul-list {
  padding: 10px 15px;
  > li {
    float: left;
    > a {
      position: relative;
      display: inline-block;
      height: 25px;
      margin: 8px;
      line-height: 25px;
      border: 1px solid #207ab6;
      color: #207ab6;
      border-radius: 3px;
      padding: 0 8px;
      font-size: 14px;
      &::before {
        left: -2px;
        top: -7.5px;
      }
    }
    > a:hover {
      background-color: #207ab6;
      color: white;
    }
  }
}
</style>
