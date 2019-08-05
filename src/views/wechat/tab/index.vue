<template>
  <el-tabs v-model="tabName" type="card"  style="margin: 10px 30px 10px 30px">
    <el-tab-pane label="用户管理" name="user"   ><user queryType="contract" :puid="puid"></user></el-tab-pane>
    <el-tab-pane label="群聊管理" name="group" ><group :puid="puid"></group></el-tab-pane>
    <el-tab-pane label="消息管理" name="message" >
      <span slot="label"><el-badge  :value="message" class="item">
            消息管理
             </el-badge>
        <!--<span v-else >消息管理</span>-->
      </span>

      <message :puid="puid"></message>
    </el-tab-pane>
    <el-tab-pane label="微信设置" name="setting" ><setting :puid="puid"></setting></el-tab-pane>
  </el-tabs>
</template>
<script>
import user from '../../common/User'
import group from  './Group'
import message from './Message'
import setting from './Setting'

export default {
  name: 'WechatTab',
  components: {
    user,
    group,
    message,
    setting
  },
  props: {
    botId: String,//服务器生成的uuid
    puid: String  //wxpy生成的uuid
  },
  data(){
    return {
      tabName: 'user'
    }
  },
  computed: {
    message(){
      return this.notificationCount[this.puid]
    }
  },
  mounted(){
    this.$eventSourceListener()
    console.log('event Source Listener finished')
  }
}
</script>

<style>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
