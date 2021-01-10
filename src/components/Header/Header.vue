<template>
  <!-- 客户端头部 -->
  <div class="header">
    <!-- 头部左边 -->
    <div class="header-left">
      <span class="iconfont logo icon-wangyiyunyinle"></span>
      <span class="app-name">黄山云音乐</span>
      <div class="header-control">
        <span class="iconfont direction houtui icon-houtuishangyige"
              @click="switchPage(true)"
              :class="navigationHistory.length && 'd-active' "></span>
        <span class="iconfont direction qianjin icon-qianjin"
              @click="switchPage(false)"
              :class="navigationHistory.length > 1 && navigationHistory.indexOf(this.$route.path)===0 && 'd-active' "></span>
        <span class="iconfont sousuo icon-sousuo"></span>
        <input type="text" placeholder="搜索">
        <span class="iconfont tinggeshiqu icon-tinggeshiqu40x40"></span>
      </div>
    </div>
    <!-- 头部右边 -->
    <div class="header-right">
      <div class="header-userinfo">
                    <span class="h-s">
                        <img :src="userInfo.avatarUrl || '../../assets/cat.jpg' " alt="" class="icon-img">
                    </span>
        <span class="username h-s" @click="showDownList">{{userInfo.nickname || '未登录' }}</span>
        <span class="h-s">开通VIP</span>
      </div>
      <!-- 个人信息弹窗信息 -->
      <div class="pop-up-container" v-show="isShow">
        <div class="login-container" v-if="!userInfo.nickname">
          <div class="back-img">
          </div>
          <form action="" class="login-form">
            <div class="login-item input-place">
              <div class="phone-input">
                <i class="iconfont icon-shouji"></i> <i>+86</i>
                <input v-model="phone" placeholder="请输入手机号" type="phone">
              </div>
              <div class="password-input">
                <i class="iconfont icon-suo"></i>
                <input v-model="password" type="password" placeholder="请输入密码">
                <i>重设密码</i>
              </div>
            </div>
            <div class="login-item">
              <input type="checkbox">自动登录
            </div>
            <div class="login-btn btn login-item" @click="login">登录</div>
            <div class="rgister-btn btn  login-item">注册</div>
            <div class="login-item others">
              <i class="iconfont icon-weixin1"></i>
              <i class="iconfont icon-qq1"></i>
              <i class="iconfont icon-weibo2"></i>
              <i class="iconfont icon-wangyi"></i>
            </div>
          </form>
        </div>
        <div class="pop-up-info" v-else>
          <div class="pop-item " id="p-top">
            <div class="little-info">
              <span class="number">6</span>
              <span class="desc">动态</span>
            </div>
            <div class="little-info">
              <span class="number">{{userInfo['follows']}}</span>
              <span class="desc">关注</span>
            </div>
            <div class="little-info">
              <span class="number">{{userInfo['followeds']}}</span>
              <span class="desc">粉丝</span>
            </div>
          </div>
          <div class="pop-item underline">
            <span class="singin">签到</span>
          </div>
          <div class="pop-item p-arrow">
            <span class="iconfont icon-huiyuan"></span>
            <span class="show-detail p-vip" desc="未订购">会员中心</span>
            <span class="iconfont icon-qianjin"></span>
          </div>
          <div class="pop-item p-arrow">
            <span class="iconfont icon-level-2-copy"></span>
            <span class="show-detail p-rank">等级</span>
            <span :rank="userLevel" class="iconfont icon-Lv"></span>
            <span class="iconfont icon-qianjin"></span>
          </div>
          <div class="pop-item p-arrow underline">
            <span class="iconfont icon-Shapecopy"></span>
            <span class="show-detail">商城</span>
            <span class="iconfont icon-qianjin"></span>
          </div>
          <div class="pop-item p-arrow">
            <span class="iconfont icon-gerenxinxi"></span>
            <span class="show-detail">个人信息设置</span>
            <span class="iconfont icon-qianjin"></span>
          </div>
          <div class="pop-item p-arrow underline">
            <span class="iconfont bind icon-bangding1"></span>
            <span class="show-detail">绑定社交账号</span>
            <span class="iconfont icon-weibo"></span>
            <span class="iconfont icon-qianjin"></span>
          </div>
          <div class="pop-item p-arrow">
            <span class="iconfont icon-guanji" ></span>
            <span class="show-detail" @click="logout">退出登录</span>
          </div>
        </div>
      </div>
      <!-- ，，，，， -->
      <span class="iconfont h-s icon-shezhi"></span>
      <span class="iconfont h-s icon-yifu"></span>
      <span class="iconfont h-s mail icon-icon"></span>
    </div>
  </div>
</template>

<script>
  import {mapState , mapActions} from 'vuex'
  export default {
    name: "Header" ,
    data(){
      return {
        phone : '' ,
        password : '' ,
        isShow : false
      }
    } ,
    beforeMount() {
      this.getUserLevel()
    } ,
    computed : {
      ...mapState(['navigationHistory','userInfo','userLevel'])
    } ,
    methods : {
      ...mapActions(['getLogin' , 'getUserLevel','getLogout']) ,
      switchPage(isBack){
        if(isBack){
          this.$router.back()
        }else {
          this.$router.forward()
        }
      } ,
      showDownList (){
        this.isShow = !this.isShow
      } ,
      login(){
        let {phone , password} = this;
        // debugger
        this.getLogin({phone : +phone, password})
      } ,
      logout(){
        this.getLogout()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../static/css/common";
  .header{
    width : 100%;
    position: fixed;
    z-index : 9999;
    box-sizing: border-box;
    height : 75px;
    background-color : rgb(236,65,65);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding : 0 33px;
    color :rgb(249,216,216);
    .iconfont {
      font-size : 20px;
    }
    .header-left{
      display: flex;
      align-items: center;
      width: 600px;
      position : relative;
      .logo {
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 50%;
        font-size : 20px;
        text-align: center;
        background-color: #fff;
        color : rgb(236,65,65);
      }
      .app-name {
        margin-left: 10px;
        font-size : 25px;
        letter-spacing: 3px;
        color : #fff;
        flex-grow: 1;
      }
      .header-control {
        display: flex;
        align-items: center;
        position: relative;
        .iconfont {
          margin : 0 5px;
        }
        .active {
          color : rgb(242,186,186);
          background-color: rgb(217,59,59);
        }
        .direction {
          line-height: 30px;
          width: 30px;
          height: 30px;
          background-color: rgb(230,63,63);
          border-radius: 50%;
          text-align: center;
          color :rgb(237,100,100);
          &:hover {
            cursor : pointer;
          }
        }
        .d-active{
          color:rgb(242,185,185) ;
          background-color: rgb(217,59,59);
        }
        .qianjin {
          font-size : 26px;
        }
        .sousuo {
          position: absolute;
          left : 85px;
          color : #eee;
          &:hover {
            color : rgb(249,216,216);
          }
        }
        input {
          outline: none;
          font-size : 16px;
          border : none;
          padding : 10px;
          color : #fff;
          padding-left: 35px;
          border-radius : 20px;
          background-color: rgb(225,62,62);
        }
        .tinggeshiqu {
          width : 38px;
          height : 38px;
          line-height: 38px;
          background-color: rgb(225,62,62);
          text-align : center;
          border-radius : 50%;
        }
      }
    }
    .header-right {
      width: 520px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      .header-userinfo{
        display: flex;
        align-items: center;
        font-size : 15px;
        flex-grow: 1;
        .username {
          position: relative;
          &::after {
            position: absolute;
            top : 5px;
            right : -15px;
            content : '';
            display: block;
            width : 0;
            height : 0;
            border : 5px solid transparent;
            border-top-color : rgb(248,186,186);
          }
        }
        .icon-img {
          width : 35px;
          height : 35px;
          border-radius : 50%;
        }
        &:hover ~div{
          display: block;
        }
      }
      // 头部右侧文字样式
      .h-s {
        flex-grow: 1;
        text-align : right;
        transition : color .3s;
        &:hover {
          color : #fff;
          cursor: pointer;
        }
      }
      .mail {
        font-size : 25px;
      }
      // 个人信息下拉弹窗
      .pop-up-container {
        position: absolute;
        // display: none;
        top:75px;
        z-index: 99;
        background-color: #fff;
        width: 350px;
        height : 475px;
        border-radius : 0 0 10px 10px;
        box-sizing: border-box;
        box-shadow: 0 0 2px  rgb(0,0,0,.5);
        .pop-up-info {
          height : 100%;
          width : 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          #p-top {
            display: flex;
            padding : 0 50px;
            justify-content: space-between;
            .little-info {
              display: flex;
              flex-direction : column;
              align-items: center;
              justify-content: space-between;
              height : 42px;
              .number {
                color : #000;
                font-size : 20px;
                font-weight : bold;
              }
              .desc {

                font-size : 15px;
                color : rgb(51,51,51)
              }
            }
          }
          .pop-item {
            flex-grow : 1;
            padding : 0 20px;
            display: flex;
            align-items: center;
            color :  rgb(51,51,51);
            .singin{
              display: block;
              margin : auto;
              width : 100px;
              height: 40px;
              line-height : 40px;
              text-align : center;
              border-radius : 20px;
              border : 1px solid rgb(219,219,220);
            }
            .iconfont {
              color : rgb(51,51,51);
            }
            .show-detail {
              flex-grow:1;
              margin-left : 10px;
            }
            .p-vip::after {
              content: attr(desc);
              float : right ;
              color : rgb(204,204,204);
              font-size : 14px;
            }
            .icon-Lv{
              font-size : 15px;
              width : 25px;
              &::after {
                content:attr(rank);
                float : right;
                font-size : 15px;
              }
            }
          }
          .underline {
            border-bottom: 1px solid #eee;
          }
          .p-arrow:hover {
            background-color: #eee;
          }
        }
        // 登陆弹窗
        .login-container  {
          height : 100%;
          .back-img {
            height : 30%;
            box-sizing : border-box;
            background-image : url(../../assets/platform.png);
            background-repeat: no-repeat;
            background-position : 50% 50%;
          }
          .login-form {
            margin : 5px auto;
            width : 290px;
            height : 300px;
            display : flex;
            margin : auto ;
            flex-direction : column;
            align-items : center;
            justify-content: space-between;
            .login-item {
              width : 100%;
              input {
                outline : none;
                border : none;
              }
            }
            .btn {
              line-height : 50px;
              text-align: center;
              &:hover {
                cursor : pointer;
              }
            }
            .login-btn {
              background-color : @mainColor;
              border-radius : 5px;
              color : #fff;
              &:hover {
                background-color : rgb(205 38 38);
              }
            }
            .register-btn {
              text-decoration: underline;
            }
            .input-place {
              height : 80px;
              border : 1px solid rgb(216,216,216);
              border-radius : 5px;
              font-size : 11px;
              box-sizing: border-box;
              .phone-input {
                display : flex;
                justify-content: space-evenly;
                input {
                  box-sizing: border-box;
                  margin-left : 5px;
                  padding : 0 15px;
                  border-left : 1px solid rgb(216,216,216);
                }
              }
              div{
                height : 40px;
                padding : 0 20px;
                line-height: 40px;
              }
              .password-input {
                border-top : 1px solid  rgb(216,216,216);
              }
            }
            .others {
              display : flex;
              justify-content : space-evenly;
              .iconfont {
                font-size : 18px;
                width : 30px;
                height : 30px;
                border-radius : 50%;
                text-align : center ;
                line-height : 30px;
                border : 1px solid rgb(204,204,204);
                &:hover {
                  cursor : pointer;
                }
              }
              .icon-weixin1 {
                color : rgb(141,200,27);
                &:hover {
                  color : #fff;
                  background-color : rgb(141,200,27);
                }
              }
              .icon-weibo2 {
                color : rgb(216,30,6);
                &:hover {
                  color : #fff;
                  background-color :  rgb(216,30,6);
                }
              }
              .icon-qq1 {
                color :rgb(18,150,219);
                &:hover {
                  color : #fff;
                  background-color :rgb(18,150,219);
                }
              }
              .icon-wangyi {
                color : rgb(246,45,51);
                &:hover {
                  color : #fff;
                  background-color : rgb(246,45,51);
                }
              }
            }
          }
        }

      }
    }
  }
</style>
