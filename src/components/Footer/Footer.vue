<template>
  <!-- 客户端底部部分 -->
  <div>
    <audio ref="player" :src="musicUrlInfo.url" autoplay></audio>
    <div class="footer-player" v-if="musicUrlInfo.url">
      <!-- 底部左边部分 -->
      <div class="player-left">
        <div class="music-poster">
          <img :src="musicUrlInfo.info.picurl" alt="">
          <div class="cloak" @click="showSongLyric">
            <span class="iconfont" :class="lyricIsShow ? showLyricModel[0] : showLyricModel[1] "></span>
          </div>
        </div>
        <div class="music-info">
          <div class="title">
            <span class="music-name">{{musicUrlInfo.info.name}}</span>
            <span class="iconfont icon-xinaixin"></span>
          </div>
          <div class="artist">{{musicUrlInfo.info.artist}}</div>
        </div>
      </div>
      <!-- 底部中间控制以及进度条显示 -->
      <div class="player-control">
        <div class="control-icons">
          <span class="iconfont" :class="playModel[(this.clickTime%3)]" @click="changePlayModel"></span>
          <span class="iconfont icon-shangyishou1" @click="switchMusic(currentModel , -1)"></span>
          <span id="mid-icon" class="iconfont" :class="isPlay ? 'icon-zantingtingzhi1' : 'icon-bofang2' "
                @click="controlPlay"></span>
          <span class="iconfont icon-nextaudio" @click="switchMusic(currentModel , 1)"></span>
          <span class="iconfont icon-ciyushiyi"></span>
        </div>
        <div class="process-bar">
          <span class="start time">{{currentTime*1000 | durationFormat}}</span>
          <div class="line" @click="processSkip">
            <div class="play-line"></div>
            <div ref="played" class="played-line"></div>
          </div>
          <span class="end time">{{musicUrlInfo.info.duration*1 | durationFormat}}</span>
        </div>
      </div>
      <!-- 底部右边部分  -->
      <div class="player-right">
        <span class="iconfont icon-yinxiao"></span>
        <span class="iconfont icon-icon-test"></span>
        <div class="volume" @click="handleVolumeClick">
          <div class="volume-line"></div>
          <div class="now-volume" ref="volumeLine"></div>
        </div>
        <span class="iconfont icon-bofangliebiao" @click="showPlayList"></span>
      </div>
      <PlayMusicList :isPlay="isPlay" :currentPlay="musicUrlInfo.info.name" v-show="isShow" />
      <!-- 控制歌词显示     -->
      <SongLyricInfo :rate="rate" :time="currentTime" :isShow="isPlay" :musicInfo="musicUrlInfo" v-show="lyricIsShow" />
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  import PlayMusicList from "../PlayMusicList/PlayMusicList";
  import SongLyricInfo from "../../pages/SongLyricInfo/SongLyricInfo";
  export default {
    name: "Footer" ,
    components : {
      PlayMusicList ,
      SongLyricInfo
    } ,
    data(){
      return {
        isPlay : true ,
        currentTime : 0,
        isShow : false ,
        clickTime : 0 ,
        currentModel : 'icon-suijibofang' ,
        playModel : ['icon-suijibofang' , 'icon-danquxunhuan' , 'icon-xunhuanbofang']  ,   // 随机、单曲循环、循环播放
        showLyricModel : ['icon-suoxiao' , 'icon-zhankaiquanpingkuozhan']  ,     // 缩小 ， 扩大
        lyricIsShow : false ,
        rate : 0 ,    // 当前已播放的百分比
      }
    } ,
    computed : {
      ...mapState(['musicUrlInfo' , 'musicPlayList']) ,
    } ,
    mounted() {
    } ,
    methods : {
      controlPlay(){
        this.isPlay = !this.isPlay
        if(this.isPlay){
          this.$refs.player.play()
        } else {
          this.$refs.player.pause()
        }
      } ,
      showPlayList(){
        this.isShow = !this.isShow
      } ,
      changePlayModel(){
        this.clickTime++;
        this.currentModel = this.playModel[(this.clickTime % 3)]
      } ,
      // 进度条跳转
      processSkip (e){
        let x = e.offsetX;
        let rate = Math.round(x / 481 * 10000 ) / 10000
        // 获取当前音乐总时长
        let duration = this.musicUrlInfo.info.duration * 1
        // 改变起点位置，以及当前 audio 的 current
        this.$refs.player.currentTime = Math.round(duration * rate / 1000)
        this.timeLineShow(this.$refs.player.currentTime)
      } ,
      // 音量控制
      handleVolumeClick(e){
        let rate = e.offsetX / 100
        this.$refs.player.volume = rate
        console.log()
        this.$refs.volumeLine.style.width = `${rate * 100}%`
      } ,
      // 音乐播放结束后的回调/切换到下一首歌(需要的参数：当前的播放模式，以及需要动态计算出所需下一首歌的下标)
      switchMusic(model , isNext = 1){
        let {playModel} = this
        // 声明下一首歌的索引
        let nextIndex
        // 当前列表长度
        let range = this.musicPlayList.length
        // 得到当前播放的音乐的在列表中的索引
        let id = this.musicUrlInfo.id
        let currentIndex = this.musicPlayList.findIndex( item => item.id === id)
        if(model === playModel[0]){             //  随机播放
          let randomIndex = Math.floor( Math.random() * range )     // 0 ~ range-1
          if(randomIndex === currentIndex){       // 当随机到的数等于当前下标时
            if(currentIndex !== range -1){
              nextIndex = currentIndex + 1
            }else { nextIndex = 0 }
          } else {                                // 当随机到的数不等于当前下标时则赋值给下首歌下标
            nextIndex = randomIndex
          }
        } else if(model === playModel[1]) {     // 单曲循环
          nextIndex = currentIndex
        } else {                                // 顺序列表播放：顺序播放
          nextIndex = currentIndex + isNext
          if(nextIndex >= range && nextIndex <= 0) {
            nextIndex = 0
          }
        }
        // console.log(nextIndex)
        let nextId = this.musicPlayList[nextIndex].id
        // 获取下一首歌的info (picurl,name,artist ,duration)
        let target = this.musicPlayList[nextIndex]
        // console.log(target)
        let info = {
          picurl : target.al.picUrl ,
          name : target.al.name ,
          artist : target.ar[0].name ,
          duration : target.dt
        }
        this.$store.dispatch('getMusicUrl' , {id : nextId , info} )
      } ,
      // 传入一个 currentTime 参数，更改进度条的长度
      timeLineShow(time){
        let rate = time*1000 / this.musicUrlInfo.info.duration*1
        rate = Math.round(rate*1000) / 10
        this.rate = rate
        this.$refs.played.style.width = `${rate}%`
      } ,
      showSongLyric(){
        this.lyricIsShow = !this.lyricIsShow
      }
    } ,
    watch : {
      musicUrlInfo() {
        this.isPlay = true
        this.$refs.player.addEventListener('timeupdate',() => {
          let time = this.$refs.player.currentTime
          this.currentTime = time
          this.timeLineShow(time)
        })
        // this.$refs.player.remove
        this.$refs.player.addEventListener('ended',() => {
          console.log("结束了。。。。。")
          let model = this.currentModel
          this.switchMusic(model)
        })
      }
    }
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
          border-radius : 5px;
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
        .artist {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
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
          width : 100%;
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
