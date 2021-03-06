import Nerv, { useState, useEffect } from 'nervjs'
// @ts-ignore
import Taro, { useRouter } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { appointment, getSeatsList } from '../../../api/api'

const seatColors = {
  '0': '#ebecee',
  '1': '#3f85e0',
  '2': '#aa3731',
  '3': '#ef9d50'
}

export const enum SEAT_STATE {
  free = 0,
  covered = 1,
  briefLeave = 2,
  owned = 3
}

export function SeatList() {
  const router = useRouter()
  const [timeId, appointmentDate] = [router.params.timeId, router.params.appointmentDate]
  const [seatsInfo, setseatsInfo] = useState()
  const [selectedSeat, setSelectedSeat] = useState<String>()
  useEffect(() => {
    getSeatsList(timeId, appointmentDate).then((res) => {
      if (res.data.code === 0) {
        let data = res.data.data.data
        data.forEach((d) => {
          let cols = []
          for (let i = 1; i <= d.cols; i++) {
            cols.push(d.data.filter((seat) => seat.col === i))
          }
          d.data = cols
        })
        setseatsInfo(data)
        // setseatsInfo(res.data.data)
      } else {
        Taro.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          success: function() {
            Taro.navigateBack()
          }
        })
      }
    })
  }, [appointmentDate, timeId])

  const handleSelectSeat = (seat) => {
    if (seat.state === SEAT_STATE.free) {
      setSelectedSeat(seat.seatId)
    } else if (seat.state === SEAT_STATE.covered) {
      Taro.showModal({
        title: '座位举报',
        content: '是否对该位置发起举报？',
        success: function(res) {
          if (res.confirm) {
            Taro.navigateTo({
              url: `seat-report/seat-report?id=${seat.seatId}`
            })
          }
        }
      })
    }
  }

  const handleSubmit = () => {
    if (selectedSeat === undefined) {
      Taro.showModal({
        title: '提示',
        content: '未选中座位',
        showCancel: false
      })
      return
    }

    appointment(selectedSeat, timeId, appointmentDate).then((res) => {
      if (res.data.code === 0) {
        Taro.showModal({
          title: '提示',
          content: '预约成功，请按时使用',
          showCancel: false,
          success: function() {
            Taro.navigateBack()
          }
        })
      } else {
        Taro.showToast({
          title: res.data.msg,
          duration: 2000,
          icon: 'none'
        })
      }
    })
  }

  return seatsInfo !== undefined ? (
    <View className="p-2">
      {seatsInfo.map((layer) => (
        <View className="container flex flex-col mt-4" key={layer.floorNum}>
          <View>
            <Text className="text-lg my-2">第{layer.floorNum}层自习室</Text>
          </View>
          <View className="flex flex-wrap rounded shadow-lg p-4">
            {layer.data.map((col) => (
              <View
                className="flex flex-col"
                style={{ width: `${100 / layer.data.length}%` }}
                key={col[0].seatId}
              >
                {col.map((seat) => (
                  <View
                    className="flex flex-col justify-center items-center mx-5 my-2"
                    key={seat.seatId}
                    onClick={() => handleSelectSeat(seat)}
                  >
                    {selectedSeat === seat.seatId ? (
                      <View
                        className="h-6 w-6 rounded-t"
                        style={{ backgroundColor: '#000000' }}
                      ></View>
                    ) : (
                      <View
                        className="h-6 w-6 rounded-t"
                        style={{ backgroundColor: seatColors[seat.state] }}
                      ></View>
                    )}
                    <Text className="text-xs text-gray-400 mt-1">{seat.num}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      ))}
      <View className="my-4 px-4">
        <Button className="button" onClick={handleSubmit}>
          确认选座
        </Button>
      </View>
    </View>
  ) : (
    <></>
  )
}
