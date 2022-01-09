<template>
  <ul class="art">
    <li class="clear-fix" :class="ml ? 'ml' : ''" v-for="item in artData" :key="item.id">
      <div class="art_icon_left">
        <span class="collect" title="收藏"></span>
      </div>
      <div class="art_center_detail">
        <p>
          <slot name="fresh" :item="item"></slot>
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
  width: 100%;
  li {
    background-color: #fff;
    padding: 20px 30px;
    border-bottom: 1px solid #ccc;
    // 20px 左边距
    &.ml {
      margin-left: 20px;
    }
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
