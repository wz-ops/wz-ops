<template>
  <div class="container">
    <div class="container_content clear-fix bg_white">
      <div class="container_main clear-fix">
        <div class="left_assort">
          <ul class="assort_list">
            <!-- 如果 有特殊字符 {{}}插值表达式 会把(除去变量的)文本当做字符串直接展示到页面,不会当做html代码解析 -->
            <!-- 解决办法: v-html修饰符 => 把文本当做html代码解析后在展示在页面 -->
            <Assort v-for="todo in projectAssortLs" :key="todo.id" v-html="todo.name" :cid="projectAssortId" :id="todo.id" @click="earnArt(todo.id)"></Assort>
          </ul>
        </div>
        <div class="project_right_art">
          <ul class="project_art_ls clear-fix">
            <li v-for="item in artData" :key="item.id">
              <div class="left_img">
                <img :src="item.envelopePic" alt="" />
              </div>
              <div class="right_info">
                <h3 class="ellipsis title" v-html="item.title"></h3>
                <div class="desc">{{ item.desc }}</div>
                <div class="note">
                  <span>{{ item.niceDate }}&nbsp;&nbsp;{{ item.author }}</span>
                  <span class="collect"></span>
                </div>
              </div>
            </li>
          </ul>
          <ElementuiPagination @earnPage="againArt" :artData="artData" :totalPage="totalPage" :total="total" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
// 导入 路由
import { useRoute } from 'vue-router'
import { getProjectAssort, getProjectAssortArt } from '@/api/index.js'
import useelementuipagination from '@/hooks/useelementuipagination.js'
import ElementuiPagination from '@/components/Pagination/ElementuiPagination.vue'
import Assort from '@/components/Assort/Assort.vue'
export default {
  name: 'ProjectAssort',
  components: { ElementuiPagination, Assort },
  emits: ['showFooter'],
  setup(_, { emit }) {
    // 初始化 项目分类数据
    const projectAssortLs = reactive([])
    // useRoute() 获取路由信息
    // (cid)是query参数
    const cid = useRoute().params.cid
    // 项目分类id(如果 cid为 true, 说明是其他页面跳转,为false说明是初始化该页面)
    const projectAssortId = ref(cid - 0 || 294)
    const { earnArt, commonCode, artData, changePage, curPage, pageSize, total, totalPage } = useelementuipagination(emit, getProjectAssortArtFun, projectAssortId)
    // 项目分类数据方法
    async function getProjectAssortFun() {
      const result = await getProjectAssort()
      if (result.data.errorCode === 0) {
        projectAssortLs.push(...result.data.data)
      }
    }
    // 项目分类文章数据方法
    async function getProjectAssortArtFun() {
      const result = await getProjectAssortArt({ cid: projectAssortId.value, size: curPage.value, page_size: pageSize.value })
      commonCode(result)
    }
    // 当页码值变化时调用(页码值由分页子组件传来)
    function againArt(id) {
      curPage.value = id
      changePage(getProjectAssortArtFun)
    }
    // 获取项目分类数据
    getProjectAssortFun()
    // 获取项目分类文章数据
    getProjectAssortArtFun()
    return {
      projectAssortLs,
      earnArt,
      artData,
      projectAssortId,
      changePage,
      curPage,
      pageSize,
      total,
      totalPage,
      againArt
    }
  }
}
</script>
<style lang="less" scoped>
.container_main {
  padding: 40px 35px 50px 35px;
  .left_assort {
    float: left;
    width: 15%;
  }
  .project_right_art {
    float: left;
    width: 85%;
    .project_art_ls {
      width: 100%;
      > li {
        box-sizing: border-box;
        float: left;
        padding: 10px;
        height: 250px;
        width: 49%;
        position: relative;
        border: 1px solid #dbe2e8;
        margin-right: 2%;
        box-shadow: 3px 3px 8px #dbe2e8;
        margin-bottom: 20px;
        &:nth-child(even) {
          margin-right: 0;
        }
        > div {
          float: left;
        }
        > .left_img {
          width: 30%;
          height: 100%;
          margin-right: 1%;
          > img {
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        }
        > .right_info {
          width: 69%;
          // text-align: center;
          > .title {
            font-weight: 560;
            padding: 10px 0 15px 0;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
              color: #2782ef;
            }
          }
          > .desc {
            word-wrap: break-word;
            color: #767676;
            line-height: 20px;
            font-size: 15px;
            font-family: '宋体';
          }
          > .note {
            position: absolute;
            width: 68%;
            right: 10px;
            bottom: 20px;
            color: #767676;
            font-size: 12px;
            > span:first-child {
              float: left;
              padding-left: 10px;
            }
            > .collect {
              float: right;
              width: 16px;
              height: 16px;
              background-image: url('../../assets/img/collect_icon.svg');
              background-size: 100% 100%;
              background-repeat: no-repeat;
              background-position: center center;
              cursor: pointer;
              &:hover {
                background-image: url('../../assets/img/collect_icon_hover.svg');
              }
            }
          }
        }
      }
    }
  }
}
</style>
