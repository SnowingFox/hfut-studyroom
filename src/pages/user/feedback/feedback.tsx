import Nerv, { useEffect, useState } from 'nervjs'
import Taro from '@tarojs/taro'
import { View, Text, Input, Textarea, Button } from '@tarojs/components'
import { feedback } from '../../../api/api'

export default function Feedback() {
    const [msg, setMsg] = useState("")
    const [qq, setQQ] = useState("")

    const handleInput = (e, setter) => {
        setter(e.detail.value)
    }

    const handleSubmit = () => {
        let title = ""
        if (msg !== "" && qq !== "") {
            feedback(msg, qq).then((res) => {
                Taro.showModal({
                    title: "提示",
                    content: res.data.msg,
                    showCancel: false
                })
            })
            return
        } else if (msg === "") {
            title = "请输入反馈信息"
        } else {
            title = "请输入QQ"
        }
        Taro.showToast({
            title: title,
            icon: 'none',
            duration: 2000
        })
    }

    return (
        <View className='container'>
            <View className='p-4'>
                <View className='flex flex-col'>
                    <Text>反馈信息</Text>
                    <Textarea className='input flex-grow' style={{ height: '560rpx', width: 'auto' }} placeholder='请详细描述遇到的问题' onInput={e => handleInput(e, setMsg)}></Textarea>
                </View>
                <View className='mt-4'>
                    <Text>QQ号</Text>
                    <Input className='input' name='qq' placeholder='请输入QQ号' type='number' onInput={e => handleInput(e, setQQ)}></Input>
                </View>
                <View className='mt-4'>
                    <Button className='button' onClick={() => handleSubmit()}>提交</Button>
                </View>
            </View>
        </View>
    )
}