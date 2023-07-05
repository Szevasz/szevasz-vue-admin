<template>
  <div>
    <h1>我是一级路由Home</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
//获取仓库
import useUserStore from '@/store/modules/user'
let useStore = useUserStore()
//目前首页挂载完毕发请求获取用户信息
onMounted(() => {
  useStore.userInfo()
})
</script>

<style></style>
