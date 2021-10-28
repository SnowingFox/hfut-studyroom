import Nerv, { useState, useEffect } from "nervjs";
import Taro from "@tarojs/taro";
import { View, Text, Input, Button, Form } from "@tarojs/components";
import { login } from "../../api/api";
import { LoginProps } from "../../api/Iapi";

export default function Login() {
    const [token, setToken] = useState()
    useEffect(() => {
        if (token === undefined) return;
        Taro.setStorage({
            key: "token",
            data: token
        }).then(() => {
            Taro.switchTab({
                url: "/page/index/index"
            })
        })
    }, [token])
    const handleLogin = (e) => {
        Taro.showLoading()
        login(e.detail.value as LoginProps)
            .then((res) => {
                Taro.hideLoading()

                if (res.data.code === 0) {
                    setToken(res.data.data)
                } else {
                    Taro.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
    }
    return (
        <View className='container bg-cover' style={{backgroundImage: "url('../../static/login_bg.png')"}}>
            <View className='px-12 flex flex-col h-screen'>
                <View className='flex flex-col justify-center h-full'>
                    <View className='flex flex-col'>
                        <Text className='text-3xl font-bold'>登录</Text>
                        <Text className='font-medium'>绑定信息门户</Text>
                    </View>
                    <Form onSubmit={handleLogin}>
                        <View className='mt-8 flex flex-col justify-center'>
                            <View>
                                <Input className='input' name='studentId' placeholder='请输入学号'></Input>
                            </View>
                            <View className='mt-4'>
                                <Input className='input' name='password' password placeholder='请输入密码'></Input>
                            </View>
                        </View>
                        <Button className='text-white text-sm px-4 py-2 w-full mt-4 rounded-full' style={{backgroundColor: "#359089"}}
                          formType='submit'
                        >登录</Button>
                    </Form>
                </View>

                <Text className='text-center text-sm font-medium mb-8' style={{color: "#385FB0"}}>遇到问题</Text>
            </View>
        </View>
    )
}