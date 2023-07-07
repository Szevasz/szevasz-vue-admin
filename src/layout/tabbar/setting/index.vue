<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefsh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    style="height: 24px; width: 24px; margin: 0 10px; border-radius: 30%"
  />
  <el-dropdown>
    <span class="el-dropdown-link" style="color: black">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
//获取用户相关小仓库
import useUserStore from '@/store/modules/user'
//获取骨架的小仓库
import useLayOutSettingStore from '@/store/modules/setting'
import { useRouter, useRoute } from 'vue-router'
let layoutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()
//获取路由器对象
let $router = useRouter()
let $route = useRoute()
//刷新按钮点击回调
const updateRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh
}
//全屏按钮
const fullScreen = () => {
  //DOM的一个属性：可以用来判断当前是不是全屏模式
  let full = document.fullscreenElement
  //切换全屏模式
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
//退出登陆点击回调
const logout = async () => {
  //第一件事情:需要向服务器发请求[退出登陆接口]
  //第二件事情:仓库当中关于用于相关的数据清空[token|username|avatar]
  //第三件事情:跳转到登陆页面
  await userStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style lang="scss"></style>
