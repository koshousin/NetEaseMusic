<template>
  <!-- 歌单样式 -->
  <div class="main-right" >
    <div class="main-content">
      <div class="music-list-container">
        <!-- 歌单头部大图 -->
        <div class="header-banner">
          <div class="cloak"></div>
          <img src="../../assets/v2-63007b99834ff84efe411ba8fd3f240c_hd.jpg" alt="">
          <div class="banner-desc">
            <p class="special-list"><i class="iconfont icon-huiyuan"></i>精品歌单</p>
            <p class="title">Acoustic | 人生最好的境界是丰富的安静</p>
            <p class="subtitle">这些好听的不插电曲目有没有进入你的内心呢</p>
          </div>
        </div>
        <!-- 音乐类别 -->
        <div class="music-list-category" @click="changeMusicTag">
          <span class="all-list" @click="showMusicCategory">{{currentMusicTag}}</span>
          <span class="music-type">
            <span data-symbol="tag" :class="item.name === currentMusicTag && 'active'" v-for="(item , index) in hotMusicCategory" :key="index">{{item.name}}</span>
          </span>
          <!-- 音乐类型下拉列表 -->
          <div class="music-category-downlist" v-show="isShow" >
            <div class="title">
              <span data-symbol="tag">全部歌单</span>
            </div>
            <div class="sub-title" v-for="(item , index) in musicCategory" :key="index">
              <div class="type">
                <i class="iconfont" :class="iconfontClass[item.num]"></i>
                <span>{{item.category}}</span>
              </div>
              <div class="type-items">
                <span data-symbol="tag" class="item" v-for="(type , index) in item.types" :key="index">
                  <span data-symbol="tag" style="position : absolute" :class="type.name === currentMusicTag && 'active' ">
                      {{type.name}}
                    <i style="position : absolute ; color : rgb(236,65,65); font-size : 11px; right : -13px "
                       class="iconfont" :class="type.hot && 'icon-hot' "></i>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- 歌单列表 -->
        <div class="music-list">
          <div class="music-item" v-for="(music , index) in showPlaylist" :key="index">
            <img :src="music['coverImgUrl']" alt="">
            <span class="play-count">
                <i class="iconfont icon-bofang"></i>{{music['playCount']/10000 > 10 ? Math.floor(music['playCount']/10000) + '万' : music['playCount'] }}
            </span>
            <span class="iconfont icon-bofang2 play-now"></span>
            <span class="upload-info">
            <i class="iconfont icon-yonghu"></i>
            <span>{{music.creator.nickname}}</span>
            <i class="iconfont icon-vip"></i>
          </span>
            <div class="music-desc">
              {{music.name}}
            </div>
          </div>

        </div>
        <!-- 歌单页码显示 -->
        <div class="music-page" @click="changePage">
          <span class="iconfont icon-houtuishangyige"></span>
          <span :class="firstPageActive && 'active' ">1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
          <span class="iconfont icon-qianjin"></span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mapState , mapActions} from 'vuex'
export default {
  name: "SongList" ,
  data(){
    return {
      // currentTagName : '全部歌单' ,
      currentPage : 1 ,
      firstPageActive : true ,
      isShow : false ,
      iconfontClass : ['icon-yuzhong','icon-fengge26','icon-changjing','icon-qinggan1','icon-zhuti']     // 语种 ， 风格 ，场景 ， 情感 ， 主题
    }
  } ,
  computed : {
    ...mapState(['musicCategory','hotMusicCategory','currentMusicTag','showPlaylist'])
  } ,
  methods: {
    ...mapActions(['getMusicCategory' , 'getHotMusicCategory','updateCurrentMusicTag','getShowPlaylist']) ,
    showMusicCategory () {
      this.isShow = !this.isShow
    } ,
    changeMusicTag(e){
      if(e.target.dataset.symbol === 'tag') {
        let name = e.target.innerText
        console.log(e.target)
        this.updateCurrentMusicTag(name)
        this.getShowPlaylist()
      }
    } ,
    /* 改变页码 */
    changePage(e){
      this.firstPageActive = false
      if(e.target.innerText){
        if(this.selectedSpan && e.target.nodeName==='SPAN'){
          console.log(this.selectedSpan.nodeName)
          this.selectedSpan.className = ''
        }
        if(e.target.nodeName === 'SPAN'){
          this.selectedSpan = e.target
          e.target.className = 'active'
        }
        this.currentPage = e.target.innerText * 1
        // 发送获取歌单请求
        // 为防止用户多次点击，使用函数节流
        this.getShowPlaylist(e.target.innerText)
      }
    }
  } ,
  beforeMount() {
    this.getHotMusicCategory()
    this.getMusicCategory()
    this.getShowPlaylist()
  } ,
  watch : {
    // 当选择的标签名改变时上一次的高亮，并默认将第一个页码高亮
     currentMusicTag(){
       this.firstPageActive = true
       this.selectedSpan.className = ''
     }
  }
}
</script>

<style lang="less" scoped>
  @import '../../../static/css/common';
  @import "../../../static/css/contentCommon";
  // 歌单
  .music-list-container   {
    width : 100%;
    display  : flex;
    flex-direction : column;
    align-items: center;
    padding-bottom : 216px;
    // 歌单头部大图
    .header-banner {
      position : relative;
      width : 90%;
      height : 210px;
      border : 1px solid #eee;
      border-radius : 15px;
      overflow: hidden;
      max-width: 1372px;
      margin-bottom : 20px;
      display : flex;
      align-items: center;
      &:hover {
        cursor : pointer;
      }
      img {
        width : 175px;
        height : 175px;
        border-radius : 8px;
        margin : 0 20px;
      }
      .cloak {
        position : absolute;
        top : 0;
        left : 0;
        width : 100%;
        height :100%;
        z-index : -1;
        background-image : url(../../assets/banner1.jpg);
        background-size: cover;
        background-position : 80% 50%;
        background-repeat: no-repeat;
        filter : blur(20px)
      }
      .banner-desc {
        p {
          margin : 15px;
        }
        .special-list {
          width : 110px;

          line-height : 34px;
          text-align : center;
          color : rgb(231,170,90);
          border : 1px solid rgb(231,170,90);
          border-radius : 17px;
          font-size : 14px;
          i {
            margin-right : 5px;
          }
        }
        .title {
          color : #fff;
          font-size : 18px;
        }
        .subtitle {
          color : rgba(193,205,205,.7);
          font-size :13px ;
        }
      }
    }
    // 音乐类别
    .music-list-category {
      display : flex;
      justify-content: space-between;
      align-items : center;
      width : 90%;
      max-width: 1372px;
      position: relative;
      .all-list {
        line-height : 36px;
        width : 125px;
        text-align : center;
        border : 1px solid rgb(224,224,224);
        border-radius : 18px;
        position : relative;
        font-size : 16px;
        color : rgb(55,55,55);
        &::after {
          content : '>' ;
          margin-left : 5px;
        }
        &:hover {
           background-color : #eee;
        }
      }
      .music-type {
        color : rgb(103,103,103);
        font-size : 14px;
        width : 600px;
        display : flex;
        height : 26px;
        line-height : 26px;
        span {
          padding : 0 12px;
          border-radius : 12px;
          &:hover {
            color : #000;
          }
        }
        .active {
          .selectedColor()
        }
      }
      span:hover{
        cursor :pointer;
      }
      // 下拉样式
      .music-category-downlist {
        position : absolute;
        width : 930px;
        height : 930px;
        box-sizing : border-box;
        padding : 20px 0;
        border :1px solid #eee;
        box-shadow :0 1px 2px 1px rgba(0,0,0,.1);
        top : 50px;
        left : 0;
        border-radius : 8px;
        background-color : #fff;
        z-index : 1;
        .title {
          height : 35px;
          padding-left : 20px;
          border-bottom : 1px solid rgb(229,229,229);
          span:hover{
            color : @mainColor;
          }
        }
        .sub-title {
          display : flex;
          margin-top : 25px;
          padding : 0 20px;
          .type {
            flex-shrink : 0;
            width :  130px;
            font-size : 13px;
            color : rgb(153,153,153);
            i {
              font-size : 25px;
              margin-right : 5px;
            }
            span {
              line-height : 25px;
              vertical-align: top;
              &:hover {
                cursor: none;
              }
            }
          }
          .type-items {
            display : flex;
            flex-wrap: wrap;
            .item {
              box-sizing : border-box;
              padding : 6px;
              font-size : 14px;
              margin-right : 5px;
              width : 120px;
              height : 40px;
              color : rgb(55,55,55);
              position : relative;
              &:hover {
                color : @mainColor;
              }
              .active {
                height : 35px;
                padding : 0 16px;
                left : -10px;
                position : absolute;
                // 添加背景选中样式
                &::after {
                  content : '' ;
                  position : absolute;
                  background-color : rgb(253,245,245);
                  width : 100%;
                  height : 100%;
                  left : 0;
                  z-index : -1;
                  bottom : 12px;
                  border-radius : 17px;
                }
              }
            }
          }
        }
      }
    }
    // 歌单列表
    .music-list {
      margin-top : 20px;
      display : flex;
      flex-wrap: wrap;
      justify-content : space-between;
      .contentStyle();
      .music-item {
        position : relative;
        width : 230px;
        margin-bottom : 10px;
        img {
          width : 230px;
          height :230px;
          border-radius : 8px;
        }
        .play-count {
          position : absolute;
          right : 6%;
          top : 3%;
          color : #fff;
          font-size : 13px;
          i {
            font-size : 11px ;
            margin-right : 5px;
          }
        }
        .upload-info {
          position : absolute;
          left : 10px;
          top : 205px;
          color : #fff;
          font-size : 15px;
          .icon-vip {
            background-color : #fff;
            border-radius : 50%;
            color : @mainColor;
          }
        }
        .music-desc {
          .posterTextStyle();
          color : rgb(55,55,55);
          width : 100%;
          line-height : 30px;
          &:hover {
            color : #000;
          }
        }
        &:hover , &:hover .play-now {
          opacity : 1;
          cursor : pointer ;
        }
      }
    }
    // 歌曲页码样式
    .music-page {
      display : flex;
      margin-top : 20px;
      span {
        line-height: 30px;
        width : 30px;
        text-align : center;
        margin : 0 3px;
        border : 1px solid rgb(230,230,230);
        border-radius : 5px;
        color : rgb(103,103,103);
        &:hover {
          cursor : pointer;
          background-color : rgb(253,245,245);
        }
      }
      .iconfont {
        color : rgb(203,203,203);
      }
      .active {
        color : #fff;
        background-color :@mainColor;
        &:hover {
          cursor: auto;
          background-color : @mainColor;
        }
      }
    }
  }

</style>
