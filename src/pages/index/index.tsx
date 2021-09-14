import Nerv, { useState } from 'nervjs'
import { View, Text, Image, Picker } from '@tarojs/components'
import { AtList, AtListItem, AtButton } from 'taro-ui'
import { getGlobalData } from '../../global'
import { getFormatNowDate } from '../../utils'

import './index.scss'

export default function Index() {
  const period = ["8:00 - 9:50", "10:00 - 11:40", "13:00 - 14:50", "15:00 - 17:00", "18:00 - 19:50", "20:00 - 21:50", "22:00 - 2:00"]
  const [date, setDate] = useState(getFormatNowDate())
  const [time, setTime] = useState(period[0])
  return (
    <View className='index'>
      <View className='container'>
        <View className='status-bar' style={{ marginTop: getGlobalData("navBarMarginTop") }}>
          <Text style={{ fontSize: '24px' }}>合工大自习室</Text>
          <Text style={{ color: '#bfbfbf' }}>立志改变</Text>
        </View>
        <Image
          style='width: 100%;height: 250rpx;background: #fff;'
          src=''
          mode='aspectFit'
        />
        <View className='tabs'>
          <View className='tabs-header'>
            <View className='tabs-header-item'>
              <Text>
                预订座位
              </Text>
            </View>
          </View>
          <View className='tabs-content'>
            <View className='container'>
              <Picker mode='date' onChange={(e) => setDate(e.detail.value)} value={date}>
                <AtList>
                  <AtListItem iconInfo={{ size: 18, value: 'calendar', }} extraText={date} />
                </AtList>
              </Picker>
              <Picker range={period} onChange={(e) => setTime(period[e.detail.value])} value={time}>
                <AtList>
                  <AtListItem iconInfo={{ size: 18, value: 'clock', }} extraText={time} />
                </AtList>
              </Picker>
              <View style={{ marginTop: "20rpx" }}>
                <AtButton circle type='primary'>下一步</AtButton>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
