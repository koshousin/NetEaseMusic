<template>
  <div class="right-header">
    <div class="header-inner" @click="changeRecommend">
      <span data-desc="personal" class="header-items"
            :class="this.$route.path === '/discover/personal' ? 'active' : '' " >个性推荐</span>
      <span data-desc="songlist" class="header-items"
            :class="this.$route.path  === '/discover/songlist' ? 'active' : '' ">歌单</span>
      <span data-desc="anchorradio" class="header-items"
            :class="this.$route.path  === '/discover/anchorradio' ? 'active' : '' ">主播电台</span>
      <span data-desc="ranklist" class="header-items"
            :class="this.$route.path  === '/discover/ranklist' ? 'active' : '' ">排行榜</span>
      <span data-desc="artist" class="header-items"
            :class="this.$route.path  === '/discover/artist' ? 'active' : '' ">歌手</span>
      <span data-desc="latestmusic" class="header-items"
            :class="this.$route.path  === '/discover/latestmusic' ? 'active' : '' ">最新音乐</span>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "RightHeader" ,
    data(){
      return {
        // selected : 'personal'
      }
    } ,
    computed : {
      ...mapState(['currentMainPath'])
    } ,
    methods : {
      changeRecommend (e){
        if(e.target.dataset.desc) {
          if(this.selected !==  e.target.dataset.desc){   // 当不等于当前路由才会执行以下代码
            this.selected = e.target.dataset.desc
            this.$router.push(`/discover/${this.selected}`)
            // this.$store.dispatch('updateNavigationHistory',{history:`/discover/${this.selected}`})
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  // 右侧头部
  .right-header {
    height : 90px;
    width : calc(100vw - 250px);
    line-height : 90px;
    position : fixed;
    top : 75px;
    left : 250px;
    font-size : 19px;
    background-color :#fff;
    z-index :9;
    .header-inner {
      width :630px;
      display: flex;
      justify-content: space-around;
      .header-items:hover {
        cursor : pointer;
      }
    }
    .active {
      font-size : 22px;
      font-weight : bold;
      position: relative;
      &::after {
        position : absolute;
        top : 65px;
        left : 0;
        right :0;
        margin : 0 auto;
        content : '';
        width : 77%;
        height : 2px;
        background-color: rgb(236,65,65);
      }
    }
  }
</style>
