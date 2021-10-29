import Nerv from 'nervjs'
import { View, Text, Image} from '@tarojs/components'
import Nav from '../../components/nav'
import { AssignmentStatus } from './components/assignment_status'
import { Assignment } from './components/assignment'
import logo from '../../static/logo.png'
import newxlogo from '../../static/newx-logo.png'

export default function Index() {
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
          <Image
            style='width: 100%;height: 250rpx;'
            src=''
            mode='aspectFit'
            className='card mt-2'
          />
        </View>
        <AssignmentStatus />
        <Assignment />
        <View className='flex justify-center items-center'>
          <Text className='text-gray-300'>Powered by </Text>
          <Image className='h-16 w-24' src={newxlogo} mode='aspectFit' />
        </View>
      </View>
    </View>
  )
}
