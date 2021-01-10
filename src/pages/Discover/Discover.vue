<template>
  <!-- 右侧要显示的地方 -->
    <div class="main-container" ref="container" >
      <div class="main-content">
        <RightHeader />
          <router-view @back_to_top="backToTop"></router-view>
      </div>
    </div>
</template>

<script>
import RightHeader from "../../components/RightHeader/RightHeader";
export default {
  components : {
    RightHeader
  } ,
  mounted (){
    this.$refs.container.addEventListener('scroll' , e => {

    })
  } ,
  methods : {
    backToTop(){
      this.$refs.container.scrollTop = 0
    }
  }
}
</script>

<style lang="less" scoped>
  // 内容区域
  .main-container {
    height : calc(100vh - 255px);
    position : fixed;
    width : 90%;
    margin : 0 auto;
    top : 165px;
    overflow-y: auto;
    .main-content {
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
    }
  }
</style>
