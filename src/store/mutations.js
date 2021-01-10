
/**/
import Vue from 'vue'
import {
  RECEIVE_BANNERS,
  RECEIVE_NAVIGATION_HISTORY,
  RECEIVE_USERINFO,
  RECEIVE_USER_LEVEL,
  RECEIVE_MUSIC_CATEGORY,
  RECEIVE_HOT_MUSIC_CATEGORY,
  RECEIVE_CURRENT_MUSIC_TAG,
  RESET_USERINFO,
  RECEIVE_USER_PLAYLIST,
  RECEIVE_SHOW_PLAYLIST,
  RECEIVE_ALL_BOARD_LIST,
  RECEIVE_SONG_LIST_DETAIL ,
  RECEIVE_SONG_LIST_COMMENT ,
  RESET_SOMETHING ,
  RECEIVE_SEND_COMMENT ,
  RECEIVE_NEW_MUSIC ,
  RECEIVE_MUSIC_URL ,
  RECEIVE_MUSIC_PLAY_LIST ,
  RECEIVE_SONG_LYRIC
} from './mutation-types'
import pl from "element-ui/src/locale/lang/pl";

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
  } ,
  [RESET_USERINFO] (state){
    state.userInfo = {}
    state.userPlaylist = []
  } ,
  [RECEIVE_USER_PLAYLIST] (state , {playlist}) {
    state.userPlaylist = playlist
  } ,
  [RECEIVE_SHOW_PLAYLIST] (state , {playlist}) {
    state.showPlaylist = playlist
  } ,
  [RECEIVE_ALL_BOARD_LIST] (state , {allBoardList}) {
    state.allBoardList = allBoardList
  } ,
  [RECEIVE_SONG_LIST_DETAIL](state , {playlist}) {
    state.songListDetail = playlist
  } ,
  [RECEIVE_SONG_LIST_COMMENT] (state , {songListComment}) {
    state.songListComment = songListComment
  } ,
  [RESET_SOMETHING](state , deleteItem){
    state[deleteItem] = null
  } ,
  [RECEIVE_SEND_COMMENT](state , {comment}) {
    // console.log(comment , Date.now())
    state.songListComment.comments.unshift(comment)
  } ,
  [RECEIVE_NEW_MUSIC](state , {music}) {
    state.newMusic = music
  } ,
  [RECEIVE_MUSIC_URL](state , {musicUrl}) {
    console.log("mutation...")
    state.musicUrlInfo = musicUrl
  } ,
  [RECEIVE_MUSIC_PLAY_LIST] (state ){
    state.musicPlayList = state.songListDetail.tracks.filter( item => item['fee'] !== 4)
  } ,
  [RECEIVE_SONG_LYRIC](state , songLyric){
    state.songLyric = songLyric
  }
}
