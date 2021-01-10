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
  RECEIVE_SHOW_PLAYLIST ,
  RECEIVE_ALL_BOARD_LIST ,
  RECEIVE_SONG_LIST_DETAIL ,
  RECEIVE_SONG_LIST_COMMENT ,
  RESET_SOMETHING ,
  RECEIVE_SEND_COMMENT ,
  RECEIVE_NEW_MUSIC ,
  RECEIVE_MUSIC_URL ,
  RECEIVE_MUSIC_PLAY_LIST ,
  RECEIVE_SONG_LYRIC
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
    const musicInfo = Cookies.get('musicInfo') && JSON.parse(Cookies.get('musicInfo'))
    userinfo && commit(RECEIVE_USERINFO , {userinfo})
    musicInfo && commit(RECEIVE_MUSIC_URL , {musicInfo})
  } ,
  // 当前选中的 音乐标签
  updateCurrentMusicTag({commit},name){
    commit(RECEIVE_CURRENT_MUSIC_TAG , {name})
  } ,
  // 更新当前播放列表
  updateMusicPlayList({commit}){
    commit(RECEIVE_MUSIC_PLAY_LIST)
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
  async getUserPlaylist({commit , state},cb){
    if(!state.userInfo['userId']){
      return
    }
    const result = await request.reqUserPlayList(state.userInfo['userId'])
    if(result.code === 200){
      const {playlist}= result
      commit(RECEIVE_USER_PLAYLIST , {playlist})
      cb && cb()
    }
  } ,
  // 获取要显示的歌单
  async getShowPlaylist ({commit , state}  , page=1){
    commit(RESET_SOMETHING , 'showPlaylist')
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
  } ,
  // 获取全部的榜单数据
  async getAllBoardList ({commit}){
    const result = await request.reqAllBoardList();
    if(result.code === 200){
      const {list , artistToplist} = result
      const allBoardList = {
        list ,
        artistToplist
      }
      commit(RECEIVE_ALL_BOARD_LIST , {allBoardList})
    }
  } ,
  // 获取歌单详情数据
  async getSongListDetail({commit,state},id){
    commit(RESET_SOMETHING , 'songListDetail')
    const result = await request.reqSongListDetail(id)
    if(result.code === 200){
      const {playlist} = result
      commit(RECEIVE_SONG_LIST_DETAIL , {playlist})
    }
  } ,
  // 获取歌单评论
  async getSongListComment({commit},{id,page=1}){
    //清空上一个缓存的歌单评论
    commit(RESET_SOMETHING,'songListComment')
    let offset = (page-1) * 30
    const result = await request.reqSongListComment(id,offset)
    if(result.code === 200){
      const {topComments , hotComments , comments , total} = result
      const songListComment = {topComments,hotComments,comments,total}
      commit(RECEIVE_SONG_LIST_COMMENT , {songListComment})
    }
  } ,
  // 发布或者删除评论
  async getComment({commit},{t=1,type=2,id,content='',commentId=null , cb=null}){      // 默认发送歌单评论
    // t( 0:删除 1:发送  2:回复 )
    let result
    if(!commentId){    // 发送
      result = await request.reqSendComment(t,type,id,content)
    } else {
      // if(!t){         // 删除评论
      //   const result = await request.reqComment(t,type,id,commentId)
      // } else {        // 回复评论
      //   const result = await request.reqComment(t,type,id,content,commentId)
      // }
    }
    if(result.code === 200){
      console.log("操作评论成功。。。")
      let comment = {...result.comment}
      commit(RECEIVE_SEND_COMMENT , {comment})
    } else {
      console.log("评论操作失败")
    }
  } ,
  // 获取新歌速递
  async getNewMusic({commit} , type){
    commit(RESET_SOMETHING , 'newMusic')
    const result = await request.reqNewMusic(type)
    if(result.code  === 200){
      commit(RECEIVE_NEW_MUSIC , {music : result.data})
    }
  } ,
  // 获取歌曲 url 等信息
  async getMusicUrl({commit} , {id,info}) {
    const result = await request.reqMusicUrl(id)
    if(result.code === 200){
      let musicUrl = result.data[0]
      musicUrl.info = info
      Cookies.set('musicInfo' , JSON.stringify(musicUrl))
      commit(RECEIVE_MUSIC_URL , {musicUrl})
    }
  } ,
  // 获取歌词
  async getSongLyric({commit} , {id,cb}){
    const result = await request.reqSongLyric(id)
    if(result.code === 200){
      let songLyric = result.lrc.lyric.split('\n').slice(0,-1)
      commit(RECEIVE_SONG_LYRIC , songLyric)
      cb && cb()
    }
  }
}
