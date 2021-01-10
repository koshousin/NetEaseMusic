<template>
  <!-- 歌单下面的歌曲列表  -->
  <div class="board-list" @click="playMusic">
    <div class="music-item">
      <span class="operation"></span>
      <span class="music-title">音乐标题</span>
      <span class="surge-rate">{{songListDetail.name.includes('飙升') ? '飙升率' : ''}}</span>
      <span class="artist">歌手</span>
      <span class="album">专辑</span>
      <span class="duration">时长</span>
    </div>
    <!-- 42 -->
    <div class="music-item" :data-id="item.id" :data-picUrl="item.al.picUrl"
         :data-name="item.name" :data-artist="item.ar[0].name" :data-duration="item.dt"
         v-for="(item , index) in songList(keyword)" :key="index">
      <span class="operation">
          <span class="rank">{{index + 1}}</span>
          <span class="iconfont icon-xinaixin"></span>
          <span class="iconfont icon-xiazaiguanli"></span>
      </span>
      <span class="music-title">
          {{item.name}}
          <span style="color:rgb(150,150,151) ; font-size: 14px">{{item.alia[0] ? `(${item.alia[0]})` : ''}}</span>
          <i class="iconfont icon-sq"></i>
          <i class="iconfont " :class="item.mv && 'icon-mv'"></i>
      </span>
      <span class="surge-rate">
        {{songListDetail.trackIds.find(e => e.id === item.id).ratio ? songListDetail.trackIds.find(e => e.id === item.id).ratio+'%' : ''}}
      </span>
      <span class="artist">{{item.ar ? item.ar[0].name : ''}}</span>
      <span class="album">{{item.al ? item.al.name : ''}}</span>
      <span class="duration">{{item.dt | durationFormat}}</span>
    </div>
  </div>
</template>

<script>
  import {mapState , mapGetters} from 'vuex'
  export default {
    name: "MusicList" ,
    props : ['keyword'] ,
    computed : {
      ...mapState(['songListDetail']),
      ...mapGetters(['songList'])
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
  .board-list {
    .music-item {
      display : flex;
      line-height : 40px;
      height : 40px;
      font-size : 15px;
      span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing :border-box;
        padding-right : 8px;
        &:hover {
          cursor : default;
        }
      }
      .operation {
        width : 90px;
        box-sizing :border-box;
        padding :0 5px;
        display : flex;
        justify-content : space-between;
        margin-right : 22px;
        color : rgb(184,184,184);
        span:nth-child(n+2):hover {
          color : #666;
          cursor : pointer;
        }
      }
      .music-title {
        width : 34%;
        i {
          margin-left : 5px;
          font-size : 25px;
          color :rgb(236,65,65);
          vertical-align : -3px;
        }
        .icon-mv {
          font-size : 19px;
          vertical-align : 0;
          font-weight : bold;
        }
      }
      .surge-rate {
        width : 7%;
      }
      .artist {
        width : 22%;
      }
      .album {
        width : 22%;
        margin-right : 15px;
      }
      .duration {

      }
      &:nth-child(even) {
        background-color : rgb(249,249,249);
      }
      &:nth-child(1) {
        color : rgb(184,184,184);
      }
      &:nth-child(n + 2) {
        & > span:not(.operation) {
          color : rgb(103,103,103);
        }
        &:hover {
          background-color : rgb(240,241,242);
        }
      }
    }
  }
</style>
