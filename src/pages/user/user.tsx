import Nerv, { useState, useEffect } from 'nervjs'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtList, AtListItem } from 'taro-ui'
import { getStudentInfo } from '../../api/api'
import { IStudentInfo } from '../../api/Iapi'
import { Footer } from '../../components/footer'

const funcList = [
    {
        title: '选座记录',
        url: '/pages/user/history/history'
    },
    {
        title: '使用反馈',
        url: '/pages/user/feedback/feedback'
    },
    {
        title: '使用帮助',
        url: '/pages/user/help/help'
    },
    {
        title: '关于我们',
        url: '/pages/user/about/about'
    },

]

export default function User() {
    const initalStudentInfo: IStudentInfo = Taro.getStorageSync('studentInfo') || {
        buildId: undefined,
        id: undefined,
        major: undefined,
        name: undefined,
        sex: undefined,
        state: undefined,
        studentId: undefined,
        appointmentNumber: undefined,
        homeId: undefined
    }
    const [userData, setUserData]: [IStudentInfo, Function] = useState<IStudentInfo>(initalStudentInfo);
    useEffect(() => {
        // let info = Taro.getStorageSync("studentInfo")
        // if (!info) {
        getStudentInfo().then((resp) => {
            setUserData(resp.data.data as IStudentInfo)
            Taro.setStorage({
                key: "studentInfo",
                data: resp.data.data
            })
        })
        // } 
    }, [])
    return (
        <View className='container'>
            <View className='px-4 mt-16'>
                <View className='flex p-4 items-center'>
                    <AtAvatar size='large' openData={{ type: 'userAvatarUrl' }} />
                    <View className='flex flex-col ml-6'>
                        <Text className='font-bold text-xl'>{userData.name}</Text>
                        <Text className='text-sm text-gray-500'>{userData.studentId}</Text>
                        <Text className='text-sm text-gray-500'>{userData.major}</Text>
                    </View>
                </View>
                <View className='card flex px-4 py-2 text-center'>
                    <View className='info-item'>
                        <Text>楼号</Text>
                        <Text className='block'>{userData.buildId}</Text>
                    </View><View className='info-item'>
                        <Text>寝室号</Text>
                        <Text className='block'>{userData.homeId}</Text>
                    </View><View className='info-item'>
                        <Text>预约次数</Text>
                        <Text className='block'>{userData.appointmentNumber}</Text>
                    </View><View className='info-item'>
                        <Text>性别</Text>
                        {userData.studentId === 2020217447 ? <Text className='block'>鲨鲨</Text> :
                            <Text className='block'>{userData.sex}</Text>}
                    </View>
                </View>
                <View className='card flex p-4 mt-8'>
                    <AtList className='w-full' hasBorder={false}>
                        {funcList.map((item) => <AtListItem key={item.url} title={item.title} arrow='right' onClick={() => Taro.navigateTo({ url: item.url })} />)}
                    </AtList>
                </View>
                <Footer />
            </View>
        </View>
    )
}