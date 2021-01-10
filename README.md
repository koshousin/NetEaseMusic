### 技术栈：Vue全家桶、html 、 less 、
### js-cookie 、better-scroll 、 swiper、moment


# day 0
#####项目开始第一天，后台服务器弄好，远程github 仓库搭建好，明天开始干活！

## day 1
* 下载 less-loader 依赖的时候版本过高会发生 TypeError 错误

## day 2
* 利用路由链接判断是否 active （主页面个性推荐区域）
* 完成了首页轮播图

---
#####未完成任务：
* 头部路由导航小按钮的active显示
* 首页轮播鼠标移开自动播放暂停的问题


## day 3
* 初始化轮播图无法滑动
    * 解决：使用 this.$nextTick 解决
* 完成了登录功能，并使用浏览器cookie 存储

---
* 未完成 :

## day 4
* 完成歌曲类型选择以及下拉的样式以及动态显示

## day 5
* ！！ 左右切换页码的功能没做

## day 7
* 完成：左右切换页码
* 未完成的是：选完页码后没有歌单界面没有立即回到顶部

## day 8
* 完成了歌单详情页面的样式以及动态获取数据以及搜索框

* 未完成:切换显示歌单详情时

## day 9
* 登陆成功后自动获取用户歌单列表放在 App.vue 里，如果放在组件里重新加载组件后不会自动获取

## day 10
* BUG :
    * 歌单详情下面的歌曲列表/评论/收藏者 高亮的显示错误  -- 已解决
    * 页码切换出错        -- 在mounted 中获取页码 dom 对象

## day 11
* BUG :
    * 页面重新刷新时播放时进度条不动


## 注意事项
    - vue的 v-for 循环只能遍历非 empty 对象，可以遍历undefined ，将empty转化为
      undefined 对象的方法
        - Array.apply(null , {length:4})
        - Array.from({length : 4})
        - [...Array(4)]

