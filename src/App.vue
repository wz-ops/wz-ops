<template>
  <Header />
  <router-view @showTop="showtopBox"></router-view>
  <div class="gotop" @click="toTop" :class="isShow ? 'show-top' : ''">
    <span class="iconfont icon-TOP"></span>
  </div>
</template>

<script>
// getCurrentInstance 组件实例中通过 getCurrentInstance 获取proxy，再获取全局挂载的实例
import { getCurrentInstance, provide, ref } from 'vue'
import Header from '@/components/Header/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  },
  setup() {
    // 获取全局定义的数据
    const { proxy } = getCurrentInstance()
    // 网站根地址
    const rootUrl = proxy.$rootUrl
    // 注出 根路径
    provide('rootUrl', rootUrl)
    // 用于 判断 类名为 gotop的盒子是否显示
    let isShow = ref(false)
    function showtopBox(isBe) {
      // 根据 子组件 传来的 值 进行 最新赋值
      isShow.value = isBe
    }
    function toTop() {
      if (document.documentElement.scrollTop) {
        document.documentElement.scrollTop = 0
      } else {
        document.body.scrollTop = 0
      }
    }
    return {
      isShow,
      showtopBox,
      toTop
    }
  }
}
</script>
<style lang="less">
.container {
  width: 100%;
  height: 100%;
  margin-top: 30px;
  .container_content {
    width: 1260px;
    max-width: 1260px;
    margin: 0 auto;
    .container_content_left {
      width: 73%;
      margin-right: 2%;
      float: left;
    }
    .container_content_right {
      width: 25%;
      float: left;
    }
  }
}
.gotop {
  position: fixed;
  display: none;
  right: 50px;
  bottom: 60px;
  border: 1px solid #6eb8fc;
  color: #6eb8fc;
  width: 35px;
  text-align: center;
  line-height: 35px;
  height: 35px;
  border-radius: 5px;
  cursor: pointer;
  .iconfont {
    font-size: 25px;
    color: #6eb8fc;
    background-color: #fff;
    border-radius: 5px;
    display: block;
  }
}
.show-top {
  display: block;
}
</style>
