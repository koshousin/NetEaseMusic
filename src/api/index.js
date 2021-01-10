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
  reqShowPlaylist : (cat , offset , limit=100 ) => ajax(BASE_URL + '/top/playlist' , {cat , limit , offset}) ,
  // 获取全部榜单列表（包括全球榜、云音乐榜、歌手榜）
  reqAllBoardList : () => ajax(BASE_URL + '/toplist/detail') ,
  // 获取歌单详情
  reqSongListDetail : (id) => ajax(BASE_URL + '/playlist/detail',{id}) ,
  // 获取歌单评论详情
  reqSongListComment : (id,offset=0,limit=30) => ajax(BASE_URL + '/comment/playlist/',{id,limit,offset}),
  // 发送
  reqSendComment : (t=1,type,id,content) => ajax(BASE_URL +'/comment' , {t,type,id,content}) ,
  // 回复/删除评论
  reqDelOrRepComment : (t,type,id,content,commentId) => ajax(BASE_URL +'/comment' , {t,type,id,content,commentId}),
  // 获取新歌速递
  reqNewMusic : (type) => ajax(BASE_URL + '/top/song' , {type}) ,
  // 获取音乐 url
  reqMusicUrl : (id) => ajax(BASE_URL + '/song/url' , {id}) ,
  // 获取音乐歌词
  reqSongLyric : (id) => ajax(BASE_URL + '/lyric',{id})
}
