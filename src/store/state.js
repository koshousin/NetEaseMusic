
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
}
