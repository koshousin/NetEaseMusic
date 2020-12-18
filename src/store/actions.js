/* 发送异步请求并更新数据 */

import request from '../api'
import Cookies from 'js-cookie'

import {
  RECEIVE_BANNERS ,
  RECEIVE_NAVIGATION_HISTORY ,
  RECEIVE_USERINFO ,
  RECEIVE_USER_LEVEL ,
  RECEIVE_MUSIC_CATEGORY ,
  RECEIVE_HOT_MUSIC_CATEGORY ,
  RECEIVE_CURRENT_MUSIC_TAG ,
  RESET_USERINFO ,
  RECEIVE_USER_PLAYLIST ,
  RECEIVE_SHOW_PLAYLIST
} from './mutation-types'

export default {
  /* 同步action */
  // 前进/后退 浏览历史
  updateNavigationHistory({commit} ,{history,isBack}){
    commit(RECEIVE_NAVIGATION_HISTORY , {history , isBack})
  } ,
  // 浏览器Cookie 自动获取用户数据
  getUserinfoByCookie({commit}){
    const userinfo = Cookies.get('userInfo') && JSON.parse(Cookies.get('userInfo'))
    userinfo && commit(RECEIVE_USERINFO , {userinfo})
  } ,
  // 当前选中的 音乐标签
  updateCurrentMusicTag({commit},name){
    commit(RECEIVE_CURRENT_MUSIC_TAG , {name})
  } ,


  /* 异步action */
  // 获取轮播图
  async getBanners ({commit},cb){
    const result = await request.reqBanners()
    if(result.code === 200){
      const banners = result.banners
       commit(RECEIVE_BANNERS,{banners})
    }
    console.log(result)
    cb && cb()
  } ,
  // 手机号密码登录
  async getLogin({commit} ,{phone,password} ) {
    const result = await request.reqLogin(phone , password)
    if(result.code === 200){
      const userinfo = result.profile;
      Cookies.set('userInfo',JSON.stringify(userinfo))
      // 存储 cookie (用于以后的异步操作)
      Cookies.set('user_cookie',result.cookie)
      commit(RECEIVE_USERINFO , {userinfo})
    }
  } ,
  // 获取用户等级
  async getUserLevel ({commit}){
    const result = await request.reqUserLevel()
    if(result.code === 200){
      let level = result.data.level
      commit(RECEIVE_USER_LEVEL ,{level} )
    }
  } ,
  // 获取音乐分类
  async getMusicCategory ({commit}){
  //   1. 先准备一个数组	[]
  //
  //   2. 获取到的数据
  //   Object.key(data.categories).forEach(item => {})
  //
  //   最终的结果：
	// [
  //   {
  //     category : "语种",
  //     types : [...]
  //   },
  //   {
  //     category : "风格",
  //     types : [...]
  //   },
  // ]
    const result = await request.reqMusicCategory();
    if(result.code === 200){
      const category = []
      let {categories , sub} = result
      Object.keys(categories).forEach( categoryIndex => {
        let types = sub.filter( item => item.category === +categoryIndex )
        let obj = {
          category : categories[categoryIndex],
          types ,
          num : categoryIndex
        }
        category.push(obj)
      })
      commit(RECEIVE_MUSIC_CATEGORY , {category})
    }
  } ,
  // 获取热门音乐分类
  async getHotMusicCategory ({commit}){
    const result = await request.reqHotMusicCategory()
    if(result.code === 200){
      const hotCategory = result.tags
      commit(RECEIVE_HOT_MUSIC_CATEGORY , {hotCategory})
    }
  } ,
  // 用户登出
  async getLogout({commit}){
    const result = await request.reqLogout()
    if(result.code === 200){
      commit(RESET_USERINFO)
    }
  } ,
  // 获取用户歌单名称
  async getUserPlaylist({commit , state}){
    if(!state.userInfo['userId']){
      return
    }
    const result = await request.reqUserPlayList(state.userInfo['userId'])
    if(result.code === 200){
      const {playlist}= result
      commit(RECEIVE_USER_PLAYLIST , {playlist})
    }
  } ,
  // 获取要显示的歌单
  async getShowPlaylist ({commit , state}  , page=1){
    let cat = state.currentMusicTag
    if(cat === '全部歌单'){
      cat = '全部'
    }
    let offset = (+page-1) * 100
    const result = await request.reqShowPlaylist(cat , offset )
    if(result.code === 200){
      const playlist = result['playlists']
      commit(RECEIVE_SHOW_PLAYLIST , {playlist})
    }
  }
}
