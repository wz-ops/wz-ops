<template>
  <ul class="art">
    <li class="clear-fix" v-for="item in artData" :key="item.id">
      <div class="art_icon_left">
        <span class="collect" title="收藏"></span>
      </div>
      <div class="art_center_detail">
        <p>
          <span class="fresh" v-if="item.fresh">新</span>
          <a :href="item.link">{{ item.title }}</a>
        </p>
        <!-- 定义一个默认插槽 item 传过去的 props -->
        <slot name="bottom_desc" :item="item"></slot>
      </div>
      <slot name="more" :item="item"></slot>
    </li>
  </ul>
</template>

<script>
import { getArt, getTopArt } from '@/api/index.js'
import { onMounted, reactive, toRefs, watch } from '@vue/runtime-core'
export default {
  name: 'HoemArticle',
  // 想使用 setup参数 props, 必须使用 props选项声明接收, 不然 setup参数 props获取不到传过来的值
  props: ['pageSize'],
  setup(props) {
    let artData = reactive([])
    let { pageSize } = toRefs(props)
    // 生命周期 挂载钩子
    onMounted(() => {
      getArtFun(pageSize.value)
    })
    async function getArtFun(size) {
      // 注意: 一个异步函数 把 async await 后获得的数据返回出去 仍是一个promise对象
      // 置顶文章
      let topResult = await getTopArt()
      // 非置顶文章
      let result = await getArt(size)
      // 判断数据是否请求成功
      if (topResult.status === 200 && result.status === 200) {
        // 解构赋值 置顶文章
        let {
          data: { data: res1 }
        } = topResult
        // 解构赋值 非置顶文章
        let {
          data: {
            data: { datas: res }
          }
        } = result
        // 清空原有的数据
        artData.splice(0, artData.length)
        // 三点运算符(把置顶与非置顶文章整合到一个数组中)
        artData.push(...res1, ...res)
      }
    }
    watch(pageSize, async (newVal) => {
      getArtFun(newVal)
      console.log(artData)
    })
    return {
      artData
    }
  }
}
</script>

<style lang="less">
// less 定义一个函数
.class(@c) {
  border: 1px solid @c!important;
  color: @c!important;
  padding: 0 3px;
}
.art {
  width: 100%;
  li {
    background-color: #fff;
    padding: 20px 30px;
    margin-left: 20px;
    border-bottom: 1px solid #ccc;
    &:hover {
      background-color: rgba(255, 255, 255, 0.6);
    }
    div {
      float: left;
    }
    .art_icon_left {
      width: 20px;
      margin-right: 20px;
      margin-top: 18px;
      .collect {
        display: inline-block;
        width: 100%;
        height: 20px;
        background-image: url('../../assets/img/collect_icon.svg');
      }
    }
    .art_center_detail {
      p {
        margin-bottom: 20px;
        width: 580px;
        a {
          color: black;
          font-weight: bold;
          line-height: 20px;
        }
      }
      a:hover {
        text-decoration: underline;
        color: #1b93fb;
      }
      span {
        display: inline-block;
        font-size: 12px;
        margin-right: 10px;
        &:nth-last-child(-n + 3) {
          color: #7e8c8d;
        }
      }
      .istop,
      .fresh {
        .class(#f56a6b);
      }
      .tag {
        > a {
          display: block;
          .class(#009a61);
        }
        > a:hover {
          background-color: #009a61;
          color: white !important;
          text-decoration: none;
        }
      }
    }
    .art_right_more {
      float: right;
      margin-top: 5px;
      a {
        color: black;
        font-size: 32px;
        letter-spacing: 0.1em;
      }
    }
  }
}
</style>
