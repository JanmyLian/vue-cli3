/* 通过 qs 模块处理请求数据*/
import axios from 'axios'
import Qs from 'qs'
import Vue from 'vue'

// 若跨域请求需要带 cookie 身份识别
const _host = window.location.host
axios.defaults.withCredentials = true

// post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' 

// 设置请求超时
axios.defaults.timeout = 20000;

// 请求拦截器
axios.interceptors.request.use(req => {
  if (req.method === 'post') {
    // 对 post 请求数据进行处理
      req.data = Qs.stringify(req.data)
  } else if (req.method === 'get') {
    // 处理get参数
    req.paramsSerializer = params => {
      // Qs is already included in the Axios package
      return Qs.stringify(params, {
        arrayFormat: 'brackets',
        encode: false,
      })
    }
  }
  return req
}, error => {
  // 请求出错时处理
  return Promise.reject(error)
})

/**
 * get请求
 * @param {string} url
 * @param {object} params
 * @param {object} options
 */
export function get(url, params, options) {
  // 定义最后一个参数如果是函数则为回调函数
  const callback = arguments[arguments.length - 1]
  if (typeof options == 'function') {
    options = {}
  } else {
    options = options || {}
  }
  options.params = params || {}
  options.url = url
  options.method = 'get'
  return request(options, callback)
}

/**
 * post请求
 * @param {string} url
 * @param {object} params
 * @param {object} options
 */
export function post(url, params, options) {
  // 定义最后一个参数如果是函数则为回调函数
  const callback = arguments[arguments.length - 1]
  if (typeof options == 'function') {
    options = {}
  } else {
    options = options || {}
  }
  options.url = url
  options.method = 'post'
  options.params = params || {}

  if(window.TOKEN){
    const {name, value} = window.TOKEN
    if(name && value && !options.params[name]){
      options.params[name] = value
    }
  }

  axios.post(`${options.url}`,options.params)
  .then(res=>{
    if(res.data.token){
      window.TOKEN = {...res.data.token}
    }
    requestHook(res)
    callback(res.data)          
  })
  .catch(error => {
    console.info(`wendy---\nError: request.catch\nInfo: ${error.toString()}`)
    let error_text = error + '';
    let error_match = error_text.match("Network Error");
    if(error_match){
      vueDialog.open('长时间未操作，请重新刷新')
      return;
    }
    error_match = error_text.match("timeout");
    if(error_match){
      vueDialog.open('接口请求超时，多次刷新无效请联系后台开发')
      return;
    }
    // 500错误是 "Request failed with status code 500"
    // 403错误是 "Request failed with status code 403"
    error_match = error_text.match("Request failed with status code 403");
    if(error_match){
      vueDialog.open('接口403报错，post请求token失效，请刷新页面重新获取token')
      return;
    }
  })
}

/**
 * 调用axios插件发起ajax请求
 * @param {object} options     axios参数
 * @param {object} callback    回调方法，为空时，则按原axios链式方式回调处理数据
 */
export function request(options, params) {
  // 定义最后一个参数如果是函数则为回调函数
  const callback = arguments[arguments.length - 1]
  if (typeof callback != 'function') {
    return axios(options)
  }
  return axios(options)
    .then(response => {
      requestHook(response)
      callback(response.data)
    })
    .catch(error => {
      console.info(`wendy---\nError: request.catch\nInfo: ${error.toString()}`)
      let error_text = error + '';
      let error_match = error_text.match("Network Error");
      if(error_match){
				vueDialog.open('长时间未操作，请重新刷新')
				return;
      }
      error_match = error_text.match("timeout");
      if(error_match){
				vueDialog.open('接口请求超时，多次刷新无效请联系后台开发')
				return;
      }
    })
}

function requestHook(res) {
  if (res.code == 1005) {
    //无权限做跳转
    // window.location.href = '/admin/noAccess'
  } else if (res.code == 1003 || res.code == 1004) {
    //未登录
    // setTimeout(() => {
    //   login()
    // }, 1000)
  } else if (res.code == 500) {
    //网络异常
  }
  return true
}

const vueDialog = new Vue({
  methods: {
    open(content){
      this.$alert(content, '提示', {
        confirmButtonText: '确定',
        callback: action => {
          location.reload();
        }
      });
      this.$confirm(content, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        location.reload();
      }).catch(() => {
        
      });
    }
  }
})