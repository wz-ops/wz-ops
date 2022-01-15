<template>
  <Header />
  <router-view @showFooter="showFooterBox"></router-view>
  <div class="gotop" @click="toTop" :class="isShow ? 'show-top' : ''">
    <span class="iconfont icon-TOP"></span>
  </div>
  <Footer v-if="!isLoading" />
</template>

<script>
// getCurrentInstance 组件实例中通过 getCurrentInstance 获取proxy，再获取全局挂载的实例
import { getCurrentInstance, onMounted, provide, ref } from 'vue'
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer
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
    // 根据 数据是否还在加载, 用于判断 是否显示 Footer组件, flase为显示, true 不显示, 默认显示
    let isLoading = ref(true)
    let scrollWh
    let stop
    onMounted(() => {
      window.addEventListener('scroll', scrTop)
    })
    function scrTop() {
      scrollWh = document.documentElement.scrollTop || document.body.scrollTop
      isShow.value = scrollWh > 300 ? true : false
    }
    // 自定义指令, 从子组件获取 isLoad值
    function showFooterBox(isLoad) {
      isLoading.value = isLoad
    }
    function toTop() {
      let top = 0
      if (scrollWh > top) {
        scrollWh > 1000 ? (scrollWh -= 600) : (scrollWh -= 150)
        scrollWh = scrollWh > 0 ? scrollWh : 0
        document.documentElement ? (document.documentElement.scrollTop = scrollWh) : (document.body.scrollTop = scrollWh)
      } else {
        scrollWh = 0
        document.documentElement ? (document.documentElement.scrollTop = 0) : (document.body.scrollTop = 0)
        // 取消动画
        window.cancelAnimationFrame(stop)
        return // 保证以下语句不执行, 这样就不会取消动画后又开启动画
      }
      // 开启 动画(新出的, 该方法 不会卡顿)
      stop = requestAnimationFrame(toTop)
      // 优化
      // document.documentElement ? (document.documentElement.scrollTop = 0) : (document.body.scrollTop = 0)
      /* if (document.documentElement.scrollTop) {
        document.documentElement.scrollTop = 0
      } else {
        document.body.scrollTop = 0
      } */
    }
    return {
      isShow,
      isLoading,
      toTop,
      showFooterBox
    }
  }
}
</script>
<style lang="less">
.container {
  // width: 100%;
  // height: 100%;
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
  bottom: 80px;
  border: 1px solid #6eb8fc;
  color: #6eb8fc;
  width: 35px;
  text-align: center;
  line-height: 35px;
  height: 35px;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0;
  animation: opc 1s linear both;
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
.bg_white {
  background-color: white;
}
.container_top {
  padding: 30px 0;
  text-align: center;
  margin-left: 200px;
  #searchText {
    width: 40%;
    height: 32px;
    outline: none;
    border: 1px solid #dbe2e8;
    border-right: none;
    padding-left: 10px;
    // 用于解决输入框与模拟按钮对不齐的
    vertical-align: middle;
    &:focus {
      border: 1px solid #2782ef;
    }
  }
  .search_btn {
    display: inline-block;
    cursor: pointer;
    // 用于解决输入框与模拟按钮对不齐的
    vertical-align: middle;
    background-color: #2782ef;
    height: 32px;
    width: 120px;
    letter-spacing: 2px;
    line-height: 32px;
    border: 1px solid #2782ef;
    color: #fff;
  }
}
@keyframes opc {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
