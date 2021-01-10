<template>
  <!-- 弹窗播放列表 -->
  <div class="play-music-list">
    <!-- 歌单列表头部 -->
    <div class="navigation">
      <span class="active">播放列表</span>
      <span>历史记录</span>
    </div>
    <div class="list-info">
      <span class="total">总{{musicPlayList.length}}首</span>
      <span>
          <i class="iconfont icon-trash"></i>清空
      </span>
      <span>
          <i class="iconfont icon-shoucangjia"></i>收藏全部
      </span>
    </div>
    <!-- 歌单列表 -->
    <div class="list-content">
      <div class="music-item" :class="currentPlay === music.name && 'active' "
           :data-id="music.id" :data-picUrl="music.al.picUrl"
           :data-name="music.name" :data-artist="music.ar[0].name" :data-duration="music.dt"
           v-for="(music , index) in musicPlayList" :key="index" @click="playMusic">
        <span class="play-state">
             <i class="iconfont icon-zantingtingzhi1" v-if="isPlay && currentPlay === music.name"></i>
        </span>
        <span class="song-name">
            {{music.name}}
        </span>
        <span class="artist">
            {{music.ar[0].name}}
        </span>
        <i :data-info="songListDetail.name" class="iconfont icon-web-icon-"></i>
        <span class="duration">{{music.dt | durationFormat}}</span>
      </div>
    </div>
  </div>
</template>
<!-- obj.fee === 8 可以听 ， obj.fee === 4 不放进播放列表 -->
<script>
  import {mapState} from 'vuex'
  export default {
    name: "PlayMusicList" ,
    props : ['currentPlay' , 'isPlay'] ,
    computed : {
      ...mapState(['songListDetail' , 'musicPlayList'])
    } ,
    methods : {
      playMusic(e){
        let {id,picurl,name,artist ,duration}= e.target.parentNode.dataset
        if(id) {
          let info = {picurl,name,artist ,duration}
          this.$store.dispatch('getMusicUrl' , {id,info})
          this.$store.dispatch('updateMusicPlayList')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  // 点击弹窗音乐播放列表样式
  .play-music-list {
    position : absolute;
    z-index: 101;
    height : calc(100vh - 165px);
    width : 525px;
    right : 0;
    bottom : 90px;
    background-color : #fff;
    box-shadow : -3px 0 3px rgba(0,0,0,.1);
    font-size : 15px;
    color :rgb(55,55,55);
    box-sizing: border-box;
    .navigation {
      margin: 40px 0;
      text-align : center;
      span {
        padding : 10px 38px;
        border-radius : 22px;
      }
      .active {
        background-color  : rgb(187,187,187);
        color :#fff;
      }
    }
    .list-info {
      padding :15px 25px;
      border-bottom : 1px solid rgb(229,229,229);
      .total {
        color :rgb(207,207,207);
      }

      span:nth-child(n+2) {
        float : right;
        padding : 0 30px;
        &:hover {
          cursor : pointer;
        }
        .icon-shoucangjia {
          border-right : 1px solid rgb(229,229,229);
        }
        i {
          margin-right : 5px;
        }
      }
    }
    .list-content {
      height :735px;
      box-sizing :  border-box;
      overflow : auto;
      .music-item {
        height : 45px;
        line-height : 45px;
        display : flex;
        .play-state {
          width : 26px;
        }
        .song-name {
          width : 47%;
          padding-right : 15px;
          text-overflow : ellipsis;
          white-space : nowrap;
          overflow : hidden;
        }
        .artist {
          width : 120px;
          text-overflow : ellipsis;
          white-space : nowrap;
          overflow : hidden;
        }
        .icon-web-icon- {
          width : 37px;
          position : relative;
          &::after {
            position : absolute;
            content : attr(data-info);
            padding : 0 5px;
            line-height : 25px;
            text-align : left;
            transform: translateX(-50%);
            left : 0;
            font-size : 13px;
            top : 40px;
            z-index : 10;
            white-space : nowrap;
            background-color : #fff;
            opacity: 0;
            box-shadow : 0 0 2px rgba(0,0,0,.3);
            transition : opacity .3s;
          }
          &:hover , &:hover::after {
            cursor : pointer;
            opacity :1 ;
          }
        }
        &:nth-child(odd) {
          background-color : rgb(249,249,249);
        }
        &:hover {
          background-color :rgb(244,244,244);
        }
      }
      .active {
        span:not(.duration) {
          color : rgb(236,65,65);
        }
        background-color : rgb(230,230,230);
      }
      &::-webkit-scrollbar {
        width : 5px;
        background-color :transparent;
        border-radius : 5px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius : 4px;
        background-color :rgb(225,225,225);
      }
    }
  }
</style>
