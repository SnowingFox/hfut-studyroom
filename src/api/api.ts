import { RequestTask } from "@tarojs/taro"
import { get, post } from "./http"
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

export function getSeatsList(timeId, appointmentDate) {
    let data = {
        timeId: timeId,
        appointmentDate: appointmentDate
    }
    return get({
        url: '/student/appointment/info',
        data: data
    })
}

export function getUnfinishAssignmentStatus(): RequestTask<BaseResp<IRecentStatus[]>> {
    return get({
        url: '/student/unfinished'
    })
}

export function getStudentInfo(): RequestTask<BaseResp<IStudentInfo>> {
    return get({
        url: '/student/info'
    })
}

export function getHistoryOfAssignment() {
    return get({
        url: "/student/history"
    })
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

export function stop(appointmentId) {
    return get({
        url: "/student/appointment/stop",
        data: {
            appointmentId: appointmentId
        }
    })
}

export function appointment(seatId, timeId, appointmentDate) {
    const data = {
        seatId: seatId,
        timeId: timeId,
        appointmentDate: appointmentDate
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

export function getBanners() {
    return get({
        url: "/banner"
    })
}

export function feedback(msg, qq) {
    return post({
        url: "/student/feedback",
        data: {
            msg: msg,
            qq: qq
        }
    })
}

export function help() {
    return get({
        url: "/help"
    })
}

export function getAbout() {
    return get({
        url: "/about"
    })
}

export function getAppName() {
    return get({
        url: "/student/application/name"
    })
}