<template>
  <div id="app">
    <Header />
    <LeftNavigation />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>

  import Header from "./components/Header/Header";
  import Footer from "./components/Footer/Footer";
  import LeftNavigation from "./components/LeftNavigation/LeftNavigation";
  export default {
    name: 'App' ,
    components : {
      Header ,
      Footer ,
      LeftNavigation
    }
  }
</script>

<style lang="less">

  #app {
    width : 100%;
    height : 100vh;
    position : relative;
  }
</style>
