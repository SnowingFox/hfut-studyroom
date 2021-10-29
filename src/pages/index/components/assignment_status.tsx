import Nerv, { useEffect, useState } from 'nervjs'
import { View, Text, Button } from '@tarojs/components'
import { pause, back, getCurrAssignmentStatus } from '../../../api/api'
import { IRecentStatus } from '../../../api/Iapi'

export function AssignmentStatus() {
    const [currStatus, setRecentStatus]: [IRecentStatus, Function] = useState<IRecentStatus>()
    const [show, setShow] = useState(false)
    const updateStatus = () => {
        getCurrAssignmentStatus().then((res) => {
            if (res.data.code === 0 && res.data.data.length > 0) {
                setRecentStatus(res.data.data[0])
                setShow(true)
            } else {
                Taro.showToast({
                    title: res.data.msg,
                    duration: 2000
                })
            }
        })
            .catch((e) => {
                console.log(e)
            })
    }
    useEffect(() => {
        updateStatus()
    }, [])

    const handleSeat = (type: 1 | 2) => {
        let call = type === 2 ? pause : back
        call().then((res) => {
            if (res.data.code === 0) {
                updateStatus()
                Taro.showToast({
                    title: "已" + (type === 2 ? "暂离" : "回到") + "座位",
                    duration: 2000
                })
            } else {
                Taro.showToast({
                    title: res.data.msg,
                    duration: 2000
                })
            }
        })
    }
    return (show ?
        <View className='card flex flex-col p-4 bg-black mt-2 text-white'>
            <View className='flex'>
                <Text className='text-sm'>预约ID：{currStatus.appointmentId}</Text>
            </View>
            <View className='flex justify-between'>
                <View className='flex flex-col'>
                    <Text>{currStatus.buildId}</Text>
                    <Text className='text-xs'>{currStatus.seatId} 号</Text>
                </View>
                <View className='self-end'>
                    <Text className='mr-2'>{currStatus.startTime} - {currStatus.endTime}</Text>
                </View>
            </View>
            <View className='flex justify-between mt-2'>
                {currStatus.state === 0 ? <Button size='mini' onClick={() => handleSeat(2)}>暂离座位</Button> : <Button size='mini' onClick={() => handleSeat(1)}>回到座位</Button>}
                <Button size='mini'>结束学习</Button>
            </View>
        </View> : <></>
    )
}