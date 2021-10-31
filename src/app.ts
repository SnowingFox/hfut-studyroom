import { Component } from 'nervjs'
import Taro from '@tarojs/taro'
import 'windi.css';
import { setGlobalData } from './global'
import './app.scss'


class App extends Component {

  componentDidMount() {
    Taro.getSystemInfo({})
      .then(res => {
        setGlobalData("navBarMarginTop", res.statusBarHeight || 0)
      })
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
