import Nerv, {useState} from 'nervjs'
import { View, Text, Button } from '@tarojs/components'
import { getSeatsList } from '../../api/api';


export default function SitsSelect() {
    const samples = [
        ["#ebebeb", "空闲"],
        ["#000000", "选中"],
        ["#3e82eb", "已被预订"],
        ["#aa3731", "暂时离开"],
    ]
    const seatsList = getSeatsList().data.data;
    const seatColors = {
        "0": "#ebecee",
        "1": "#3f85e0",
        "2": "#aa3731"
    }
    const [selectedSeat, setSelectedSeat] = useState<String>()
    const handleSelectSeat = (seat) => {
        if (seat.state !== "0") return
        setSelectedSeat(seat.seatId)
    }
    return (
        <View className='container'>
            <View className='flex justify-center'>
                {samples.map((sample) => <View className='flex items-center mx-2' key={sample[1]}>
                    <View className='h-2 w-2 mx-1 rounded-full' style={{ backgroundColor: sample[0] }}></View>
                    <Text className='text-xs'>{sample[1]}</Text>
                </View>)}
            </View>
            <View className='p-2'>
                {seatsList.map((seats) => <View className='container flex flex-col' key={seats.floorNum}>
                    <View>
                        <Text className='text-lg my-2'>{seats.floorNum}</Text>
                    </View>
                    <View className='flex flex-wrap rounded shadow-lg p-4'>
                        {seats.data.map((seat) => <View className='flex flex-col justify-center items-center mx-5 my-2' key={seat.seatId} onClick={() => handleSelectSeat(seat)}>                            
                            {selectedSeat === seat.seatId ? <View className='h-6 w-6 rounded-t' style={{ backgroundColor: '#000000' }}></View>:<View className='h-6 w-6 rounded-t' style={{ backgroundColor: seatColors[seat.state] }}></View>}
                            <Text className='text-xs text-gray-400 mt-1'>{seat.num}</Text>
                        </View>)}
                    </View>
                </View>)}
                <View className='my-4'>
                    <Button className='px-4 py-2 rounded-full bg-blue-500 text-white text-xs'>确认选座</Button>
                </View>
            </View>
        </View>
    )
}