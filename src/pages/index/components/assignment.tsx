import Nerv, { useEffect, useState, useCallback } from "nervjs"
import Taro from "@tarojs/taro"
import { View, Text, Button, Picker } from "@tarojs/components"
import { AtList, AtListItem } from "taro-ui"
import { getTimeList } from "../../../api/api"
import { ITime } from "../../../api/Iapi"
import { fmtDate } from '../../../utils'


const now = new Date()
const dates = [fmtDate(now), fmtDate(now)]
now.setDate(now.getDate() + 1)
dates[0] = fmtDate(now)

export function Assignment() {
    const [timeList, setTimeList]: [ITime[], Function] = useState([])
    const [isToday, setIsToday] = useState(1)
    const [time, setTime] = useState(0)
    useEffect(() => {
        getTimeList().then((res) => {
            if (res.data.code === 0) {
                setTimeList(res.data.data)

            }
        })
    }, [])

    const currTimeList = useCallback(() => {
        return timeList.filter((t) => Number(t.isToday) === isToday)
    }, [timeList, isToday])
    return (
        timeList.length > 0 ?
        <View className='card mt-4 p-4'>
            <Text className='text-xl'>
                预订座位
            </Text>
            <View className='bg-white'>
                <View className='space-y-8'>
                    <Picker range={dates} onChange={(e) => setIsToday(Number(e.detail.value))} value={isToday}>
                        <AtList hasBorder={false}>
                            <AtListItem iconInfo={{ size: 18, value: 'calendar', }} extraText={dates[isToday]} />
                        </AtList>
                    </Picker>
                    <Picker range={currTimeList().map((t) => `${t.startTime} - ${t.endTime}`)} onChange={(e) => setTime(e.detail.value)} value={time}>
                        <AtList>
                            <AtListItem iconInfo={{ size: 18, value: 'clock', }} extraText={`${currTimeList()[time].startTime} - ${currTimeList()[time].endTime}`} />
                        </AtList>
                    </Picker>
                    <View className='mt-4'>
                        <Button className='button' onClick={() => Taro.navigateTo({
                            url: `/pages/seatselect/seatselect?timeId=${currTimeList()[time].id}&isToday=${isToday}`
                        })}
                        >下一步</Button>
                    </View>
                </View>
            </View>
        </View>: <></>
    )
}