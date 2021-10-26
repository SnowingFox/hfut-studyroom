import Taro from "@tarojs/taro"

const BASE_URL: string = 'https://wechat.newxstudio.com'


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