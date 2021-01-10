<template>
  <!-- 新歌速递 -->
  <div class="new-music-container">
    <div class="music-slide-bar" @click.stop="handleNavigationClick">
      <span data-desc="newMusic" :class="newMusicTag[0] === 'newMusic' && 'active' ">新歌速递</span>
      <span data-desc="newRecord" :class="newMusicTag[0] === 'newRecord' && 'active' ">新碟上架</span>
    </div>
    <div class="music-navigation" @click.stop="handleNavigationClick">
      <span data-desc=0 :class="newMusicTag[1] == 0 && 'active' ">全部</span>
      <span data-desc=7 :class="newMusicTag[1] == 7 && 'active' ">华语</span>
      <span data-desc=96 :class="newMusicTag[1] == 96 && 'active' ">欧美</span>
      <span data-desc=16 :class="newMusicTag[1] == 16 && 'active' ">韩国</span>
      <span data-desc=8 :class="newMusicTag[1] == 8 && 'active' ">日本</span>
      <span class="collect-all"><i class="iconfont icon-shoucangjia"></i>收藏全部</span>
      <span class="play-all"><i class="iconfont icon-bofang1"></i>播放全部</span>
    </div>
    <!-- 535 -->
    <div class="music-list" v-if="newMusic && newMusic.length > 0">
      <div class="music-item" v-for="(music , index) in newMusic" :key="index">
        <span class="rank number">{{index + 1}}</span>
        <img v-lazy="music.album.picUrl" alt="" class="coverImg">
        <i class="iconfont play icon-bofang2"></i>
        <span class="music-name">
            {{music.name}}<i class="iconfont icon-sq"></i>
            <i class="iconfont icon-mv"></i>
        </span>
        <span class="artist">{{music.artists[0].name}}</span>
        <span class="album">{{music.album.name}}</span>
        <span class="duration number">{{music.duration | durationFormat}}</span>
      </div>
    </div>
    <div class="loading" v-else style="font-size : 50px; text-align : center">Loading...</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data(){
      return {
        newMusicTag : ['newMusic',0]      // 全部：0  华语：7  欧美：96  日本：8   韩国：16
      }
    } ,
    computed : {
      ...mapState(['newMusic'])
    } ,
    beforeMount(){
      this.$store.dispatch('getNewMusic',0)
    } ,
    methods : {
      handleNavigationClick(e){
        let desc = e.target.dataset.desc
        if(e.target.nodeName === 'SPAN' && desc){
          // 添加active
          if(desc === 'newMusic' || desc === 'newRecord'){
            this.newMusicTag.splice(0,1,desc)
          } else {
            this.newMusicTag.splice(1,1,desc)
            this.$store.dispatch('getNewMusic' , desc)
          }
          console.log(desc)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.new-music-container {
  width : 90%;
  max-width : 1372px;
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
