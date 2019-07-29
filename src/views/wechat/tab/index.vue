<template>
  <el-tabs type="border-card">
    <el-tab-pane label="用户管理"><user></user></el-tab-pane>
    <el-tab-pane label="群聊管理"><group></group></el-tab-pane>
    <el-tab-pane label="消息管理"><message></message></el-tab-pane>
    <el-tab-pane label="微信设置"><setting</el-tab-pane>
  </el-tabs>
</template>
<script>
import user from './User'
import group from  './Group'
import message from './Message'
import setting from './Setting'

export default {
  name: 'WechatTab',
  props: {
    botId: String,//服务器生成的uuid
    puid: String  //wxpy生成的uuid
  },
  components: {
    user,
    group,
    message,
    setting
  }
}
</script>
