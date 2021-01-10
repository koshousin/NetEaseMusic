<template>
  <div id="app">
    <Header />
    <LeftNavigation />
    <div class="main-right">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
  import Header from "./components/Header/Header";
  import Footer from "./components/Footer/Footer";
  import LeftNavigation from "./components/LeftNavigation/LeftNavigation";
  import {mapState} from "vuex";
  import BScroll from "@better-scroll/core";
  export default {
    name: 'App' ,
    components : {
      Header ,
      Footer ,
      LeftNavigation
    } ,
    computed : {
      ...mapState(['userInfo'])
    } ,
    beforeMount() {
      this.$store.dispatch('getUserinfoByCookie')

      // this.userInfo['userId'] && this.$store.dispatch('getUserPlaylist')

    } ,
    watch : {
      userInfo (){
        this.$store.dispatch('getUserPlaylist', () => {
          this.$nextTick( () => {
            let wrapper = document.querySelector('.wrapper')
            let bs = new BScroll(wrapper,{
              probeType : 1 ,
              scrollY : true ,
              bounce : {
                top : true ,
                bottom : true
              } ,
              mouseWheel : true ,
              click : true ,
              preventDefault : true
            })
          } )
        } )
      }
    } ,
  }
</script>

<style lang="less">

  #app {
    width : 100%;
    height : 100vh;
    position : relative;
  }
  .main-right {
    width: calc(100vw - 250px);
    margin-left: 250px;
    position: relative;
    padding-top:105px;
  }
</style>
