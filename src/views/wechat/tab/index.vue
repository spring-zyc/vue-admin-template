<template>
  <el-tabs type="border-card">
    <el-tab-pane label="用户管理">用户</el-tab-pane>
    <el-tab-pane label="配置管理">群聊</el-tab-pane>
    <el-tab-pane label="角色管理">消息</el-tab-pane>
    <el-tab-pane label="定时任务补偿">设置</el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'WechatTab',
  props: {
    botId: String,
    puid: String
  }
}
</script>
