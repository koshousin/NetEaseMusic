import Vue from 'vue'
import {format} from "date-fns";
import moment from "moment";

Vue.filter('dateFormat' , function(value){
  return format(value , 'MM月dd日')
})

Vue.filter('countFormat' , function(value){
  return value/10000 > 10 ? Math.floor(value/10000)+"万" : value
})

Vue.filter('durationFormat' , function(value){
  return moment(value).format("mm:ss")
})

Vue.filter('date2Format' , function(value){
  return format(value , "MM月dd日 HH:mm")
})
