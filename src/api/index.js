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
}
