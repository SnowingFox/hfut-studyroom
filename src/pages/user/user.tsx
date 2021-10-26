import Nerv, { useState, useEffect } from 'nervjs'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtList, AtListItem } from 'taro-ui'
import { getStudentInfo } from '../../api/api'
import { IStudentInfo } from '../../api/Iapi'

export default function User() {
    const initalStudentInfo: IStudentInfo = Taro.getStorageSync('studentInfo') || {
        buildId: undefined,
        id: undefined,
        major: undefined,
        name: undefined,
        sex: undefined,
        state: undefined,
        studentId: undefined
    }
    const [userData, setUserData] = useState<IStudentInfo>(initalStudentInfo);
    useEffect(() => {
        let info = Taro.getStorageSync("studentInfo")
        if (!info) {
            getStudentInfo().then((resp) => {
                setUserData(resp.data.data as IStudentInfo)
                Taro.setStorage({
                    key: "studentInfo",
                    data: resp.data.data
                })
            }) 
        } 
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
                    <View className='px-4 py-2'>
                        <Text>楼号</Text>
                        <Text className='block'>{userData.buildId}</Text>
                    </View><View className='px-4 py-2'>
                        <Text>寝室号</Text>
                        <Text className='block'></Text>
                    </View><View className='px-4 py-2'>
                        <Text>预约次数</Text>
                        <Text className='block'></Text>
                    </View><View className='px-4 py-2'>
                        <Text>性别</Text>
                        <Text className='block'>{userData.sex}</Text>
                    </View>
                </View>
                <View className='card flex p-4 mt-8'>
                    <AtList className='w-full'>
                        <AtListItem title='选座记录' arrow='right' onClick={() => Taro.navigateTo({ url: "/pages/history/history" })} />
                        <AtListItem title='使用反馈' arrow='right' onClick={this.handleClick} />
                        <AtListItem title='使用帮助' arrow='right' onClick={this.handleClick} />
                        <AtListItem title='关于我们' arrow='right' onClick={this.handleClick} />
                    </AtList>
                </View>
            </View>
        </View>
    )
}