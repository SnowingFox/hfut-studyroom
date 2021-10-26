import Nerv from 'nervjs'
import { View, Text } from "@tarojs/components";
import { getHistoryOfAssignment } from '../../api/api';

export default function History() {
    const resp = getHistoryOfAssignment();
    return (
        <View className='container'>
            <View className='p-4'>
                {resp.data.data.map((item) => <View key={item.appointmentId} className='card p-4 flex flex-col mb-2 text-sm'>
                    <View className='flex justify-between'>
                        <Text className='text-base'>{item.date}</Text>
                        <Text>{item.appointmentId}</Text>
                    </View>
                    <View className='flex justify-between'>
                        <Text>学习时间</Text>
                        <Text>{item.learnTime}</Text>
                    </View>
                    <View className='flex justify-between'>
                        <Text>离开时间</Text>
                        <Text>{item.leaveTime}</Text>
                    </View>
                </View>)}
            </View>
        </View>
    )
}