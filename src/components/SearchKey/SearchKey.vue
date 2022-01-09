<template>
  <div class="block key mt20">
    <h2 class="title">
      <span>{{ title }}</span>
    </h2>
    <ul class="clear-fix key-ul">
      <li v-for="item in key" :key="item.id">
        <a :href="rootUrl + '/article/query?k=' + item.name">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { inject, reactive } from 'vue'
import { getKey } from '@/api/index.js'
export default {
  name: 'SearchKey',
  props: {
    title: String
  },
  setup() {
    // 搜索热词数据
    const key = reactive([])
    // 注入根路径
    const rootUrl = inject('rootUrl')
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
    // 获取 搜索热词数据
    getKeyFun()
    // 导出
    return {
      rootUrl,
      key
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/public.less';
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
</style>
