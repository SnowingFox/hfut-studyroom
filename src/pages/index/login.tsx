import Nerv, { useState, useEffect } from "nervjs";
import Taro from "@tarojs/taro";
import { View, Text, Input, Button, Form } from "@tarojs/components";
import { login } from "../../api/api";
import { LoginProps } from "../../api/Iapi";

export default function Login({setIsLogged}) {
    const [token, setToken] = useState()
    useEffect(() => {
        if (token === undefined) return;
        Taro.setStorage({
            key: "token",
            data: token
        }).then(() => {
            setIsLogged(true)
        })
    }, [token, setIsLogged])
    const handleLogin = (e) => {
        login(e.detail.value as LoginProps)
            .then((res) => {
                if (res.data.data !== null) {
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
        <View className='container'>
            <View className='px-12 flex flex-col h-screen'>
                <View className='flex flex-col justify-center h-full'>
                    <View className='flex flex-col'>
                        <Text className='text-2xl'>登录</Text>
                        <Text className='text-gray-300'>绑定信息门户</Text>
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
                        <Button className='text-gray-500 text-sm px-4 py-2 w-full mt-4 rounded-full bg-blue-300'
                            formType='submit'
                        >登录</Button>
                    </Form>
                </View>

                <Text className='text-blue-400 text-center text-sm mb-8'>遇到问题</Text>
            </View>
        </View>
    )
}