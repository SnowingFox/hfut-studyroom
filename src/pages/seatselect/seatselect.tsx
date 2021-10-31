import Nerv from 'nervjs'
import { View, Text } from '@tarojs/components'
import { SeatList } from './components/seatList';

const samples = [
    ["#ebebeb", "空闲"],
    ["#000000", "选中"],
    ["#3e82eb", "已被预订"],
    ["#aa3731", "暂时离开"],
    ["#ef9d50", "你的预订"],
]

export default function SeatSelect() {
    return (
        <View className='container'>
            <View className='flex justify-center p-4 bg-white'>
                {samples.map((sample) => <View className='flex items-center mx-1' key={sample[1]}>
                    <View className='h-2 w-2 mx-1 rounded-full' style={{ backgroundColor: sample[0] }}></View>
                    <Text className='text-xs'>{sample[1]}</Text>
                </View>)}
            </View>
            <SeatList />
        </View>
    )
}