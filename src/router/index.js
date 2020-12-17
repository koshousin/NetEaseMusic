import Vue from 'vue'
import Router from 'vue-router'
// 导入路由组件
import Main from '../pages/Main/Main'
import AnchorRadio from "../pages/AnchorRadio/AnchorRadio";
import Personal from "../pages/Personal/Personal";
import RankList from "../pages/RankList/RankList";
import SongList from "../pages/SongList/SongList";
import LatestMusic from "../pages/LatestMusic/LatestMusic";
import Artist from "../pages/Artist/Artist";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/main',
      component : Main ,
      children : [
        {
          path : '/main/personal' ,
          component : Personal
        } ,
        {path : '/main/songlist',component: SongList} ,
        {path : '/main/anchorradio',component: AnchorRadio} ,
        {path : '/main/ranklist',component: RankList} ,
        {path : '/main/artist',component: Artist},
        {path : '/main/latestmusic',component : LatestMusic} ,
        {path : '/' , redirect : '/main/personal'}
      ]
    },
    {
      path: '/',
      redirect : '/main'
    }
  ]
})
