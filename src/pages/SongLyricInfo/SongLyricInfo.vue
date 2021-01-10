<template>
  <div class="song-info-container">
    <div class="content">
      <div class="record-info">
        <div class="record " :class="isShow && 'active' ">
          <img src="../../assets/needle.png" alt="" class="needle">
          <div class="record-img">
            <img :src="musicInfo.info.picurl" alt="" class="img-album">
            <img src="../../assets/black-record.png" alt="" class="img-border">
          </div>
          <div class="music-control">
            <!-- 喜欢、下载、收藏、分享 -->
            <span class="iconfont icon-xinaixin" @click="showLyric"></span>
            <span class="iconfont icon-shoucangjia"></span>
            <span class="iconfont icon-xiazaiguanli"></span>
            <span class="iconfont icon-fenxiang"></span>
          </div>
        </div>
        <div class="lyric-info">
          <div class="music-title">
            <span>{{musicInfo.info.name}}</span>
            <i class="iconfont icon-biaozhun"></i>
          </div>
          <div class="music-info">
            <span class="artist">
                歌手: <span class="special">{{musicInfo.info.artist}}</span>
            </span>
          </div>
          <div class="lyric-container" ref="lyricScroll">
            <div class="lyric"  v-if="songLyric.length > 0">
              <p v-for="(item , index) in songLyric" :class="{active : index === lyricTime}"
                 :key="index">
                <!-- item.replace(/\[\d.+\]/g,'')   -->
                {{item.replace(/\[\d.+\]/g,'') }}
              </p>
            </div>
          </div>
        </div>
        <div class="comment-info"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "SongLyricInfo" ,
    data(){
      return {
        currentLyricIndex : 0
      }
    },
    props : ['musicInfo' , 'isShow' , 'time' , 'rate'] ,    // 歌曲信息、当前播放时间、已播放百分比
    computed : {
      ...mapState(['songLyric']) ,
      lyricTime(){      // time 格式 00:00
        // 当前音乐播放的时间
        let currentTime = Math.round(this.time * 10)/10
        // 从当前储存数组中查找
        let currentIndex =  this.lyricTimeArr.findIndex(
          (item , index) => {
            if(index + 1 === this.lyricTimeArr.length-1){
              return currentTime >= item
            } else {
              return currentTime >= item && currentTime < this.lyricTimeArr[index + 1]
            }
          }
        )
        if(this.currentLyricIndex !== currentIndex) {
          this.currentLyricIndex = currentIndex
        }
        return currentIndex
      }
    },

    mounted () {
      // this.imgUrl = `url(${require(this.musicInfo.info.picurl)})`
      let id = this.musicInfo.id
      console.log(id)
      this.$store.dispatch('getSongLyric' , {id , cb : this.showLyric})
      // 添加歌词滚动监听
      this.$refs.lyricScroll.addEventListener('scroll' , (e) => {
        if(e.target.scrollTop){
          // console.log("onScroll.." , e.target.scrollTop)
          // 获取歌词的高度
        }
      })
    },
    methods : {
      showLyric(){
        //将歌词的时间记录成一个数组，从数组里面寻找time  使用 map加工成保留一位小数的秒计量
        this.$nextTick( () => {
          this.lyricTimeArr = this.songLyric.map( item => {
            let minute = item.slice(1,3) * 1
            let second = item.slice(4,8) * 1
            return minute * 60 + second
          })
          // 获取当前歌词的高度
          let lyricObj = this.$refs.lyricScroll.children[0]
          this.songScrollHeight = Number.parseInt(getComputedStyle(lyricObj).getPropertyValue('height'))
          console.log("scrollHeight:" ,this.songScrollHeight ,lyricObj)
        })
      }
    } ,
    watch : {
      musicInfo(){
        let id = this.musicInfo.id
        this.$refs.lyricScroll.scrollTop = 0
        this.$store.dispatch('getSongLyric' , {id , cb:this.showLyric})
      } ,
      // rate (value){
      //   // 先获取最大滚动的高度
      //   let height = 400 - 400 * (Math.round(400/this.songScrollHeight))
      //   console.log(height * (value/100) + 'px')
      //   this.$refs.lyricScroll.scrollTop = Math.round(height * (value/100) * 10)/10
      // }
      currentLyricIndex(value){
        // console.log("computed:" , value)
        if(0 < value * 1  && value <= 8){
          this.$refs.lyricScroll.scrollTop = 16 * value
        } else if(value * 1 > 8) {
          this.$refs.lyricScroll.scrollTop = (16 * 9 + 40 * (value-9))
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .song-info-container {
    position : fixed;
    z-index : 100;
    background-color : #fff;
    width : 100vw;
    height : calc(100vh - 165px);
    left : 0;
    top : 75px;
    overflow: hidden;
    opacity : 1;
    .content {
      width : 1160px;
      height : 100%;
      margin : 0 auto;
      // background-color : #eee;
      padding-right : 100px;
      box-sizing: border-box;
      .record-info {
        position : relative;
        display : flex;
        .record {
          width : 50%;
          height : 600px;
          position : relative;
          .needle {
            position : absolute;
            top : 0;
            left : 215px;
            height : 160px;
            z-index : 10;
            transform-origin : 21.5px 0;
            transform: rotate(-30deg);
            transition : .3s ease-in-out;
          }
          .record-img {
            position :absolute;
            top : 70px;
            left : 25px;
            z-index: 9;
            //background-image : url("../../assets/cat.jpg");
            background-size:225px ;
            background-repeat: no-repeat;
            background-position: 50% 48%;
            .img-album {
              position : absolute;
              width : 225px;
              transform : translate(-50% , -50%);
              border-radius : 50%;
              top : 49%;
              left : 49.5%;
            }
            .img-border {
              width : 400px;
            }
          }
          .music-control {
            position : absolute;
            width : 80%;
            height : 50px;
            line-height : 50px;
            display : flex;
            justify-content: space-evenly;
            bottom : 80px;
            span {
              width : 50px;
              font-size : 17px;
              text-align: center;
              background-color :rgb(245,245,245);
              border-radius : 50%;
              &:hover {
                background-color :#eee;
              }
            }
          }
        }
        .active {
          .needle {
            transform : rotate(0);
          }
          .record-img {
            animation : record-rotate 6s infinite linear .3s;
          }
        }
        @keyframes record-rotate {
          0% {
            transform : rotate(0)
          }
          100% {
            transform : rotate(360deg)
          }
        }
        .lyric-info {
          flex-grow: 1;
          width : auto;
          box-sizing: border-box;
          padding-top : 40px;
          .music-title {
            font-size : 25px;
            margin-bottom : 20px;
            .iconfont {
              font-size : 30px;
              color :rgb(240,103,103);
            }
          }
          .music-info {
            margin-bottom: 40px;
            & > span {
              font-size : 14px;
              letter-spacing: 1px;
              margin-right :50px;
              .special {
                color :rgb(80,125,175);
              }
            }
          }
          .lyric-container {
            height : 400px;
            // background-color : #666;
            box-sizing : border-box;
            overflow-y: auto;
            border-right : 1px solid rgb(243,243,243);
            transition :.2s linear;
            .lyric {
              p {
                color :rgb(102,102,102);
                line-height : 40px;
              }
              .active {
                font-weight : bold;
                font-size :17px;
                color : #000;
              }
            }
            &::-webkit-scrollbar {
              width : 6px;
            }
            &::-webkit-scrollbar-thumb {
              border-radius : 4px;
              background-color : rgb(233,233,235);
            }
          }
        }
      }
    }
  }
</style>
