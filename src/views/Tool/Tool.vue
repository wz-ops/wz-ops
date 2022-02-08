<template>
  <div class="container">
    <div class="container_content">
      <ul class="means_ls clear-fix">
        <li class="clear-fix" v-for="tool in toolsLs" :key="tool.id">
          <a :href="tool.url">
            <div class="left">
              <img :src="tool.toolPic" :alt="tool.title" />
            </div>
            <div class="right">
              <h2 class="r_top_title">{{ tool.title }}</h2>
              <p class="r_bottom_desc">{{ tool.desc }}</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { onBeforeUnmount, shallowReactive } from 'vue'
import { getMeans } from '@/api/index.js'
export default {
  name: 'Tool',
  emits: ['showFooter'],
  setup(_, { emit }) {
    const toolsLs = shallowReactive([])
    async function getMeansFun() {
      const result = await getMeans()
      if (result.data.errorcode === 0) {
        toolsLs.push(...result.data.datas)
        // footer组件一直显示
        emit('showFooter', false)
      }
    }
    getMeansFun()
    onBeforeUnmount(() => {
      // 卸载前把footer组件隐藏
      emit('showFooter', true)
    })
    return {
      toolsLs
    }
  }
}
</script>
<style lang="less" scoped>
.means_ls {
  > li {
    box-sizing: border-box;
    padding: 15px;
    width: 32%;
    height: 100px;
    line-height: 68px;
    background-color: #fff;
    box-shadow: 0 0 5px #ccc;
    margin-right: 2%;
    margin-bottom: 15px;
    border: 1px solid transparent;
    &:hover {
      border-color: #3498db;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
    float: left;
    > a {
      width: 100%;
      height: 100%;
      display: block;
      .left {
        float: left;
        width: 50px;
        height: 100%;
        > img {
          vertical-align: middle;
          width: 50px;
          height: 50px;
          margin-right: 15px;
        }
      }
      .right {
        float: left;
        width: 300px;
        .r_top_title {
          color: #3498db;
          height: 32px;
          line-height: 32px;
        }
        .r_bottom_desc {
          color: #767676;
          height: 40px;
          line-height: 20px;
          font-size: 14px;
          /* 强制换行 */
          word-wrap: break-word;
        }
      }
    }
  }
}
</style>
