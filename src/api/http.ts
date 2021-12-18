import Taro from '@tarojs/taro'

export const BASE_URL: string = 'https://wechat.newxstudio.com'

const AuthInterceptor = (chain) => {
  const requestParams = chain.requestParams
  return chain.proceed(requestParams).then((res) => {
    if (res.statusCode === 401) {
      Taro.setStorageSync('token', '')
      Taro.setStorageSync('studentInfo', '')
      Taro.reLaunch({
        url: '/pages/login/login'
      })
      return Promise.reject('need authorization')
    } else if (res.statusCode === 200) {
      return res
    } else {
      Taro.showModal({
        title: '错误',
        content: '网络错误 代码：' + res.statusCode,
        showCancel: false,
        success: function() {}
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
      Authorization: `Bearer ${Taro.getStorageSync('token')}`
    }
  }
  return Option
}

export function get(options: any): Promise<any> {
  const option = getOption(options, 'GET')
  return Taro.request(option)
}

export function post(options: any): Promise<any> {
  const option = getOption(options, 'POST')

  return Taro.request(option)
}

export function uploadFile(url: string, files: any[]): Promise<any> {
  return Taro.uploadFile({
    url: BASE_URL + url,
    filePath: files[0].file.path,
    formData: {
      file: files[0]
    },
    header: {
      'content-type': 'multipart/form-data'
    },
    name: 'file'
  })
}

Taro.addInterceptor(AuthInterceptor)
