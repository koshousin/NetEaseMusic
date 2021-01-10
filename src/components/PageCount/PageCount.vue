<template>
  <!-- 底部页码组件  -->
  <div class="music-page" @click.stop="changePage">
    <span data-symbol="-1" class="iconfont icon-houtuishangyige" ></span>
    <span v-for="(item,index) in pageArr " :key="index" :class="currentPage === item && 'active' ">{{item}}</span>
    <span data-symbol="1" class="iconfont icon-qianjin"></span>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "PageCount" ,
    props : ['pageCount'],
    data (){
      return {
        currentPage : 0 ,
        pageArr : []
      }
    } ,
    computed : {
      ...mapState(['currentMusicTag']) ,

    } ,
    methods : {
      /* 改变页码 */
      changePage(e) {
        // 如果还是当前页则不继续执行
        if(e.target.innerText*1 === this.currentPage){
          return
        }
        let flag = e.target.dataset.symbol ? e.target.dataset.symbol*1 : 0;
        // 如果是第一页且上一页或者是三点符时的动作则直接停止执行
        if(!(this.currentPage-1) && !(flag + 1) || (this.currentPage===this.pageCount) && !(flag-1) || e.target.innerText === '...' ){
          console.log("stop...")
          return
        }
        this.firstPageActive = false
        // 切换页码
        if(e.target.innerText && e.target.nodeName === 'SPAN'){
          this.currentPage = e.target.innerText * 1
          this.currentTarget = e.target
        }
        // 上一页/下一页切换
        this.currentPage += flag
        if(this.currentPage <= 0){
          this.currentPage = 1
        }
        // 发送获取歌单请求
        // 为防止用户多次点击，使用函数节流
        if(!this.timer){
          this.timer = setTimeout( () => {
            this.$emit('handle_pagecount_click' , this.currentPage)
            clearTimeout(this.timer)
            this.timer = 0
          } , 1000)
        }
      } ,
    } ,
    beforeMount () {
      this.currentPage = 1
    } ,
    mounted() {
      // this.pageNumArr = Array.from(document.getElementsByClassName("music-page")[0].children).slice(1,-1)
      // console.log("mounted()..." ,this.pageNumArr)
      this.currentTarget = Array.from(document.querySelector('.music-page').children)[1]
      // console.log("first span :" , this.currentTarget)
    } ,
    watch : {
      // 当选择的标签名改变时上一次的高亮，并默认将第一个页码高亮
      currentMusicTag(){
        this.firstPageActive = true
        if(this.currentPage-1) {
          // this.pageNumArr[this.currentPage - 1].className = ''
        }
      } ,
      currentPage (currentPage , previousPage) {
        // 根据当前点击的按钮动态生成按钮
        // console.log("pageCount:" , this.pageCount , "currentPage:" , currentPage)
        let tempArr = []
        if(this.pageCount > 10){
          if(currentPage === 1 || (currentPage<6 && currentPage + 4 < this.pageCount)){
            // 初始化这个数组 并且 第一种情况下
            for(let i=0;i < this.pageCount-1; i++){
              if(i === 8){
                tempArr.push('...')
                continue
              }else if(i === 9) {
                tempArr.push(this.pageCount)
                break
              } else {
                tempArr.push(i + 1)
              }
            }
          } else if(currentPage > 5 && currentPage + 4 < this.pageCount) {    // 第二种情况
            const arr1 = [currentPage-3 , currentPage-2 , currentPage-1 , currentPage ,
                          currentPage+1 , currentPage+2 , currentPage+3]
            tempArr  = [1,'...', ...arr1 , '...' , this.pageCount]
          } else if(currentPage > 5 && currentPage + 4 >= this.pageCount){                  // 第三种情况
            const arr1 = [this.pageCount-7,this.pageCount-6 , this.pageCount-5 , this.pageCount-4 , this.pageCount-3,
              this.pageCount-2 , this.pageCount-1 , this.pageCount]
            tempArr = [1,'...' ,...arr1 ]
          }
        } else {    // 小于或等于10页的情况下
          for(let i=0; i<this.pageCount; i++){
            tempArr.push(i+1)
          }
        }
        // console.log("computed:" , tempArr)
        this.pageArr = tempArr
      }
    }
  }
</script>

<style lang="less" scoped>
  // 歌曲页码样式
  .music-page {
    display : flex;
    margin-top : 20px;
    justify-content : center;
    span {
      line-height: 30px;
      width : 30px;
      text-align : center;
      margin : 0 3px;
      border : 1px solid rgb(230,230,230);
      border-radius : 5px;
      color : rgb(103,103,103);
      &:hover {
        cursor : pointer;
        background-color : rgb(253,245,245);
      }
    }
    .iconfont {
      color : rgb(203,203,203);
    }
    .active {
      color : #fff;
      background-color :rgb(236,65,65);
      &:hover {
        cursor: auto;
        background-color : rgb(236,65,65);
      }
    }
  }
</style>
