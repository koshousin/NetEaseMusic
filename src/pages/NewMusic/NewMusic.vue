<template>
  <!-- 新歌速递 -->
  <div class="new-music-container">
    <div class="music-slide-bar">
      <span class="active">新歌速递</span>
      <span >新碟上架</span>
    </div>
    <div class="music-navigation">
      <span class="active">全部</span>
      <span>华语</span>
      <span>欧美</span>
      <span>韩国</span>
      <span>日本</span>
      <span class="collect-all"><i class="iconfont icon-shoucangjia"></i>收藏全部</span>
      <span class="play-all"><i class="iconfont icon-bofang1"></i>播放全部</span>
    </div>
    <!-- 535 -->
    <div class="music-list">
      <div class="music-item">
        <span class="rank number">01</span>
        <img src="../../assets/cat.jpg" alt="" class="coverImg">
        <i class="iconfont play icon-bofang2"></i>
        <span class="music-name">
            摩羯aaaaaaaasdsfsdfsdfsdfsdfsdfasdfsdfs
            asdfsdfsdfsadfsdfadfasdfsdfsdfsdfsdf<i class="iconfont icon-sq"></i>
            <i class="iconfont icon-mv"></i>
        </span>
        <span class="artist">Morris赖仔</span>
        <span class="album">摩羯</span>
        <span class="duration number">03:21</span>
      </div>
      <div class="music-item">
        <span class="rank">02</span>
        <img src="../../assets/cat.jpg" alt="" class="coverImg">
        <span class="music-name">
            摩羯<i class="iconfont icon-sq"></i>
            <i class="iconfont icon-mv"></i>
        </span>
        <span class="artist">Morris赖仔</span>
        <span class="album">摩羯</span>
        <span class="duration">03:21</span>
      </div>
      <div class="music-item">
        <span class="rank">01</span>
        <img src="../../assets/cat.jpg" alt="" class="coverImg">
        <span class="music-name">
            摩羯<i class="iconfont icon-sq"></i>
            <i class="iconfont icon-mv"></i>
        </span>
        <span class="artist">Morris赖仔</span>
        <span class="album">摩羯</span>
        <span class="duration">03:21</span>
      </div>
      <div class="music-item">
        <span class="rank">01</span>
        <img src="../../assets/cat.jpg" alt="" class="coverImg">

        <span class="music-name">
            摩羯<i class="iconfont icon-sq"></i>
            <i class="iconfont icon-mv"></i>
        </span>
        <span class="artist">Morris赖仔</span>
        <span class="album">摩羯</span>
        <span class="duration">03:21</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NewMusic"
  }
</script>

<style lang="less" scoped>
  .new-music-container {
    .contentStyle();
    margin : 0 auto;
    .music-slide-bar {
      text-align : center;
      line-height : 40px;
      margin-bottom : 20px;
      span {
        padding:10px 42px;
        font-size : 15px;
        border-radius : 20px;
        border : 1px solid rgb(198,198,198);
        &:nth-child(2) {
          margin-left : -40px;
        }
      }
      .active {
        color : #fff;
        position : relative;
        background-color :rgb(187,187,187);
      }
    }
    .music-navigation {
      border-bottom : 16px;
      height : 38px;
      span {
        margin-right : 30px;
        padding : 10px 13px;
        color : rgb(103,103,103);
        &:hover {
          cursor : pointer;
        }
      }
      .play-all {
        background-color : rgb(236,65,65);
        color : #fff;
      }
      .collect-all , .play-all {
        i {
          margin-right : 5px;
        }
        font-size : 15px;
        float : right;
        border : 1px solid rgb(198,198,198);
        border-radius :19px;
      }
      .active {
        color : #000;
        font-weight : bold;
      }
    }
    .music-list {
      margin-top : 20px;
      .music-item {
        display :flex;
        align-items: center;
        height : 100px;
        position : relative;
        span:not(.number) {
          overflow : hidden;
          white-space : nowrap;
          text-overflow : ellipsis;
          padding-right : 15px;
        }
        .play {
          position :absolute;
          top : 33px ;
          padding : 8px;
          text-align : center;
          left : 87px;
          font-size : 18px;
          border-radius : 50%;
          color : rgb(236,65,65);
          background-color : #fff;
        }
        .rank {
          margin :0 24px;
        }
        .coverImg {
          width : 75px;
          height : 75px;
          border-radius : 8px;
          margin-right : 15px;
        }
        .music-name {
          width : 38%;
          i {
            color : rgb(236,66,66);
            margin : 0 5px;
          }
          .icon-sq {
            vertical-align : -4px;
            font-size : 27px;
          }
          .icon-mv {
            font-size : 20px;
          }
        }
        .artist {
          width : 16%;
        }
        .album {
          width : 19%;
          margin-left :8%;
        }
        &:nth-child(odd) {
          background-color : rgb(249,249,249);
        }
      }
    }
  }
</style>
