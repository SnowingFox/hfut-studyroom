import Nerv, { useState, useEffect } from 'nervjs'
import Taro from '@tarojs/taro'
import { View, Text, Image, Picker, Button } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import { getAssignmentStatus } from '../../api/api' 
import { fmtDate } from '../../utils'
import Nav from '../../components/nav'
import logo from '../../static/logo.png'
import newxlogo from '../../static/newx-logo.png'

const AssignmentStatus = () => {
  return (
    <View className='card flex flex-col p-4 bg-black mt-2 text-white'>
      <View className='flex'>
        <Text className='text-sm'>#01</Text>
      </View>
      <View className='flex justify-between'>
        <View className='flex flex-col'>
          <Text>第一自习室</Text>
          <Text className='text-xs'>01 号</Text>
        </View>
        <View className='self-end'>
          <Text className='mr-2'>9月18日</Text>
          <Text>10:00 - 11:40</Text>
        </View>
      </View>
      <View className='flex justify-between mt-2'>
          {1 === 1? <Button size='mini'>暂离座位</Button> : <Button size='mini'>回到座位</Button>}
          <Button size='mini'>结束学习</Button>
        </View>  
    </View>
  )
}

export default function App() {
  const period = ["8:00 - 9:50", "10:00 - 11:40", "13:00 - 14:50", "15:00 - 17:00", "18:00 - 19:50", "20:00 - 21:50", "22:00 - 2:00"]
  const now = new Date()
  const [date, setDate] = useState(fmtDate(now))
  const [time, setTime] = useState(period[0])
  const [recentStatus, setRecentStatus] = useState()
  useEffect(() => {
    getAssignmentStatus().then((resp) => {
      
    })
  }, [])
  now.setDate(now.getDate() + 1)
  return (
    <View className='container'>
      <View className='px-4'>
        <Nav>
          <View className='flex flex-col mt-3'>
            <Image className='h-7 w-40' src={logo} mode='aspectFill' />
            <Text className='text-xl mt-2'>共享时光屋</Text>
          </View>
        </Nav>
        <Image
          style='width: 100%;height: 250rpx;background: #fff;'
          src=''
          mode='aspectFit'
          className='card mt-2'
        />
        <AssignmentStatus />
        <View className='card mt-4'>
          <View className='flex'>
            <Text className=' bg-black px-3 py-2 text-white inline text-xs rounded-tl'>
              预订座位
            </Text>
          </View>
          <View className='bg-white'>
            <View className='space-y-8'>
              <Picker mode='date' onChange={(e) => setDate(e.detail.value)} value={date} start={fmtDate(now)} end={fmtDate(now)}>
                <AtList>
                  <AtListItem iconInfo={{ size: 18, value: 'calendar', }} extraText={date} />
                </AtList>
              </Picker>
              <Picker range={period} onChange={(e) => setTime(period[e.detail.value])} value={time}>
                <AtList>
                  <AtListItem iconInfo={{ size: 18, value: 'clock', }} extraText={time} />
                </AtList>
              </Picker>
              <View className='p-4'>
                <Button className='rounded-full px-4 py-2 text-sm text-white bg-black' onClick={() => Taro.navigateTo({
                  url: "/pages/sitsSelect/sitsSelect"
                })}
                >下一步</Button>
              </View>
            </View>
          </View>
        </View>
        <View className='flex justify-center items-center'>
          <Text className='text-gray-300'>Powered by </Text>
          <Image className='h-16 w-24' src={newxlogo} mode='aspectFit' />
        </View>
      </View>
    </View>
  )
}
