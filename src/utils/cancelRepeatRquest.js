/**
 * 取消重复请求
 */
import axios from 'axios'
const pendingMap = new Map()

/**
 * 生成每个请求唯一的键
 * @param {*} config
 * @returns string
 */
export function getPendingKey(config) {
  let { url, method, params, data } = config
  if (typeof data === 'string') data = JSON.parse(data) // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config
 */
export function addPendingRequest(config) {
  const pendingKey = getPendingKey(config)
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingMap.has(pendingKey)) {
      pendingMap.set(pendingKey, cancel)
    }
  })
}

/**
 * 删除重复的请求,删除已发送的请求，发送最新请求
 * @param {*} config
 */
export function removePendingRequest(config) {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    cancelToken(pendingKey)
    pendingMap.delete(pendingKey)
  }
}

