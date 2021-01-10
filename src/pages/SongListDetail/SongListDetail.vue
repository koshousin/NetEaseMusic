<template>
  <!-- 歌单详情界面 -->
  <div class="song-detail-container">
    <div class="content" v-if="songListDetail.name">
      <!-- 歌单详情头部信息 -->
      <div class="board">
        <img class="coverImg" :src="songListDetail.coverImgUrl" alt="">
        <div class="board-info">
          <div class="board-name">
            <span class="gedan">歌单</span>
            <span class="name">
              {{songListDetail.name}}
          </span>
          </div>
          <div class="author-info">
            <img :src="songListDetail.creator ? songListDetail.creator.avatarUrl : '' " alt="">
            <span class="iconfont icon-vip"></span>
            <span class="name">{{songListDetail.nickname}}</span>
            <span class="time">最近更新:{{songListDetail.updateTime | dateFormat }}</span>
          </div>
          <div class="board-control">
            <span class="play-all">
                <span class="iconfont icon-bofang2"></span>
                <span>播放全部</span>
                <span>+</span>
            </span>
            <span class="collect">
              <span class="iconfont icon-shoucangjia"></span>
              <span>收藏({{songListDetail.subscribedCount | countFormat}})</span>
          </span>
            <span class="share">
              <span class="iconfont icon-fenxiang"></span>
              <span>分享({{songListDetail.shareCount}})</span>
          </span>
            <span class="download-all">
              <span class="iconfont icon-xiazaiguanli"></span>
              <span>下载全部</span>
          </span>
          </div>
          <div class="board-desc">
            <p><span>简介:</span>{{songListDetail.description}}</p>
          </div>
        </div>
      </div>
      <!-- 切换显示 -->
      <div class="list-option" @click="handleOptionClick">
        <span data-label="musiclist" :class="selectedOption === 'musiclist' && 'active' ">歌曲列表</span>
        <span data-label="comments" :class="selectedOption === 'comments' && 'active'">评论({{songListDetail.commentCount}})</span>
        <span data-label="collectors" :class="selectedOption === 'collectors' && 'active'">收藏者</span>
        <i class="iconfont icon-sousuo" v-if="songKeyword.trim().length === 0"></i>
        <i  v-else @click="deleteWord">×</i>
        <input v-if="selectedOption === 'musiclist' " v-model="songKeyword" type="text" placeholder="搜索歌单音乐" class="search-music">
      </div>
      <!-- 榜单歌曲/评论/收藏者。。列表 路由组件 -->
      <keep-alive>
        <router-view :keyword="songKeyword" :id="id" :commentCount="songListDetail.commentCount"></router-view>
      </keep-alive>
    </div>
    <div class="loading" v-else>Loading...</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "SongListDetail" ,
    props : ['id'] ,
    data(){
      return {
        songKeyword : '' ,
        selectedOption : 'musiclist'
      }
    } ,
    computed : {
      ...mapState(['songListDetail'])
    } ,
    beforeMount() {
      let id = this.$route.params.id;
      if(id){
        this.$store.dispatch('getSongListDetail',id)
      } else {console.log("没有ID")}
    } ,
    methods : {
      deleteWord (){
        this.songKeyword = ''
      } ,
      handleOptionClick(e){
        if(e.target.nodeName === 'SPAN'){
          this.selectedOption = e.target.dataset.label
          this.$router.replace(`/songlistdetail/${this.id}/${e.target.dataset.label}`)
        }
      }
    } ,
    watch : {
      id(value){
        // console.log(value)
        this.selectedOption = 'musiclist'
        this.$store.dispatch('getSongListDetail',value)
      }
    } ,
    mounted() {
      // document.querySelector('.song-detail-container').addEventListener('wheel',e => {
      //   console.log("scroll..." , e.scrollTop)
      // })
    }
  }
</script>

<style lang="less" scoped>
  // 歌单详情 样式
  .song-detail-container {
    width:90%;
    max-width: 1372px;
    margin : 0 auto;
    padding-bottom : 100px;
    .content {
      .board {
        display : flex;
        margin-bottom : 38px;
        div {
          margin-bottom : 20px;
        }
        .coverImg {
          width : 230px;
          height : 230px;
          border-radius : 8px;
          margin-right : 27px;
        }
        .board-info {
          flex-grow : 1;
          .board-name {
            height : 38px;
            line-height : 38px;
            box-sizing : border-box;
            .gedan {
              vertical-align : 4px;
              color :rgb(236,65,65);
              line-height : 24px;
              font-size : 13px;
              padding :0 4px;
              border : 1px solid rgb(236,65,65);
              margin-right : 5px;
              border-radius : 3px;
            }
            .name {
              font-size : 27px;
              font-weight :  bold;
            }
          }
          .author-info {
            position : relative;
            vertical-align: center;
            color : rgb(103,103,103);
            font-size : 14px;
            img{
              width : 30px;
              height : 30px;
              border-radius : 50%;
            }
            span:not(.iconfont) {
              margin : 0 6px;
              vertical-align : 8px;
            }
            .name {
              color : rgb(80,125,175);
              &:hover {
                cursor : pointer;
                color : blue;
              }
            }
            .time {
              color :rgb(103 , 103,103);
            }
            .iconfont {
              position : absolute;
              font-size : 11px;
              left : 20px;
              top : 17px;
              color : rgb(236,65,65);
              background-color :  #fff;
              border-radius : 52%;
            }
          }
          .board-control {
            font-size : 15px;
            .play-all {
              background-color :rgb(236,65,65);
              color : #fff;
              span {
                margin-right : 5px;
              }
              &:hover{
                cursor : pointer;
                background-color : rgb(204,50,50)
              }
            }
            & > span {
              margin-right : 14px;
              padding : 8px  21px;
              border-radius : 21px;
              border : 1px solid rgb(216,216,216);
              &:not(.play-all):hover {
                cursor : pointer;
                background-color : #eee;
              }
            }
          }
          .board-desc {
            color : rgb(103,103,103);
            margin-top: 30px;
            p {
              width : 75%;
              font-size : 15px;
              white-space : wrap;
              line-height: 1.5;
            }
          }
        }
      }
      .list-option {
        height : 32px;
        line-height :32px;
        position : relative;
        margin-bottom : 40px;
        i {
          position : absolute;
          right : 5px;
          top : 0;
          color : rgb(50,50,50);
          &:hover {
            cursor : pointer;
          }
        }
        span {
          margin-right : 20px;
        }
        .active {
          position :relative;
          color : #000;
          font-weight : bold;
          &::after {
            position : absolute;
            content : '';
            width : 75%;
            top : 30px;
            height : 3px;
            left : 12.5%;
            background-color : rgb(236,65,65);
          }
        }
        .search-music {
          font-size : 13px;
          height : 30px;
          width : 180px;
          line-height: 30px;
          float : right;
          outline :none;
          border-radius : 15px;
          padding : 0 30px 0 10px;
          border : 1px solid #eee;
        }
      }

    }
    .loading {
      font-size : 50px ;
    }
  }
</style>
