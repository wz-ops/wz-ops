<template>
  <div class="banner my_swiper">
    <div class="left_banner">
      <div class="foucs">
        <span class="foucs_left" @mouseover="mouseoverFocus" @mouseout="mouseoutFocus" @click="clickFocus(true)" :ref="foucsRef"></span>
        <span class="foucs_right" @mouseover="mouseoverFocus" @mouseout="mouseoutFocus" @click="clickFocus(false)" :ref="foucsRef"></span>
      </div>
      <div class="left_banner_content" ref="leftImgRef">
        <div class="my_swiper_left">
          <div class="left_img">
            <img src="https://www.wanandroid.com/blogimgs/50c115c2-cf6c-4802-aa7b-a4334de444cd.png" alt="" />
          </div>
          <p class="title">一起来做个App吧</p>
        </div>
        <div class="my_swiper_left">
          <div class="left_img">
            <img src="https://www.wanandroid.com/blogimgs/50c115c2-cf6c-4802-aa7b-a4334de444cd.png" alt="" />
          </div>
          <p class="title">一起来做个App吧</p>
        </div>
        <div class="my_swiper_left">
          <div class="left_img">
            <img src="https://www.wanandroid.com/blogimgs/50c115c2-cf6c-4802-aa7b-a4334de444cd.png" alt="" />
          </div>
          <p class="title">一起来做个App吧</p>
        </div>
        <div class="my_swiper_left">
          <div class="left_img">
            <img src="https://www.wanandroid.com/blogimgs/50c115c2-cf6c-4802-aa7b-a4334de444cd.png" alt="" />
          </div>
          <p class="title">一起来做个App吧</p>
        </div>
      </div>
    </div>
    <div class="right_banner">
      <div class="my_swiper_right">
        <!-- Slider main container -->
        <div class="swiper">
          <!-- Additional required wrapper -->
          <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide">
              <div class="right_banner_top">
                <a href="#">
                  <img src="https://www.wanandroid.com/blogimgs/62c1bd68-b5f3-4a3c-a649-7ca8c7dfabe6.png" alt="" />
                </a>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="right_banner_bottom">
                <a href="#">
                  <img src="https://www.wanandroid.com/blogimgs/90c6cc12-742e-4c9f-b318-b912f163b8d0.png" alt="" />
                </a>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="right_banner_top">
                <a href="#">
                  <img src="https://www.wanandroid.com/blogimgs/62c1bd68-b5f3-4a3c-a649-7ca8c7dfabe6.png" alt="" />
                </a>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="right_banner_bottom">
                <a href="#">
                  <img src="https://www.wanandroid.com/blogimgs/90c6cc12-742e-4c9f-b318-b912f163b8d0.png" alt="" />
                </a>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev"></div>
          <!--左箭头。如果放置在swiper外面，需要自定义样式。-->
          <div class="swiper-button-next"></div>
          <!--右箭头。如果放置在swiper外面，需要自定义样式。-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Swiper JS
import Swiper, { Navigation } from 'swiper'
// configure Swiper to use modules
Swiper.use([Navigation])
import { ref, nextTick } from 'vue'
export default {
  name: 'HomeBanner',
  setup() {
    // 存储 类名为 left_banner_content, ref为leftImgRef的DOM
    // 存储单个DOM, 变量名和 ref值要相同且 在模板中ref的值为字符串,非变量
    const leftImgRef = ref(null) // null => 表示空对象

    // 用于储存多个DOM元素
    const myRef = ref([])
    // 1.获取Ref值相同的多个DOM元素
    // 2.el代表每个DOM
    // 3. 注意: 存储多个DOM, 变量名和 ref值要相同且 在模板中ref的值为变量
    const foucsRef = (el) => {
      // 把每个DOM元素追加到myRef对象的value值
      myRef.value.push(el)
    }
    let i = 0 // 轮播
    // isNow 的值比 i值小1,点击焦点盒子用 isNow的值 改变 i的值,以改变动画
    let isNow
    let outTimer
    /* 有4张图片,imgSize比其小1 */
    let imgSize = 3
    nextTick(() => {
      // console.dir(myRef.value)
      // 开启动画
      ani(imgSize)

      // swiper
      new Swiper('.swiper', {
        // swiper 中显示 两个 swiper-slide
        slidesPerView: 2,
        // Optional parameters
        direction: 'vertical',
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        loop: true
        // 由于我这swiper-slide内有a标签,所以显示不出来
        // grabCursor: true //开启抓手光标
      })
    })
    // 动画配置
    function ani(s) {
      // 开启动画
      outTimer = setInterval(() => {
        // 判断 i 是否 大于leftImgRef.value.children长度 - 1,如果大于
        // 就 把盒子长度重置为0, i为1, 原因是最后一张就是第一种图片,等待时长后,直接轮播到第二张.
        if (i > s) {
          leftImgRef.value.style.left = '0px'
          i = 1
          isNow = 0
        }
        // 执行动画
        animate(leftImgRef.value, { left: -i * Math.floor(617.9) })
        i++
        isNow = i - 1
      }, 1700)
    }
    // 动画
    function animate(obj, json, fn) {
      // fn 回调函数
      clearInterval(obj?.timer) // 点击前先清除
      obj.timer = setInterval(function () {
        var flag = true // 用来判断是否关闭定时器
        // 遍历
        for (var key in json) {
          // key 属性  json[key] 属性值
          //  var leader = leader + (target - leader)/10;
          let leader = 0
          if (key == 'opacity') {
            // 步数前的当前位置  本身没单位
            // 0.1+0.2 = 0.300000000...4 精度损失  先乘100再四舍五入如果0.33就33 0.3333那就 先乘100 得 33.3333 => 33 如果反过来那 0.6就 变1了
            leader = Math.round(window.getComputedStyle(obj, null)[key] * 100) || 100 // 小数不好计算, 故先乘以100再除以100,值不变,而当style样式中没有opacity属性时,默认为1,乘以100得 100;
          } else {
            // 而当style样式中没有写该属性时,默认为0; 本身有单位就去掉  z-index 在样式中不写默认为0,那么在这取0
            leader = Math.ceil(parseFloat(window.getComputedStyle(obj, null)[key])) || 0 // 由于浏览器有精度损失,这得到的可能不是整数,而是小数,例样式里是200,而浏览器里是199.99,故为减小误差得这样写 ,很重要.
          }
          var step = (json[key] - leader) / 10 // 步数
          step = step > 0 ? Math.ceil(step) : Math.floor(step)
          leader = leader + step // 步数后的当前位置
          // 提升层级  不写默认为0
          if (key == 'ZIndex') {
            // 直接提或降, 不用做动画
            obj.style[key] = json[key]
          }
          if (key == 'opacity') {
            obj.style[key] = leader / 100 // 因为opacity 属性值在0--1之间,且没有单位
          } else {
            obj.style[key] = leader + 'px'
          }
          /*  if (leader == target) {
                     clearInterval(obj.timer); // 两者相等时清除定时器
                 } */ // 由于可能json 中 width到达目标位置后,停止定时器,而height可能还没到,故该方法清除定时器不妥.
          if (leader != json[key]) {
            // 只要有一个没到就把flag改为 false
            flag = false
          }
        }
        if (flag) {
          clearInterval(obj.timer)
          if (fn) {
            fn()
          }
        }
      }, 30)
    }
    //点击左右焦点
    function clickFocus(flag) {
      // 传入的flag为 true即为 左焦点, 为false即为右焦点
      // console.log(i, isNow)
      // 先减再赋值
      i = flag ? --isNow : ++isNow
      // console.log('##', isNow)
      // console.log(i)
      if (i < 0) {
        i = 0
      }
      i = i > imgSize ? imgSize : i
      animate(leftImgRef.value, { left: -i * Math.floor(617.9) })
    }
    // 移入焦点框清除定时器,停止动画
    function mouseoverFocus() {
      // 清除定时器
      clearInterval(outTimer)
    }
    // 移除焦点时再次开启定时器
    function mouseoutFocus() {
      // console.log(11)
      ani(imgSize)
    }
    return {
      leftImgRef,
      animate,
      clickFocus,
      mouseoverFocus,
      mouseoutFocus,
      foucsRef
    }
  }
}
</script>

<style lang="less" scoped>
/* banner */
.my_swiper {
  width: 100%;
  height: 320px;
  margin-bottom: 20px;
  border-radius: 3px;
  // overflow: hidden;
  .left_banner,
  .right_banner {
    float: left;
  }
  .left_banner {
    overflow: hidden;
    width: 70%;
    height: 320px;
    position: relative;
    .foucs {
      display: none;
      .foucs_left,
      .foucs_right {
        position: absolute;
        z-index: 2;
        top: 50%;
        transform: translateY(-50%);
        height: 50px;
        text-align: center;
        width: 30px;
        cursor: pointer;
        &::before {
          content: '';
          display: inline-block;
          height: 20px;
          margin-top: 15px;
          width: 20px;
          border: 2px solid red;
          border-bottom: transparent;
          border-right: transparent;
          transform: rotate(-45deg);
        }
      }
      .foucs_left {
        left: 0;
      }
      .foucs_right {
        right: 0;
        transform: translateY(-50%) rotate(-180deg);
      }
    }
    .left_banner_content {
      width: (100% * 4);
      height: 100%;
      position: absolute;
      .my_swiper_left {
        width: (100% / 4);
        height: 100%;
        position: relative;
        float: left;
        .left_img {
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title {
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 0;
          height: 40px;
          line-height: 40px;
          background-color: rgba(0, 0, 0, 0.4);
          color: white;
          padding-left: 10px;
        }
      }
    }
  }
  .left_banner,
  .right_banner {
    &:hover > .foucs {
      display: block;
    }
  }
  .right_banner {
    width: 30%;
    height: 100%;
    position: relative;
    .foucs {
      display: none;
      .foucs_top,
      .foucs_bottom {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 50px;
        text-align: center;
        height: 30px;
        cursor: pointer;
        &::before {
          content: '';
          display: inline-block;
          height: 20px;
          margin-top: 5px;
          width: 20px;
          border: 2px solid #fff;
          border-bottom: transparent;
          border-right: transparent;
          transform: rotate(45deg);
        }
      }
      .foucs_top {
        top: 0;
      }
      .foucs_bottom {
        bottom: 0;
        transform: translateX(-50%) rotate(-180deg);
      }
    }
    .my_swiper_right {
      height: 100%;
      .swiper {
        width: 100%;
        height: 100%;
        --swiper-theme-color: #ff6600; /* 设置Swiper风格 */
        --swiper-navigation-color: #00ff33; /* 单独设置按钮颜色 */
        --swiper-navigation-size: 30px; /* 设置按钮大小 */
        .swiper-button-prev {
          top: 17px;
          transform: translateX(-50%) rotate(90deg);
          left: 50%;
        }
        .swiper-button-next {
          bottom: 0;
          top: auto;
          transform: translateX(-50%) rotate(90deg);
          left: 50%;
        }
      }
      .right_banner_top,
      .right_banner_bottom {
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      /*       ul {
        height: 100%;
        li {
          height: 100%;
          .right_banner_top,
          .right_banner_bottom {
            height: 50%;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      } */
    }
  }
}
</style>
