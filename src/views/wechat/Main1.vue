<template>
  <div>
    <div class="navbar">
      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <!--<img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>
                Home
              </el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button @click="logout" />
      </div>
    </div>
    <el-tabs v-model="currentTabName" type="card" editable @edit="handleTabsEdit">

      <el-tab-pane
        v-for="(item, index) in bots"
        :key="index"
        :name="item.name"
        :label="item.nick"
      >
        <span slot="label"><img :src="item.avatar"/> {{ item.nick + item.id}}</span>
        <wechat-tab v-if="item.id" :puid="item.id"/>
        <wechat-login v-else></wechat-login>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import WechatTab from './tab/index'
import WechatLogin from './Login'

export default {
  components: {
    WechatTab,
    WechatLogin
  },
  data() {
    return {
    }
  },
  computed:{
    bots(){
      return this.$store.getters.wechat
    },
    currentTabName:{
      get(){
        return this.$store.getters.tabName
      }
    ,
      set(tabName){
        this.$store.commit('wechat/SET_TABNAME',tabName)
      }
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch('wechat/list')
      this.$eventSourceListener()
      await this.$store.dispatch('wechat/login')
    } catch (e) {
      console.log(e)
    }
  },
  methods: {

    handleTabsEdit(targetName, action) {
      if (action === 'add') {

        this.$store.dispatch('wechat/login').then().catch(err => console.log(err))
      }
      if (action === 'remove') {
        const tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }

        this.editableTabsValue = activeName
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script >
<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>

