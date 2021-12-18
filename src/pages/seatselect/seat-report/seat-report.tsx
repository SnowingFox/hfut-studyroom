import Nerv from 'nervjs'
import { View } from '@tarojs/components'
import { AtTextarea } from 'taro-ui'
import { AtImagePicker } from 'taro-ui'
import { AtButton } from 'taro-ui'
import { useEffect, useState } from 'react'
// @ts-ignore
import Taro from '@tarojs/taro'
import { AtMessage } from 'taro-ui'
import { reportSeat, uploadReportFiles } from '../../../api/seat'
import { useRouter } from '@tarojs/runtime'
import STATUS from '../../../config/status'

const UPLOAD_IMAGE_MAX_SIZE = 1024 * 1024 * 2

export default function SeatReport() {
  const [reportMsg, setReportMsg] = useState('')
  const [files, setFiles] = useState([])
  const router = useRouter()

  const reportId = Number(router.params.id)

  function onSubmitReport(): void {
    if (reportMsg.length === 0 || reportMsg === '') {
      Taro.atMessage({
        type: 'error',
        message: '举报内容不能为空！'
      })

      return
    }

    if (!files.length) {
      Taro.atMessage({
        type: 'error',
        message: '至少上传一张图片！'
      })

      return
    }

    report()
  }

  function report(): void {
    uploadReportFiles(files).then((res) => {
      const result = JSON.parse(res.data)
      const src = result.data
      if (result.data.code === STATUS.error) {
        Taro.atMessage({
          type: 'error',
          message: '系统异常！'
        })
        return
      }

      reportSeat(reportId, reportMsg, src).then((reportRes) => {
        if (reportRes.data.code === STATUS.system_error) {
          Taro.atMessage({
            type: 'error',
            message: '系统异常！'
          })
          return
        }

        if (reportRes.data.code === STATUS.error) {
          Taro.atMessage({
            type: 'error',
            message: reportRes.data.msg
          })
          return
        }

        Taro.showModal({
          title: '提示',
          content: '举报成功！',
          showCancel: false,
          success(res) {
            Taro.navigateBack()
          }
        })
      })
    })
  }

  return (
    <View className="flex w-screen h-screen flex-col">
      <AtMessage />
      <AtTextarea
        focus={true}
        value={reportMsg}
        onChange={(msg) => setReportMsg(msg)}
        maxLength={500}
        placeholder="请描述你要举报的问题"
        height={100}
      />
      <View className="at-article__info" style="margin-top: 20px;">
        请选择1张图片(图片最大只能为{UPLOAD_IMAGE_MAX_SIZE / (1024 * 1024)}MB)
      </View>
      <AtImagePicker
        length={1}
        files={files}
        onChange={(callFiles) => {
          setFiles(
            callFiles.map((file) => {
              if (file.file.size <= UPLOAD_IMAGE_MAX_SIZE) {
                return file
              } else {
                Taro.showModal({
                  title: '提示',
                  content: `图片最大只能为${UPLOAD_IMAGE_MAX_SIZE / (1024 * 1024)}MB`,
                  showCancel: false,
                  success() {
                    Taro.navigateBack()
                  }
                })
              }
            })
          )
        }}
      />
      <AtButton
        type="primary"
        onClick={onSubmitReport}
        customStyle="width: 90vw; border: 1px solid #6190e8; background-color:#6190e8;margin-top: 10%;"
      >
        举报
      </AtButton>
    </View>
  )
}
