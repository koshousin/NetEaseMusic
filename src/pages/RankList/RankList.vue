<template>
  <div class="board-container" @click="toSongListDetail">
    <div class="official-boards">
      <div class="board-title">官方榜</div>
      <div class="board" v-for="(item , index) in allBoardList.list.slice(0,4)" :key="index">
        <div class="board-title">
          <!-- 216 * 216 -->
          <div class="cover-item coverImg">
            <img :src="item.coverImgUrl" :data-id="item.id" class="coverImg" alt="">
          </div>
          <div class="update-time">{{item.updateTime | dateFormat}}更新</div>
          <div class="play-key">
            <i class="iconfont icon-bofang2" :data-id="item.id"></i>
          </div>
        </div>
        <div class="board-list">
          <div class="board-item" v-for="(music , index) in item.tracks" :key="index">
            <span class="order">{{index + 1}}</span>
            <span class="trend-state">
<!--              <i class="percent">671%</i>-->
            </span>
            <span class="music-name">{{music.first}}</span>
            <span class="artist">{{music.second}}</span>
          </div>
          <div class="board-item see-more">查看全部</div>
        </div>
      </div>
      <div class="board">
        <div class="board-title">
          <div class="cover-item">
            <img :src="allBoardList.artistToplist.coverUrl" class="coverImg" alt="">
          </div>
          <div class="update-time">每天更新</div>
        </div>
        <div class="board-list">
          <div class="board-item" v-for="(artist , index) in allBoardList.artistToplist.artists" :key="index">
            <span class="order">{{index + 1}}</span>
            <span class="trend-state">
<!--              <i class="iconfont icon-icon-test1"></i>-->
            </span>
            <span class="name">{{artist.first}}</span>
          </div>
          <div class="board-item see-more">查看全部</div>
        </div>
      </div>
    </div>
    <div class="global-boards">
      <div class="board-title">全球榜</div>
      <div class="boards">
        <div class="board-item" v-for="(item , index) in allBoardList.list.slice(4)" :key="index">
          <img class="coverImg" :data-id="item.id" :src="item.coverImgUrl" alt="">
          <span class="play-count">
              <i class="iconfont icon-bofang"></i>
              <span>{{item.playCount | countFormat}}</span>
          </span>
          <span class="play-key">
            <i class="iconfont icon-bofang2" :data-id="item.id"></i>
         </span>
          <div class="board-name">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "RankList" ,
    computed : {
      ...mapState(['allBoardList'])
    } ,
    beforeMount() {
      this.$store.dispatch('getAllBoardList')
    } ,
    methods : {
      toSongListDetail (e) {
        console.log(e.target.dataset.id)
        if(e.target.className === 'coverImg' || e.target.className === 'icon-bofang2'){
          this.$router.push(`/songlistdetail/${e.target.dataset.id}`)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
 @import "../../../static/css/common";
 @import "../../../static/css/contentCommon";
  /* 排行榜页面样式 */
  .board-container {
    .contentStyle();
    margin : 0 auto;
    // 官方榜单样式
    .official-boards {
      .board-title {
        .title();
        color : rgb(55,55,55);
      }
      .board {
        position : relative;
        display : flex;
        margin-bottom : 24px;
        .board-title {
          width : 180px;
          height : 180px;
          position : relative;
          overflow : hidden;
          border-radius : 8px;
          .backImg {
            width : 100%;
            height : 100%;
            img {
              width : 100%;
              height : 100%;
              border-radius : 8px;
              filter : blur(5px);
            }
          }
          &:hover .play-key {
            opacity : .7;
          }
          .update-time {
            position : absolute;
            font-size : 13px;
            top : 60%;
            color : #fff;
            text-align : center;
            width : 100%;
            color : rgba(255,255,255,.7)
          }
          .play-key {
            .play-key();
          }
          .cover-item {
            position : absolute;
            top : 0;
            left : 0;
            opacity: .8;
            .coverImg {
              width : 180px;
              height : 180px;
              border-radius : 8px;
            }
          }
        }
        .board-list {
          margin-left : 40px;
          flex-grow : 1;
          display : flex;
          box-sizing: border-box;
          flex-direction : column;
          .board-item:nth-child(odd) {
            background-color :rgb(249,249,249);
          }
          .board-item {
            line-height : 44px;
            padding : 0 15px;
            font-size : 14px;
            &:hover {
              cursor : auto;
              background-color : rgb(244,244,244);
            }
            .order {
              font-weight : bold;
              color : @mainColor;
              font-size : 15px;
            }
            span{
              &:nth-child(4) {
                float : right;
                color : rgb(154,154,154)
              }
              margin-right : 10px;
            }
            .trend-state {
              .percent {
                color :rgb(155,155,155);
              }
              .new {
                color : rgb(94,158,95);
              }
              .up {
                color : @mainColor;
              }
              .icon-icon-test1 {
                color : rgb(204,204,204);
              }
            }
            .music-name {
              color : rgb(54,54,54);
            }
          }
          .see-more:hover {
            cursor : pointer;
            color :#000;
            background-color : #fff;
          }
        }
      }
    }
    // 全球榜单样式
    .global-boards{
      margin-bottom : 120px;
      .board-title {
        .title();
      }
      .boards {
        display : flex;
        flex-wrap : wrap;
        justify-content : space-between;
        .board-item {
          width : 18%;
          position : relative;
          margin-bottom : 10px;
          img {
            width : 100%;
            border-radius : 10px;
          }
          .play-count {
            position : absolute;
            right : 5%;
            top : 5%;
            font-size : 13px;
            color :#fff;
          }
          &:hover {
            cursor : pointer;
          }
          &:hover .play-key {
            opacity : .7;
          }
          .board-name {
            line-height : 40px;
            .posterTextStyle();
            padding-left : 5px;
          }
        }
        .play-key {
          .play-key();
        }
      }
    }
  }
</style>
