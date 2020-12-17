
/**/
import Vue from 'vue'
import {
  RECEIVE_BANNERS ,
  RECEIVE_NAVIGATION_HISTORY ,
  RECEIVE_USERINFO ,
  RECEIVE_USER_LEVEL ,
  RECEIVE_MUSIC_CATEGORY ,
  RECEIVE_HOT_MUSIC_CATEGORY ,
  RECEIVE_CURRENT_MUSIC_TAG
} from './mutation-types'

export default {
  [RECEIVE_BANNERS] (state , {banners}) {
    state.banners = banners
  } ,
  [RECEIVE_NAVIGATION_HISTORY](state , {history}){
    state.navigationHistory.unshift(history)
    if(state.navigationHistory.length > 10){
      state.navigationHistory.splice(10)
    }
  } ,
  [RECEIVE_USERINFO] (state , {userinfo}) {
    state.userInfo = userinfo
  } ,
  [RECEIVE_USER_LEVEL] (state , {level}) {
    state.userLevel = level
  } ,
  [RECEIVE_MUSIC_CATEGORY] (state , {category}) {
    state.musicCategory = category
  } ,
  [RECEIVE_HOT_MUSIC_CATEGORY] (state , {hotCategory}) {
    state.hotMusicCategory = hotCategory
  } ,
  [RECEIVE_CURRENT_MUSIC_TAG] (state , {name}) {
    state.currentMusicTag = name
  }
}
