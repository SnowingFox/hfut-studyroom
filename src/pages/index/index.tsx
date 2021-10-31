import Nerv, { useState, useEffect } from 'nervjs'
import { View, Text, Image } from '@tarojs/components'
import Nav from '../../components/nav'
import { AssignmentStatus } from './components/assignment_status'
import { Assignment } from './components/assignment'
import { Footer } from '../../components/footer'
import logo from '../../static/logo.png'
import { getBanners } from '../../api/api'
import { BASE_URL } from '../../api/http'

export default function Index() {
  const [banner, setBanner] = useState()
  useEffect(() => {
    getBanners().then((res) => {
      setBanner(res.data.data.picture)
    })
  }, [])
  return (
    <View className='container'>
      <View className='px-4'>
        <Nav>
          <View className='flex flex-col mt-3'>
            <Image className='h-7 w-40' src={logo} mode='aspectFill' />
            <Text className='text-xl mt-2'>共享时光屋</Text>
          </View>
        </Nav>
        <View className='rounded shadow-sm'>
          {banner ? <Image
            style='width: 100%;height: 250rpx;'
            src={BASE_URL + '/' +banner}
            mode='aspectFill'
            className='card mt-2'
          /> : <></>}
          {/* <Image
            style='width: 100%;height: 250rpx;'
            src=''
            mode='aspectFit'
            className='card mt-2'
          /> */}
        </View>
        <AssignmentStatus />
        <Assignment />
        <Footer />
      </View>
    </View>
  )
}
