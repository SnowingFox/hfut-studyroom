import { RequestTask } from "@tarojs/taro"
import { get } from "./http"
import { LoginProps, IRecentStatus, IStudentInfo } from "./Iapi"


interface BaseResp<T> {
    code: Number,
    msg: string,
    data: T
}

export function login(loginProps: LoginProps): RequestTask<BaseResp<String>>{
    return get({
        url: '/login',
        data: loginProps
    })
}

export function getSeatsList() {
    return {
        "code": 0,
        "data": {
            "buildNum": 0,
            "data": [
                {
                    "cols": 0,
                    "data": [
                        {
                            "col": 0,
                            "num": 0,
                            "row": 0,
                            "seatId": 0,
                            "state": 0
                        }
                    ],
                    "floorNum": 0,
                    "rows": 0
                }
            ],
            "endTime": {
                "hour": 0,
                "minute": 0,
                "nano": 0,
                "second": 0
            },
            "isToday": true,
            "startTime": {
                "hour": 0,
                "minute": 0,
                "nano": 0,
                "second": 0
            },
            "timeId": 0
        },
        "msg": ""
    }
}

export function getAssignmentStatus(): RequestTask<BaseResp<IRecentStatus>> {
    return get({
        url: '/student/recent'
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