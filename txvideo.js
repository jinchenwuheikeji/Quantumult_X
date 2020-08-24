const env = init()
const cookieName = '腾讯视频'
const reqHeaderKey = 'txvideo_request_header'

let reqHeaderVal = env.getdata(reqHeaderKey)

signapp()

function signapp() {

    const timestamp1 = Math.round(new Date().getTime()).toString()
    const timestamp2 = Math.round(new Date().getTime()).toString()
    const signurl = `https://vip.video.qq.com/fcgi-bin/comm_cgi?name=hierarchical_task_system&cmd=2&_=${timestamp2}&callback=Zepto${timestamp1}`
    let url = { url: signurl, headers: JSON.parse(reqHeaderVal) }
    env.get(url, (error, response, data) => {
        let result = JSON.parse(data.substring(data.indexOf('({') + 1, data.indexOf('})') + 1))
        if(result.checkin_score === 0) {
          info = '❌重复签到'
          env.log(`${cookieName}, 签到结果: 重复签到`)
          getInfo()
        }else {
          info = `✅签到成功，获得V力值: ${result.checkin_score}`
          env.log(`✅签到成功，获得V力值: ${result.checkin_score}`)
        }
    })

}

function getInfo() {

    const timestamp1 = Math.round(new Date().getTime()).toString()
    const timestamp2 = Math.round(new Date().getTime()).toString()
    const getInfoUrl = `https://vip.video.qq.com/fcgi-bin/comm_cgi?name=spp_vscore_user_mashup&type=1&_=${timestamp2}&callback=Zepto${timestamp1}`
    let url = { url: getInfoUrl, headers: JSON.parse(reqHeaderVal) }
    env.get(url, (error, response, data) => {
      let result = JSON.parse(data.substring(data.indexOf('({') + 1, data.indexOf('})') + 1))
      env.msg(cookieName, `我的信息: ${info}`, `当前VIP等级: ${result.lscore_info.level}, 总积分: ${result.cscore_info.vip_score_total}, 总武力值: ${result.lscore_info.score}`)
      env.log(`${cookieName}, 我的信息:${info}, 当前VIP等级: ${result.lscore_info.level}, 总积分: ${result.cscore_info.vip_score_total}, 总武力值: ${result.lscore_info.score}`)
      
    })

}

env.done()
function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}