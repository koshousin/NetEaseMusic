/*  这是一个封装请求的模块 */
import axios from 'axios'

export default function ajax(url , data={} , type='GET'){
  return new Promise( (resolve , reject) => {
    let promise
    if(type === 'GET'){
      let str = '?'
      Object.keys(data).forEach( item => {
        str += `${item}=${data[item]}&`
      })
      str = str.slice(0 , -1);
      (str.length > 1) && (url += str)
      console.log(url)
      promise =  axios.get(url)
    } else {
      promise = axios.post(url,data)
    }
    promise.then(
      value => resolve(value.data)
    ).catch(error => console.log(error))
  })
}

