export default {
  pages: [
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#bfbfbf',
    selectedColor: '#000000',
    backgroundColor: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './static/home.png',
        selectedIconPath: './static/home-fill.png'
      },
      {
        pagePath: 'pages/index/index',
        text: '我的',
        iconPath: './static/person.png',
        selectedIconPath: './static/person-fill.png'
      }]
  }
}
