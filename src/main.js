// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {Button , Dialog} from 'element-ui'
import App from './App'
import router from './router'
import store from './store'


Vue.use(Button)
Vue.use(Dialog)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  /* eslint-disable-next-line */
  render : h => h(App) ,
  store
})
