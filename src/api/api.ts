import { RequestTask } from "@tarojs/taro"
import { get } from "./http"
import { LoginProps, IRecentStatus, IStudentInfo, ITime } from "./Iapi"


interface BaseResp<T> {
    code: Number,
    msg: string,
    data?: T
}

export function login(loginProps: LoginProps): RequestTask<BaseResp<String>>{
    return get({
        url: '/login',
        data: loginProps
    })
}

export function getSeatsList(timeId, isToday) {
    let data = {
        timeId: timeId,
        isToday: isToday
    }
    return get({
        url: '/student/appointment/info',
        data: data
    })
}

export function getAssignmentStatus(): RequestTask<BaseResp<IRecentStatus[]>> {
    return get({
        url: '/student/recent'
    })
}

export function getCurrAssignmentStatus() {
    return get({
        url: '/student/current'
    })
}

export function getStudentInfo(): RequestTask<BaseResp<IStudentInfo>> {
    return get({
        url: '/student/info'
    })
}

export function getHistoryOfAssignment() {
    return {
        "code": 0,
        "msg": "成功",
        "data": {
            "n": "2",
            "data": [
                {
                    "appointmentId": "#001",
                    "learnTime": "120min",
                    "leaveTime": "2021-2-2 18:00",
                    "date": "2021-2-2"
                },
                {
                    "appointmentId": "#002",
                    "learnTime": "112min",
                    "leaveTime": "2021-2-3 21:00",
                    "date": "2021-2-3"
                }
            ]
        }
    }
}

export function pause() {
    return get({
        url: "/student/appointment/pause"
    })
}

export function back() {
    return get({
        url: "/student/appointment/back"
    })
}

export function appointment(seatId, timeId, isToday) {
    const data = {
        seatId: seatId,
        timeId: timeId,
        isToday: isToday
    }
    return get({
        url: "/student/appointment/",
        data: data
    })
}

export function getTimeList(): RequestTask<BaseResp<ITime[]>> {
    return get({
        url: "/student/appointment/available"
    })
}