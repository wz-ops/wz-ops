<template>
  <ul class="art" :class="ml ? '' : 'ml'" v-if="artData?.length">
    <li class="clear-fix" v-for="item in artData" :key="item.id">
      <div class="art_icon_left">
        <span class="collect" title="收藏"></span>
      </div>
      <div class="art_center_detail">
        <p>
          <slot name="fresh" :item="item"></slot>
          <!-- 如果 有特殊字符 {{}}插值表达式 会把(除去变量的)文本当做字符串直接展示到页面,不会当做html代码解析 -->
          <!-- 解决办法: v-html修饰符 => 把文本当做html代码解析后在展示在页面 -->
          <a :href="item.link" v-html="item.title"></a>
        </p>
        <!-- 定义一个默认插槽 item 传过去的 props -->
        <slot name="bottom_desc" :item="item"></slot>
      </div>
      <slot name="more" :item="item"></slot>
      <slot name="small_big_pic" :item="item"></slot>
    </li>
  </ul>
  <ul v-else>
    <li class="nothing">
      <img src="@/assets/img/nothing.svg" alt="" />
      <div class="nothing_tip">暂无数据</div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'HoemArticle',
  // 想使用 setup参数 props, 必须使用 props选项声明接收, 不然 setup参数 props获取不到传过来的值
  props: ['artData', 'ml']
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
  // width: 100%;
  background-color: white;
  margin-left: 20px;
  // 20px 左边距取消
  &.ml {
    margin-left: 0;
  }
  li {
    position: relative;
    background-color: #fff;
    padding: 20px 30px;
    border-bottom: 1px solid #ccc;
    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
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
        cursor: pointer;
        &:hover {
          background-image: url('../../assets/img/collect_icon_hover.svg');
        }
      }
    }
    .art_center_detail {
      width: 580px;
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
        text-decoration: underline !important;
        color: #1b93fb !important;
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
.nothing {
  text-align: center;
  padding: 100px;
  > .nothing_tip {
    margin-top: 10px;
    letter-spacing: 2px;
    font-style: oblique;
    font-size: 14px;
    color: #484848;
  }
}
</style>
