import Nerv, { useState } from 'nervjs'
import Taro from '@tarojs/taro'
import App from './app'
import Login from './login'

const hasLogged = !!Taro.getStorageSync("token")

export default function Index() {
 const [isLogged, setIsLogged] = useState(hasLogged)

 return isLogged ? <App />: <Login setIsLogged={setIsLogged} />
}