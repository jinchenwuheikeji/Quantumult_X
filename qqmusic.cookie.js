/**
 * 获取cookie说明：仅限老用户使用，新用户签到机制不一样
 * 打开QQ音乐APP -> 点击“我的” -> 点击“活动中心”
 * 弹出“获取Cookie: 成功!”即可，然后把重写规则的request请求禁用，避免重复获取cookie
 */

const cookieName = 'QQ音乐'
const signheaderKey = 'chavy_header_qqmusic'
const signbodyKey = 'chavy_body_qqmusic'
const signqueryKey = 'chavy_query_qqmusic'
const chavy = init()
if ($request && $request.body) {
    const isGetSignInfo = $request.body.indexOf(`QuerySignInfo`) >= 0
    const isHomePage = $request.body.indexOf(`HomePage`) >= 0
    const isTaskPage = $request.body.indexOf(`task_page`) >= 0
    const isGetAllPrize = $request.body.indexOf(`GetAllPrize`) >= 0
    if ($request.headers['Cookie'] && isGetSignInfo && isHomePage && isTaskPage && isGetAllPrize) {
        const signheaderVal = JSON.stringify($request.headers)
        let signbodyVal = JSON.parse($request.body)
        if (signbodyVal) chavy.setdata($request.body, signqueryKey)
        delete signbodyVal.req_1
        delete signbodyVal.req_2
        delete signbodyVal.req_3
        signbodyVal.req_0.method = 'DoSignIn'
        if (signheaderVal) chavy.setdata(signheaderVal, signheaderKey)
        if (signbodyVal) chavy.setdata(JSON.stringify(signbodyVal), signbodyKey)
        chavy.msg(`${cookieName}`, '✅获取Cookie: 成功!', '')
    }
} 

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
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
chavy.done()