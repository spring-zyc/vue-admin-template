<template>
  <div>
  <el-row>
  <el-tabs v-model="tabName"   style="margin: 10px 30px 10px 30px" @tab-click="tabClick">
    <el-tab-pane label="用户管理" name="user" ><user queryType="contract" :puid="puid"></user></el-tab-pane>
    <el-tab-pane label="群聊管理" name="group" ><group :puid="puid"></group></el-tab-pane>
    <el-tab-pane label="群消息" name="group-message" >
      <!--<span slot="label"><el-badge  :value="message" class="item">-->
            <!--群消息-->
             <!--</el-badge>-->
        <!--&lt;!&ndash;<span v-else >消息管理</span>&ndash;&gt;-->
      <!--</span>-->

      <message :puid="puid" ref="message"></message>
    </el-tab-pane>
    <el-tab-pane label="我的消息" name="my-message" >
      <!--<span slot="label"><el-badge  :value="message" class="item">-->
            <!--我的消息-->
             <!--</el-badge>-->
        <!--&lt;!&ndash;<span v-else >消息管理</span>&ndash;&gt;-->
      <!--</span>-->
      <!--<el-badge  :value="message" class="item">-->
        <!--我的消息-->
      <!--</el-badge>-->
      <my-message :puid="puid" ref="message1"></my-message>
    </el-tab-pane>
    <el-tab-pane label="微信设置" name="setting" ><setting :puid="puid"></setting></el-tab-pane>
  </el-tabs>
  </el-row>
  </div>
</template>
<script>
import user from '../../common/User'
import group from  './Group'
import message from './Message'
import MyMessage from './MyMessage'
import setting from './Setting'

export default {
  name: 'WechatTab',
  components: {
    user,
    group,
    message,
    setting,
    MyMessage
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
  },
  methods:{
    tabClick(tab){
      console.log(tab.name)
      if (tab.name === 'my-message'){
        this.$refs.message1.getMessages()
      }
      if (tab.name === 'group-message'){
        this.$refs.message.getMessages()
      }
    }
  }
}
</script>

<style>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
