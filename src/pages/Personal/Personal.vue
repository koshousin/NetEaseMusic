<template>
  <!-- 右侧显示 -->
  <div>
    <!-- 轮播图区域 图片尺寸675 * 250 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item , index) in banners" :key="index">
          <div class="bkg-unreal" :style=" `background-image:url(${item.imageUrl})` "></div>
          <span class="iconfont qian icon-houtuishangyige"></span>
          <img :src="item['imageUrl']" alt="">
          <span class="iconfont hou icon-qianjin"></span>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!-- 推荐歌单区域 -->
    <div class="recommend-container">
      <div class="recommend-item">
        <div class="recommend-title">
          <span>推荐歌单</span>
          <span class="iconfont icon-qianjin"></span>
        </div>
        <div class="recommend-content">
          <div class="img-item">
            <div style="border:1px solid #eee; border-radius:8px">
              <img src="../../assets/cat.jpg" alt="" style="filter:blur(10px)">
            </div>
            <div class="recommend-daily">
              <span date="11" class="iconfont icon-huaban1fuben11"></span>
            </div>
            <div class="img-desc">
              每日歌曲推荐大豆腐干地方的方法sdfsdfasdf士大夫是
            </div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
        </div>
      </div>
      <div class="recommend-item">
        <div class="recommend-title">
          <span>推荐歌单</span>
          <span class="iconfont icon-qianjin"></span>
        </div>
        <div class="recommend-content">
          <div class="img-item">
            <div style="border:1px solid #eee; border-radius:8px">
              <img src="../../assets/cat.jpg" alt="" style="filter:blur(10px)">
            </div>
            <div class="recommend-daily">
              <span date="11" class="iconfont icon-huaban1fuben11"></span>
            </div>
            <div class="img-desc">
              每日歌曲推荐大豆腐干地方的方法sdfsdfasdf士大夫是
            </div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
          <div class="img-item">
            <img src="../../assets/cat.jpg" alt="">
            <div class="img-desc">每日歌曲推荐</div>
            <span class="play-now iconfont icon-bofang2"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions , mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'
  import RightHeader from "../../components/RightHeader/RightHeader";

export default {
  name: "ShowContent" ,
  components : {
    RightHeader
  } ,
  computed : {
    ...mapState(['banners'])
  } ,
  methods : {
    ...mapActions(['getBanners'])
  } ,
  beforeMount() {
    this.getBanners()
  },
  watch : {
    banners(){
      this.$nextTick( () => {
        const mySwiper = new Swiper('.swiper-container' , {
          direction : 'horizontal',
          loop : true ,
          pagination : {
            el : '.spot-navigation',
            clickable : true
          } ,
          navigation: {
            nextEl: '.qian',
            prevEl: '.hou',
          },
          autoplay : {
            delay : 1500 ,
            stopOnLastSlide : false
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
 @import "../../../static/css/contentCommon";
 @import "../../../static/css/common";
  // 右侧轮播图
  div {
    width : 100%;
    box-sizing: border-box;
    .swiper-container {
      height : 300px;
      width : 75%;
      box-sizing : border-box;
      --swiper-theme-color: #ff6600;
      .swiper-wrapper {
        height : 100%;
        width : 100%;
        .swiper-slide {
          margin : 0 auto;
          width :100%;
          max-width: 1372px;
          height : 100%;
          display: flex;
          padding : 0 20px;
          justify-content : space-between;
          box-sizing: border-box;
          align-items: center;
          position : relative;
          &:hover .iconfont {
            visibility: visible;
          }
          .bkg-unreal{
            position : absolute;
            width : 90%;
            height : 100%;
            top : 0;
            left : 0;
            right : 0;
            margin : 0 auto;
            z-index : -1;
            filter : blur(10px);
          }
          img {
            width : 675px;
            height : 250px;
            border-radius : 15px;
          }
          .iconfont {
            width : 40px;
            height : 40px;
            line-height : 40px;
            border-radius : 50%;
            font-size : 25px;
            text-align : center;
            background-color: rgba(179,179,179,.7);
            color : rgb(227,209,229);
            visibility: hidden;
            &:hover {
              color : #fff;
            }
          }
        }
        .swiper-pagination {
          span {
            color : rgb(236,65,65);
          }
          font-size : 50px;
          text-align : center;
          letter-spacing: 10px;
          height : 50px;
          color : rgb(230,230,230);
          background-color : #000;
        }
      }
    }
    // 推荐歌单区域
    .recommend-container {
      width : 100%;
      .recommend-item {
        width:90%;
        max-width: 1372px;
        margin : 0 auto;
        .recommend-title {
          height : 64px;
          line-height : 64px;
          font-size : 25px;
          font-weight : bold;
          .iconfont {
            font-size : 30px;
            vertical-align: -3px;
          }
        }
        .recommend-content {
          // 利用变量动态的计算尺寸
          --width : 18%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .img-item {
            width : var(--width);
            height : var(--width);
            position : relative;
            img , .iconfont{
              width : 100%;
              height : 100%;
              border-radius : 8px;
            }
            .recommend-daily {
              position: absolute;
              transform : translate(-50%,-50%);
              top:35%;
              left : 50%;
              background-color:transparent;
              text-align : center;
              .iconfont {
                display : block;
                font-size : 150px;
                position :relative;
                color : #fff;
                &::after {
                  content : attr(date);
                  font-size : 38px;
                  position : absolute;
                  transform : translate(-50%,-50%);
                  top:57%;
                  left : 50%;

                }
              }

            }
            .img-desc {
              margin : 10px 0;
              line-height : 25px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              display: -moz-box;
              -moz-line-clamp: 2;
              -moz-box-orient: vertical;
              word-wrap: break-word;
              word-break: break-all;
              white-space: normal;
            }
            &:hover , &:hover .play-now {
              cursor: pointer;
              opacity:1;
            }
            .play-now {
              position: absolute;
              top : 60%;
              left : 77%;
              font-size : 20px;
              width : 30px;
              height : 30px;
              color : rgb(236,65,65);
              border-radius : 50%;
              background-color: #fff;
              text-align :center;
              line-height : 30px;
              opacity : 0;
              transition : .5s ease-in-out;

            }
          }
        }

      }
    }
  }
</style>
