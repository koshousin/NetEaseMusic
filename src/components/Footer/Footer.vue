<template>
  <!-- 客户端底部部分 -->
  <div class="footer-player">
    <!-- 底部左边部分 -->
    <div class="player-left">
      <div class="music-poster">
        <img src="../../assets/cat.jpg" alt="">
        <div class="cloak">
          <span class="iconfont icon-zhankaiquanpingkuozhan"></span>
        </div>
      </div>
      <div class="music-info">
        <div class="title">
          <span class="music-name">海阔天空</span>
          <span class="iconfont icon-xinaixin"></span>
        </div>
        <div class="artist">Beyond</div>
      </div>
    </div>
    <!-- 底部中间控制以及进度条显示 -->
    <div class="player-control">
      <div class="control-icons">
        <span class="iconfont icon-suijibofang"></span>
        <span class="iconfont icon-shangyishou1"></span>
        <span id="mid-icon" class="iconfont icon-bofang2"></span>
        <span class="iconfont icon-nextaudio"></span>
        <span class="iconfont icon-ciyushiyi"></span>
      </div>
      <div class="process-bar">
        <span class="start time">00:00</span>
        <div class="line">
          <div class="play-line"></div>
          <div class="played-line"></div>
        </div>
        <span class="end time">05:20</span>
      </div>
    </div>
    <!-- 底部右边部分  -->
    <div class="player-right">
      <span class="iconfont icon-yinxiao"></span>
      <span class="iconfont icon-icon-test"></span>
      <div class="volume">
        <div class="volume-line"></div>
        <div class="now-volume"></div>
      </div>
      <span class="iconfont icon-bofangliebiao"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style lang="less" scoped>
  //  底部播放栏
  .footer-player{
    width : 100%;
    height : 90px;
    box-sizing : border-box;
    position : fixed;
    display : flex;
    align-items : center;
    justify-content:space-between;
    background-color: rgb(246,246,248);
    bottom : 0;
    left : 0;
    z-index : 999;
    padding : 0 30px;
    // 播放栏左侧
    .player-left {
      width : 250px;
      display : flex;
      .music-poster {
        width : 60px;
        height : 60px;
        margin-right : 10px;
        position : relative;
        .cloak {
          position : absolute;
          top : 0;
          left : 0;
          width : 60px;
          height : 60px;
          background-color: rgba(0,0,0,.3);
          display: none;
          .iconfont {
            font-size : 60px;
            color : #eee;
          }
        }
        img {
          width : 60px;
          height : 60px;
          border-radius : 5px;
        }
        &:hover .cloak, &:hover {
          display : block;
          cursor : pointer;
        }
        &:hover img {
          filter : blur(5px);
        }
      }
      .music-info {
        line-height : 30px;
        .title {
          display : flex;
          .music-name{
            margin-right : 10px;
            max-width :100px;
            overflow:hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .iconfont:hover {
            text-shadow: -1px 1px #000;
          }
        }
      }
    }
    //  播放栏中间
    .player-control {
      width : 566px;
      height : 100%;
      display : flex;
      flex-direction : column;
      justify-content: space-evenly;
      align-items : center;
      .control-icons {
        display: flex;
        justify-items: center;
        align-items: center;
        #mid-icon {
          font-size : 30px;
          width : 45px;
          height : 45px;
          line-height : 45px;
          border-radius :50%;
          text-align : center;
          background-color : rgb(235,235,237);
          &:hover {
            color : inherit;
            background-color : #ddd;
          }
        }
        .iconfont {
          margin : 0 20px;
          font-size : 16px;
          color : rgb(49,49,50);
          &:hover {
            cursor : pointer;
            color : rgb(236,65,65);

          }
        }
      }
      .process-bar {
        display : flex;
        font-size : 14px;
        color : rgb(165,165,166);
        width : 100%;
        display : flex;
        justify-content : space-between;
        align-items: center;
        .line {
          width : 85%;
          position : relative;
          .play-line {
            height : 4px ;
            background-color :rgb(230,230,232);
          }
          .played-line {
            position : absolute;
            height : 4px ;
            background-color :rgb(255,78,78);
            width : 30%;
            top:0;
            left : 0;
            &::after {
              content : '';
              width : 10px;
              position : absolute;
              height : 10px;
              border-radius : 50%;
              background-color :rgb(255,78,78);
              right :-10px;
              top :-3px;
            }
          }

        }
      }
    }
    // 播放栏右侧
    .player-right {
      width : 250px;
      display: flex;
      justify-content: space-between;
      align-items : center;
      .iconfont {
        font-size : 20px;
        &:hover{
          cursor : pointer;
        }
      }
      .volume {
        width : 100px;
        margin-left : -30px;
        position : relative;
        .volume-line {
          height : 3px;
          background-color: rgb(230,230,232);
        }
        .now-volume {
          position : absolute;
          top : 0;
          left : 0;
          width : 30%;
          height : 3px;
          background-color :rgb(255,78,78);
          &::after {
            content : '';
            width : 5px;
            position : absolute;
            height : 5px;
            border-radius : 50%;
            background-color :rgb(255,78,78);
            right :-5px;
            top :-1.5px;
          }
        }
      }
    }
  }
</style>
