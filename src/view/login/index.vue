<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0">1</el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到木材干湿度检测管理系统</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" size="default" class="login_btn" @click="login">
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
//引入获取当前时间的函数
import { getTime } from '@/utils/time'
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
let useStore = useUserStore()
//获取el-from组件
let loginForms = ref();
//获取路由器
let $router = useRouter()
//定义变量控制按钮加载效果
let loading = ref(false)
//引入登陆接口
import { reqLogin } from '@/api/user'
//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: '111111' })
//登陆按钮回调
const login = async () => {
  //保证全部表单项校验通过再发请求
  await loginForms.value.validate();
  //加载效果：开始加载
  loading.value = true
  /**
   * 点击登录按钮后
   * 通知仓库发登陆请求
   * 请求成功->首页展示数据的地方
   * 请求失败->弹出登陆失败信息
   */
  try {
    await useStore.userLogin(loginForm)
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '登陆成功',
      title: `Hi,${getTime()}好`
    })
    //登陆成功加载效果消失
    loading.value = false
  } catch (error) {
    //登陆失败加载效果消失
    loading.value = false
    ElNotification({
      type: 'error',
      message: '帐号或密码错误',
    })
  }
}
//自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  //rule:校验规则对象
  //value:表单元素文本内容
  //callback:放行函数
  if (value.length >= 5 && value.length <= 10) {
    callback();
  } else {
    callback(new Error('账号长度为5-10位'));
  }
}

const validatorPassWord = (rule: any, value: any, callback: any) => {
  if (value.length >= 6 && value.length <= 15) {
    callback();
  } else {
    callback(new Error('账号长度为6-15位'));
  }
}
//定义表单校验需要的配置对象
const rules = {
  //规则对象属性：
  //required,代表这个字段务必要校验
  //min：文本长度至少多少位
  //max：文本长度最多多少位
  //message：错误的提示信息
  //trigger：触发校验表单的时机 change->文本发生变化触发校验,blur:失去焦点的时候触发校验
  username: [
    { trigger: 'change', validator: validatorUserName }
  ],
  password: [
    { trigger: 'change', validator: validatorPassWord }
  ]
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

  .login_btn {}
}
</style>
