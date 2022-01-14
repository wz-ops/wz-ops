<template>
  <div class="container">
    <div class="container_content clear-fix bg_white">
      <div class="container_top">
        <input type="text" name="" id="searchText" placeholder="请输入搜索内容" />
        <span class="search_btn">搜索</span>
      </div>
      <div class="container_bottom clear-fix">
        <div class="left_team">
          <ul class="assort_list">
            <!-- 如果 有特殊字符 {{}}插值表达式 会把(除去变量的)文本当做字符串直接展示到页面,不会当做html代码解析 -->
            <!-- 解决办法: v-html修饰符 => 把文本当做html代码解析后在展示在页面 -->
            <Assort v-for="todo in navList" :key="todo.cid" :cid="navId" :id="todo.cid" v-html="todo.name" class="ellipsis" @click="earnArt(todo.cid)"></Assort>
          </ul>
        </div>
        <div class="public_right_art">
          <div class="public_right_art_content" v-for="todo in navList" :key="todo.cid">
            <h3 v-html="todo.name"></h3>
            <ul class="clear-fix nav-list">
              <li v-for="item in todo.articles" class="ellipsis" :title="item.title" :key="item.id">
                <a :href="item.link">{{ item.title }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import { getNavAssort, getNavList } from '@/api/index.js'
import Assort from '@/components/Assort/Assort.vue'
export default {
  name: 'Nav',
  components: { Assort },
  setup() {
    const navAssortLs = reactive([])
    const navId = ref(10068)
    const navList = reactive([])
    async function getNavAssortFun() {
      const result = await getNavAssort()
      if (result.data.errorcode === 0) {
        navAssortLs.push(...result.data.datas)
      }
    }
    async function getNavListFun() {
      const result = await getNavList()
      if (result.data.errorCode === 0) {
        navList.push(...result.data.data)
      }
    }
    // 点击导航分类时触发
    function earnArt(id) {
      navId.value = id
    }
    getNavAssortFun()
    getNavListFun()
    return {
      navAssortLs,
      navList,
      navId,
      earnArt
    }
  }
}
</script>
<style lang="less" scoped>
.container_bottom {
  .left_team {
    width: 14%;
    text-align: center;
    float: left;
    padding-left: 6%;
  }
  .public_right_art {
    width: 80%;
    float: left;
    .public_right_art_content {
      width: 97%;
      margin: 30px 3% 30px 0;
      border: 1px solid #dbe2e8;
      > h3 {
        font-weight: bolder;
        font-size: 18px;
        color: red;
        padding: 15px 0 0 30px;
      }
      > .nav-list {
        width: 98%;
        margin: 2%;
        > li {
          height: 30px;
          float: left;
          line-height: 30px;
          padding: 0 20px;
          max-width: 182px;
          > a {
            color: #3482df;
            font-size: 14px;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>
