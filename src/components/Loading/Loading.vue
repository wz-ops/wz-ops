<template>
  <div class="load">
    <div v-if="loading">
      <i class="iconfont icon-jiazaizhong load_img"></i>
      <span class="load_dec">加载中...</span>
    </div>
    <div v-else><span class="load_dec">亲~到底了~</span></div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: ['loading']
}
</script>

<style lang="less">
.load {
  width: 100%;
  margin-top: 10px;
  text-align: center;
  font-size: 15px;
  letter-spacing: 2px;
  .load_dec {
    text-shadow: 0 0 10px #dfd8d8;
    background: linear-gradient(135deg, #14ffe9, #3bff45, #ff00e0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: fc 0.8s ease-in-out infinite;
  }
  .iconfont {
    display: inline-block;
    margin-right: 10px;
    // 动画必须给块级元素加,不然没效果
    animation: load 1s linear infinite;
  }
}

@keyframes load {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes fc {
  to {
    filter: hue-rotate(360deg);
  }
}
</style>
