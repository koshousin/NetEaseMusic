
/*
*    计算属性
* */
export default {
  songList : (state) => songKeyword => {
    // console.log("getters , keyword :" , songKeyword)
    // 动态获取要展示的歌曲列表
    let {tracks} = state.songListDetail
    if(songKeyword.trim().length > 0){
      return tracks.filter(item => {
        let name = item.name
        let artist = item.ar[0].name
        let album = item.al.name
        let desc = item.alia[0] ? item.alia[0] : ''
        return name.includes(songKeyword) || artist.includes(songKeyword) || album.includes(songKeyword) || desc.includes(songKeyword)
      })
    }
    return tracks
  }
}
