/* 向后台获取数据的函数 */
import ajax from "./ajax";

const BASE_URL = '/api'

export default {
  // 获取轮播图
  reqBanners : () => ajax(BASE_URL + '/banner') ,
  // 使用手机号密码登录
  reqLogin : (phone , password) => ajax(BASE_URL + '/login/cellphone' , {phone , password} , "POST") ,
  // 获取用户等级
  reqUserLevel : () => ajax(BASE_URL + '/user/level') ,
  // 获取音乐种类
  reqMusicCategory : () => ajax(BASE_URL + '/playlist/catlist') ,
  // 获取热门歌曲分类
  reqHotMusicCategory : () => ajax(BASE_URL + '/playlist/hot') ,
  // 退出登录
  reqLogout  : () => ajax(BASE_URL + '/logout') ,
  // 获取用户的歌单名称（创建的以及收藏的）
  reqUserPlayList : (uid) => ajax(BASE_URL + '/user/playlist',{uid}) ,
  // 获取显示的歌单
  reqShowPlaylist : (cat , offset , limit=100 ) => ajax(BASE_URL + '/top/playlist' , {cat , limit , offset})
}
