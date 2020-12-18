<template>
  <!-- 左侧显示 -->
  <div class="main-left" >
    <div class="wrapper">
      <ul>
        <ul class="content out-ul">
          <li class="out-li active">发现音乐</li>
          <li class="out-li">视频</li>
          <li class="out-li">朋友</li>
          <li class="out-li">直播</li>
          <li class="out-li">私人FM</li>
          <li class="caption"><span>我的音乐</span></li>
          <li class="out-li">
            <span class="iconfont icon-yinyue"></span>
            <span>本地音乐</span>
          </li>
          <li class="out-li">
            <span class="iconfont icon-xiazaiguanli"></span>
            <span>下载管理</span>
          </li>
          <li class="out-li">
            <span class="iconfont icon-ziyuan"></span>
            <span>我的音乐云盘</span>
          </li>
          <li class="out-li">
            <span class="iconfont icon-diantai"></span>
            <span>我的电台</span>
          </li>
          <li class="out-li">
            <span class="iconfont icon-wodeshoucang"></span>
            <span>我的收藏</span>
          </li>
        </ul>
        <ul class="content out-ul">
          <li class="caption"><span>创建的歌单</span></li>
          <li class="out-li">
            <span class="iconfont icon-xinaixin"></span>
            <span>我喜欢的音乐</span>
          </li>
          <li class="out-li" :key="index"
              v-for="(item , index) in userPlaylist.filter(el => el.userId === userInfo['userId'])">
            <span class="iconfont icon-gedan"></span>
            <span>{{item.name}}</span>
          </li>
        </ul>
        <ul class="content out-ul">
          <li class="caption"><span>收藏的歌单</span></li>
          <li class="out-li" :key="index"
              v-for="(item , index) in userPlaylist.filter(el => el.userId !== userInfo['userId'])">
            <span class="iconfont icon-gedan"></span>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from "@better-scroll/core";
  import {mapState} from 'vuex'
  export default {
    name: "LeftNavigation" ,
    computed : {
      ...mapState(['userInfo',"userPlaylist"])
    } ,
    mounted() {
      let wrapper = document.querySelector('.wrapper')
      let bs = new BScroll(wrapper,{
        probeType : 1 ,
        scrollY : true ,
        bounce : {
          top : true ,
          bottom : true
        } ,
        mouseWheel : true ,
        click : true ,
        preventDefault : true
      })
    } ,
    watch : {
      userInfo (){
        this.$store.dispatch('getUserPlaylist')
      }
    }
  }
</script>

<style lang="less" scoped>
  // 主体部分
  .main-left {
    position : fixed;
    z-index: 99;
    top : 75px;
    left : 0;
    height : calc(100vh - 165px);
    padding : 21px;
    width : 250px;
    box-sizing : border-box;
    border-right: 1px solid rgb(225,225,225);
    .wrapper {
      width : 100%;
      height : 100%;
    }
    .out-ul{
      //padding-top : 21px;
      li {
        height : 48px;
        line-height: 48px;
        padding : 0 15px;
        font-size : 17px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .out-li{
        color : rgb(76,76,76);
        .iconfont {
          font-size : 20px;
        }
        &:hover {
          background-color : rgb(246,246,247);
          cursor : pointer;
        }
        .iconfont {
          margin-right : 5px;
        }
      }
      .caption {
        height : 35px;
        line-height: 35px;
        color : rgb(153,153,153);
        font-size : 13px;
        margin-bottom : -5px;
        span {
          position: relative;
          &::after{
            position: absolute;
            content:'';
            width : 0;
            height : 0;
            right : -20px;
            top : 6px;
            right : -15px;
            border : 5px solid transparent;
            border-top-color :rgb(204,204,204);
            display: block;
          }
        }
      }
      .active {
        font-size : 20px;
        font-weight : bold;
        background-color : rgb(246,246,247)
      }
    }
  }
</style>
