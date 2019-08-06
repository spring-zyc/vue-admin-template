import Vue from 'vue'


function checkStatus(res, options = {}) {
  let { r, msg } = res.data
  let type, message
  if (r !== 0) {
    type = 'error'
    message = msg
  } else {
    type = 'success'
    message = '提交成功'
  }
  this.$message({
    message: message,
    type: type
  })
}

function eventSourceListener() {
  const base = process.env.VUE_APP_BASE_API
  const url = base + '/stream'
  console.log('event Source Listener', url)
  let source = new EventSource(url)
  let self = this
  source.addEventListener('login', function(event) {
    let data = JSON.parse(event.data)

    if (data.type == 'scan_qr_code') {
      self.uuid = data.uuid
      self.qrCode = `data:image/png;base64,${ data.extra}`//二维码
      console.log('EventListener-----',self.qrCode)
    } else if (data.type == 'confirm_login') {
      self.sub_title = '扫描二维码成功'
      self.sub_desc = '请稍等，微信登录正在做后续处理........'
      self.qrCode = data.extra;//头像
      // self.$store.commit('wechat/SET_LOGIN',true)
    } else if (data.type == 'logged_in') {
      sessionStorage.setItem('user', JSON.stringify(data.user))
      self.$router.push({ path: '/main' })
    } else if (data.type == 'logged_out') {
      self.$store.commit('wechat/CLOSE_TAB_BY_PUID', data.uuid)
      alert('微信已经在客户端被关闭')
      // sessionStorage.removeItem('user')
      // self.$router.push('/login')
    }
  }, false)

  source.addEventListener('notification', function(event) {
    let data = JSON.parse(event.data)
    let msg = ''
    for (const i in self.$store.getters.wechat){
      msg = msg + `<div>${i.name}收到${data[i.id]}条消息</div>`
    }
    self.$notify({
      title: '提示',
      message: msg,
      duration: 0
    })
    console.log("收到消息通知",data)
    self.notificationCount = data
  }, false)

  source.addEventListener('mynotification', function(event) {
    let data = JSON.parse(event.data)
    let msg = ''
    for (const i in self.$store.getters.wechat){
      msg = msg + `<div>${i.name}收到${data[i.id]}条消息</div>`
    }
    self.$notify({
      title: '提示',
      message: msg,
      duration: 0
    })
    console.log("收到消息通知",data)
    self.mynotificationCount = data
  }, false)
  source.addEventListener('error', function(event) {
    console.log("Failed to connect to event stream")
  }, false)

  source.addEventListener('test', function(event) {
    let data = JSON.parse(event.data)
    console.log(data)
  }, false)
}

export default {
  install(Vue, defaultOptions = {}) {
    Vue.mixin({
      data: function() {
        return {
          uuid: '',
          qrCode: `${process.env.VUE_APP_BASE_API}/static/img/qr_code.gif`,
          sub_title: '请扫描二维码登录微信',
          sub_desc: '然后在手机上确定登录',
          notificationCount: {},
          mynotificationCount: {}
        }}
    })
    Vue.prototype.$checkStatus = checkStatus
    Vue.prototype.$eventSourceListener = eventSourceListener
  }
}
