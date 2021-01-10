import Vue from 'vue'
import Router from 'vue-router'
// 导入路由组件
import Discover from "../pages/Discover/Discover";
import AnchorRadio from "../pages/AnchorRadio/AnchorRadio";
import Personal from "../pages/Personal/Personal";
import RankList from "../pages/RankList/RankList";
import SongList from "../pages/SongList/SongList";
import LatestMusic from "../pages/LatestMusic/LatestMusic";
import Artist from "../pages/Artist/Artist";
import SongListDetail from "../pages/SongListDetail/SongListDetail";
import MusicList from "../pages/MusicList/MusicList";
import Comments from "../pages/Comments/Comments";
import Collectors from "../pages/Collectors/Collectors";
import SongLyricInfo from "../pages/SongLyricInfo/SongLyricInfo";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/discover',
      component : Discover ,
      children : [
        {
          path : '/discover/personal' ,
          component : Personal
        } ,
        {path : '/discover/songlist',component: SongList} ,
        {path : '/discover/anchorradio',component: AnchorRadio} ,
        {path : '/discover/ranklist',component: RankList} ,
        {path : '/discover/artist',component: Artist},
        {path : '/discover/latestmusic',component : LatestMusic} ,
        {path : '/' , redirect : '/discover/personal'}
      ]
    },
    {
      path : '/songlistdetail/:id' ,
      component: SongListDetail ,
      props : (route) => {
        return {
          id : route.params.id
        }
      } ,
      children : [
        {
          path : '/songlistdetail/:id/musiclist' ,
          component : MusicList
        } ,
        {
          path : '/songlistdetail/:id/comments' ,
          component: Comments
        } ,
        {
          path : '/songlistdetail/:id/collectors',
          component : Collectors
        } ,
        {
          path : '/' ,
          redirect : '/songlistdetail/:id/musiclist'
        }
      ]
    } ,
    {
      path: '/songlyric' ,
      component: SongLyricInfo
    },
    {
      path: '/',
      redirect : '/discover'
    }
  ]
})
