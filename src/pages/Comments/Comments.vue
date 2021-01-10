<template>
  <div class="comment-container">
    <Comment :id="id" />
    <PageCount @handle_pagecount_click="handlePageCountClick" :page-count=Math.ceil(commentCount/30)
               v-show="commentCount > 30" />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Comment from "../../components/Comment/Comment";
  import PageCount from "../../components/PageCount/PageCount";
  export default {
    name: "Comments" ,
    props : ['id','commentCount'] ,
    components : {
      PageCount , Comment
    } ,
    computed : {
      ...mapState(['songListComment','songListDetail']) ,
    } ,
    methods : {
      handlePageCountClick(page){
        let {id} = this
        this.$store.dispatch('getSongListComment',{id,page})
      } ,
    } ,
    mounted() {
      let {id} = this
      this.$store.dispatch('getSongListComment',{id})
    } ,
    watch : {
      id (value){
        this.$store.dispatch('getSongListComment',{id : value})
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
