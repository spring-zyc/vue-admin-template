<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.query" placeholder="群聊名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getGroups">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFlush">强制刷新</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table v-loading="listLoading" :data="groups" highlight-current-row style="width: 100%;" @selection-change="selsChange">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="60" />
      <el-table-column prop="avatar" width="50">
        <template scope="scope">
          <img :src="scope.row.avatar" class="avatar">
        </template>
      </el-table-column>
      <el-table-column label="群聊名称" sortable>
        <template scope="scope">
          <a :href="'/#/group/' + scope.row.id" class="url">{{ scope.row.nick_name }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="人数" sortable />
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">退出</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" :disabled="this.sels.length===0" @click="batchRemove">批量退出</el-button>
      <el-button type="info" :disabled="this.sels.length===0" @click="sendMsg">发送消息</el-button>
      <el-pagination layout="prev, pager, next" :page-size="20" :total="total" style="float:right;" @current-change="handleCurrentChange" />
    </el-col>

  </section>
</template>

<script>
import { getGroupList, removeGroup, batchRemoveGroup, flushData } from '../../../api/api'

export default {
  props: ['puid'],

  data() {
    return {
      filters: {
        query: ''
      },
      groups: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [] // 列表选中列
    }
  },

  mounted() {
    this.getGroups()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getGroups()
    },
    sendMsg() {
      var ids = this.sels.map(item => item.id).toString()
      this.$router.push({ path: '/send_msg/contact',
        query: { ids: ids, type: 'group', gid: '', send_type: '' }})
    },
    handleFlush() {
      this.$confirm('确认重新拉取群聊列表吗?', '提示', {
        type: 'warning'
      }).then(() => {
        const para = { type: 'group', puid: this.puid }
        flushData(para).then((res) => {
          this.$notify({
            title: 'Success',
            message: '任务已发出，请稍后刷新页面',
            type: 'success'
          })
        })
      })
    },
    getGroups() {
      const para = {
        page: this.page,
        q: this.filters.query,
        puid: this.puid
      }
      this.listLoading = true
      getGroupList(para).then((res) => {
        this.total = res.data.total
        this.groups = res.data.groups
        this.listLoading = false
      })
    },

    handleDel: function(index, row) {
      this.$confirm('确认退出该群聊吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        const para = { id: row.id }
        removeGroup(para).then((res) => {
          this.listLoading = false
          this.$message({
            message: '已离开',
            type: 'success'
          })
          this.getGroups()
        })
      }).catch(() => {

      })
    },

    selsChange: function(sels) {
      this.sels = sels
    },

    batchRemove: function() {
      var ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认退出选中的群聊？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        const para = { ids: ids }
        batchRemoveGroup(para).then((res) => {
          this.listLoading = false
          this.$message({
            message: '退出成功',
            type: 'success'
          })
          this.getGroups()
        })
      }).catch(() => {

      })
    }
  }
}

</script>

<style scoped>
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
    margin-left: -18px;
  }
  .url {
    text-decoration: none;
    color: #48576a;
  &:hover, &:active {
              background: #20a0ff;
              color: #fff;
            }
  }
</style>
