<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0">1</el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到木材干湿度检测管理系统</h2>
          <el-form-item>
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              size="default"
              class="login_btn"
              @click="login"
            >
              登陆
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive,ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
let useStore = useUserStore();
//获取路由器
let $router = useRouter();
//定义变量控制按钮加载效果
let loading = ref(false);
//引入登陆接口
import {reqLogin} from '@/api/user'; 
//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: '111111' })
const login = async () => {
    loading.value = true;
    try {
        await useStore.userLogin(loginForm);
        $router.push('/');
        ElNotification({
            type:'success',
            message:'登陆成功'
        })
        //登陆成功加载效果消失
        loading.value = false
    } catch (error) {
        //登陆失败加载效果消失
        loading.value = false 
        ElNotification({
            type:'error',
            message:'帐号或密码错误'
        })
    }
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background1.2.heic') no-repeat;
  background-size: cover;
}
.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;
  h1 {
    color: white;
    font-size: 40px;
  }
  h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0px;
  }
  .login_btn {
  }
}
</style>
