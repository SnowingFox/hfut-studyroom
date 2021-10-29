import Taro from "@tarojs/taro"

const BASE_URL: string = 'https://wechat.newxstudio.com'

const AuthInterceptor = (chain) => {

    const requestParams = chain.requestParams
    return chain.proceed(requestParams).then(res => {
      if (res.statusCode === 401) {
        Taro.setStorageSync("token", "")
        Taro.reLaunch({
              url: '/pages/login/login'
        })
        return Promise.reject("need authorization")
      } else if (res.statusCode === 200) {
        return res
      } else {
        Taro.showModal({
          title: "错误",
          content: "网络错误 代码：" + res.statusCode,
          showCancel: false,
          success: function () {
          }
        })
      }
    })
}

function getOption(options, method) {
    const Option = {
        url: BASE_URL + options.url,
        data: options.data,
        method: method,
        header: {
            'content-type': options.contentType,
            'Authorization': `Bearer ${Taro.getStorageSync('token')}`
        }
    }
    return Option;
}

export function get(options) {
    const option = getOption(options, "GET")
    return Taro.request(option)
}

export function post(options) {
    const option = getOption(options, "POST")
    return Taro.request(option)
}

Taro.addInterceptor(AuthInterceptor)