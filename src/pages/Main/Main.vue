<template>
  <!-- 客户端主体部分 -->
  <div class="main">
    <!-- 右侧头部 -->
    <RightHeader />
    <router-view></router-view>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import RightHeader from "../../components/RightHeader/RightHeader";
  export default {
    name: "Main",
    components : {
      RightHeader
    } ,
    beforeMount() {
      this.$store.dispatch('getUserinfoByCookie')
    }
  }
</script>

<style lang="less" scoped>

</style>
