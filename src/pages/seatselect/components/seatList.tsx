import Nerv, { useState, useEffect, useCallback } from 'nervjs'
import Taro, { useRouter } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components'
import { appointment, getSeatsList } from '../../../api/api';


const seatColors = {
    "0": "#ebecee",
    "1": "#3f85e0",
    "2": "#aa3731"
}
export function SeatList() {
    const router = useRouter()
    const [timeId, isToday] = [router.params.timeId, router.params.isToday]
    const [seatsInfo, setseatsInfo] = useState()
    const [selectedSeat, setSelectedSeat] = useState<String>()
    useEffect(() => {
        getSeatsList(timeId, isToday).then((res) => {
            if (res.data.code === 0) {
                setseatsInfo(res.data.data)
            } else {
                Taro.showModal({
                    title: '提示',
                    content: res.data.msg,
                    showCancel: false,
                    success: function () {
                        Taro.navigateBack()
                    }
                })
            }
        })
    }, [isToday, timeId])
    const handleSelectSeat = (seat) => {
        if (seat.state !== 0) return
        setSelectedSeat(seat.seatId)
    }
    const handleSubmit = () => {
        appointment(selectedSeat, timeId, isToday).then((res) => {
            if (res.data.code === 0) {
                Taro.showModal({
                    title: "提示",
                    content: "预约成功，请按时使用",
                    showCancel: false,
                    success: function () {
                        Taro.navigateBack()
                    }
                })
            } else {
                Taro.showToast({
                    title: res.data.msg,
                    duration: 2000
                })
            }
        })
    }
    return (
        seatsInfo !== undefined ?
            <View className='p-2'>
                {seatsInfo.data.map((seats) => <View className='container flex flex-col' key={seats.floorNum}>
                    <View>
                        <Text className='text-lg my-2'>第{seats.floorNum}层自习室</Text>
                    </View>
                    <View className='flex flex-wrap rounded shadow-lg p-4'>
                        {seats.data.map((seat) => <View className='flex flex-col justify-center items-center mx-5 my-2' key={seat.seatId} onClick={() => handleSelectSeat(seat)}>
                            {selectedSeat === seat.seatId ? <View className='h-6 w-6 rounded-t' style={{ backgroundColor: '#000000' }}></View> : <View className='h-6 w-6 rounded-t' style={{ backgroundColor: seatColors[seat.state] }}></View>}
                            <Text className='text-xs text-gray-400 mt-1'>{seat.num}</Text>
                        </View>)}
                    </View>
                </View>)}
                <View className='my-4 px-4'>
                    <Button className='button' onClick={handleSubmit}>确认选座</Button>
                </View>
            </View> : <></>
    )
}