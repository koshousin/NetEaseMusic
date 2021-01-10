<template>
  <div class="comment-list" v-if="songListComment">
    <div class="input-comment">
      <textarea v-model="inputComment" name="" id="" cols="30" rows="3"></textarea>
      <span class="left-space">{{leftLetterCount}}</span>
      <div class="commit-comment">
        <i class="iconfont icon-at"></i>
        <i class="iconfont icon-xiaolian"></i>
        <i class="iconfont icon-jinghao" @click="createTopic"></i>
        <span class="comment" @click="commitComment">
            <span class="padding">a</span>
            评论
            <span class="padding">a</span>
        </span>
      </div>
    </div>
    <ul class="comment-ul" v-show="songListComment.hotComments && songListComment.hotComments.length > 0">
      <li class="caption">精彩评论</li>
      <li class="comment-li" v-for="(comment , index) in songListComment.hotComments" :key="index">
        <img :src="comment.user.avatarUrl" class="avatar-img" alt="">
        <div class="person-comment">
          <div class="comment-content">
            <span class="name">{{comment.user.nickname}}:</span>
            {{comment.content}}
          </div>
          <div class="comment-content replied" v-if="comment.beReplied && comment.beReplied.length > 0">
            <span class="name">@{{comment.beReplied[0].user.nickname}}:</span>{{comment.beReplied[0].content}}
          </div>
          <div class="comment-info">
            <span class="comment-date">{{comment.time | date2Format}}</span>
            <i class="iconfont icon-pinglunbeifen"></i>
            <i class="iconfont icon-fenxiang"></i>
            <i class="iconfont icon-zan">{{comment.likedCount ? (comment.likedCount < 1000 ? comment.likedCount : '999+') : ''}}</i>
            <i class="report">举报</i>
          </div>
        </div>
      </li>
    </ul>
    <ul class="comment-ul" v-show="songListComment.comments && songListComment.comments.length > 0">
      <li class="caption">最新评论({{songListComment.total}})</li>
      <li class="comment-li" v-for="(comment ,index) in songListComment.comments" :key="index">
        <img :src="comment.user.avatarUrl" class="avatar-img" alt="">
        <div class="person-comment">
          <div class="comment-content">
            <span class="name">{{comment.user.nickname}}:</span>{{comment.content}}
          </div>
          <div class="comment-content replied" v-if="comment.beReplied && comment.beReplied.length > 0">
            <span class="name">@{{comment.beReplied[0].user.nickname}}:</span>{{comment.beReplied[0].content}}
          </div>
          <div class="comment-info">
            <span class="comment-date">{{comment.time | date2Format}}</span>
            <i class="iconfont icon-pinglunbeifen"></i>
            <i class="iconfont icon-fenxiang"></i>
            <i class="iconfont icon-zan">{{comment.likedCount > 0 ? (comment.likedCount < 1000 ? comment.likedCount : '999+') : ''}}</i>
            <i class="report">举报</i>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "Comment" ,
    props : ['id'] ,
    data (){
      return {
        inputComment : '' ,
      }
    } ,
    computed : {
      ...mapState(['songListComment','songListDetail']) ,
      leftLetterCount() {
        let inputComment = this.inputComment.trim();
        return 140-(inputComment.length)
      }
    } ,
    methods : {
      createTopic(){
        this.inputComment = '#随便写点什么吧~#'
      } ,
      commitComment(){
        let content = this.inputComment
        let id = this.id
        this.inputComment = ''
        // 提交完评论后然后再提交获取评论
        this.$store.dispatch('getComment',{id,content})
      }
    }
  }
</script>

<style lang="less" scoped>
  //  评论列表样式
  .comment-list {
    .input-comment {
      position: relative;
      margin-bottom : 40px;
      textarea {
        box-sizing : border-box;
        resize : none;
        width : 100%;
        height : 86px;
        border : 1px solid #ddd;
        border-radius : 7px;
        line-height : 25px;
        font-size : 15px;
        padding : 0 10px;
        outline : none;
        &::-webkit-scrollbar {
          width : 8px;
          background-color :transparent;
          border-radius : 5px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius : 4px;
          background-color :rgb(225,225,225);
        }
      }
      .left-space {
        position : absolute;
        right : 10px;
        top : 60px;
        color : rgb(223,207,223);
        font-size : 14px;
      }
      .commit-comment {
        margin-top : 15px;
        height : 38px;
        line-height : 38px;
        i{
          margin-right : 20px;
          font-size : 20px;
          color : rgb(111,111,111);
          &:hover {
            color :black;
          }
        }
        .comment {
          float: right;
          display : inline-box;
          padding : 0 5px;
          border : 1px solid #eee;
          border-radius : 19px;
          .padding {
            color : transparent;
          }
          &:hover {
            background-color : rgb(242,242,242);
            cursor : pointer;
          }
        }
      }
    }
    .comment-ul {
      .caption {
        font-size :18px;
        font-weight : bold;
      }
      li {
        margin-bottom : 25px;
      }
      .comment-li {
        display : flex;
        padding-bottom : 24px;
        .avatar-img {
          width : 46px;
          height : 46px;
          border-radius : 50%;
          margin-right : 18px;
        }
        .person-comment {
          flex-grow : 1;
          font-size : 14px;
          .comment-content {
            line-height : 1.5;
            color : rgb(55,55,55);
            margin-bottom : 10px;
            .name {
              color :rgb(80,125,175);
            }
          }
          .replied {
            background-color :rgb(244,244,244);
            padding :10px;
            border-radius : 5px;
          }
          .comment-info {
            .comment-date {
              color : rgb(159,159,159);
            }
            i {
              float : right ;
              width : 65px;
            }
            .report {
              color : transparent;
              &:hover {
                color : rgb(159,159,159);
              }
            }
          }
        }
        //  只留下倒数第一个没有底边框
        &:nth-last-child(n+2) {
          border-bottom : 1px solid #eee;
        }
      }
    }
  }
</style>
