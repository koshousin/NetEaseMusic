
/* 管理应用状态 */
export default {
  banners : [] ,      // 存储首页轮播图
  navigationHistory : [] ,  // 浏览历史 ,
  userInfo : {} ,           // 用户信息
  userLevel : 0 ,           // 用户等级
  musicCategory : []  ,     // 音乐种类
  hotMusicCategory : []  ,    // 热门歌曲的分类
  currentMusicTag : '全部歌单'   ,    // 当前选中的音乐标签
  userPlaylist : [],          // 用户的歌单名称（创建的以及收藏的）
  showPlaylist : [] ,         // 歌单区域应该展示的歌单
  allBoardList : {} ,         // 全部榜单列表
  songListDetail : {} ,       // 歌单详情数据
  songListComment : {} ,      // 歌单评论数据 {topComments:[] , hotComments:[] , comments : []}
  newMusic : [] ,             // 新歌速递
  musicUrlInfo : {}  ,        // 接收音乐 url 等信息
  musicPlayList : []  ,       // 音乐播放列表
  songLyric : []              // 歌词
}
