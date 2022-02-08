<template>
  <div class="header">
    <div class="header_content clear-fix">
      <div class="logo">
        <a href="https://www.wanandroid.com">
          <img src="	https://www.wanandroid.com/resources/image/pc/logo.png" title="玩安卓" id="logo_img" width="68px" height="50px" alt="wan android logo" />
        </a>
      </div>
      <div class="nav">
        <ul class="clear-fix">
          <!-- <li><a href="" class="">首页</a></li> -->
          <li><router-link to="/home">首页</router-link></li>
          <!-- <li><a href="">广场</a></li> -->
          <li><router-link to="/square">广场</router-link></li>
          <!-- <li><a href="">导航</a></li> -->
          <li><router-link to="/nav">导航</router-link></li>
          <!-- <li><a href="">问答</a></li> -->
          <li><router-link to="/ask_answer">问答</router-link></li>
          <!-- <li><a href="">体系</a></li> -->
          <li><router-link to="/system">体系</router-link></li>
          <!-- <li><a href="">项目</a></li> -->
          <li><router-link to="/project">项目</router-link></li>
          <!-- <li><a href="">公众号</a></li> -->
          <li><router-link to="/the_public">公众号</router-link></li>
          <!-- <li><a href="">项目分类</a></li> -->
          <li><router-link to="/project_classification">项目分类</router-link></li>
          <!-- <li><a href="">工具</a></li> -->
          <li><router-link to="/tools">工具</router-link></li>
        </ul>
      </div>
      <div class="nav_login clear-fix">
        <ul class="clear-fix">
          <li><a href="">登录</a></li>
          <li>·</li>
          <li><a href="">注册</a></li>
        </ul>
        <div class="header_inbox">
          <a href="" target="_bank">
            <i class="iconfont icon-xiaoxi"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  background: #fff;
  line-height: 60px;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 1%), 0 1px 5px 0 rgb(0 0 0 / 1%), 0 3px 1px -2px rgb(0 0 0 / 10%);
  a {
    color: #276692;
  }
  .header_content {
    width: 1260px;
    max-width: 1260px;
    margin: 0 auto;
    .logo a {
      display: block;
      margin: 0 20px;
      width: 100px;
      height: 60px;
      float: left;
    }
    .logo a img {
      width: 68px;
      height: 50px;
      margin: 5px auto;
    }
    .logo,
    .nav {
      float: left;
    }
    .nav {
      & > ul li {
        float: left;
        a {
          display: block;
          height: 60px;
          line-height: 60px;
          padding: 0 15px;
          cursor: pointer;
          &:hover::after {
            position: relative;
            content: '';
            display: block;
            left: 0;
            bottom: 10px;
            width: 100%;
            height: 3px;
            background-color: #276692;
          }
          &.active::after {
            position: relative;
            content: '';
            display: block;
            left: 0;
            bottom: 10px;
            width: 100%;
            height: 3px;
            background-color: #276692;
          }
        }
      }
    }
    .nav_login {
      float: right;
      margin-right: 15px;
      .header_inbox {
        height: 60px;
        a {
          display: block;
          height: 30px;
          width: 30px;
          margin-top: 15px;
          position: relative;
          top: 6px;
        }
        .icon-xiaoxi {
          color: #6eb8fc;
          font-size: 20px;
          height: 24px;
          line-height: 24px;
          display: block;
          margin: 5px auto 0;
          width: 24px;
        }
      }
      > ul,
      .header_inbox {
        float: left;
      }
      & > ul li {
        float: left;
        a:hover {
          color: #dd3011;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
