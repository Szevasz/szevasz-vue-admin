<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" class="avatar" />
      <div class="bottom">
        <h3 class="title">{{ getTime() }}好{{ userStore.username }}</h3>
        <p class="subtitle">Szevasz-admin</p>
      </div>
    </div>
  </el-card>
  <div class="bottoms">
    <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { getTime } from '@/utils/time'
//获取仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
//目前首页挂载完毕发请求获取用户信息
onMounted(() => {
  userStore.userInfo()
})
</script>

<style scoped lang="scss">
.box {
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .bottom {
    margin-left: 20px;

    .title {
      font-style: italic;
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
      margin-top: 10px;
      color: #3f3f3f;
    }

    .subtitle {
      font-style: italic;
      color: #a9cce3;
    }
  }
}
.bottoms {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
