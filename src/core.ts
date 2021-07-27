import { IParams, IResult } from './type'

// 回调函数标识
let callbackId = 0
// 回调函数
let callback: any = {}

/**
 * 调用 flutter 方法
 * @param method - 方法名
 * @param params - 调用方法的参数
 * @param func - 回调函数
 */
const invoke = (method: string, params?: any, func?: (params: any) => void) => {
  callbackId++

  // 约束传递到 flutter 的数据格式
  const data = {
    method,
    params,
    callbackId
  }

  // 添加回调函数
  callback[callbackId] = func

  // 发送消息到 flutter
  try {
    window.JSChannel.postMessage(data);
  } catch (error) {
    console.error(`JavaScript 调用 flutter 方法 ${method} 失败。原因：${error}`)
  }
}

/**
 * js 调用 flutter 方法
 * @param event - 方法名
 * @param data 可选，参数
 * @returns 
 */
export const jsHandler = (event: string, data: IParams = {}): Promise<IResult> => {
  return new Promise(resolve => {
    invoke(event, data, res => {
      resolve(res)
    })
  })
}

/**
 * 此方法为 flutter 调用 js
 * @param res
 */
export const receiveMessage = (res: IParams): void => {
  const { callbackId, data } = res;

    if (callbackId > -1) {
      callback[callbackId](data);
    }
}

window.FlutterJSBridge = {
  jsHandler,
  receiveMessage
}