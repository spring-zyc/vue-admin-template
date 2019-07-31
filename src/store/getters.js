const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  wechat: state => state.wechat.weChat,
  tabName: state => state.wechat.tabName,
  tabIndex: state => state.wechat.tabindex
}
export default getters
