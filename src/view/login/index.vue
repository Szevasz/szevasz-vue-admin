<template>
    <div class="login_container">
       <el-row>
            <el-col :span="12" :xs="0">1</el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form">
                    <h1>Hello</h1>
                    <h2>欢迎来到木材干湿度检测管理系统</h2>
                    <el-form-item>
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="default" class="login_btn" @click="login">登陆</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
       </el-row>
    </div>
</template>

<script setup lang="ts">
import {User,Lock} from '@element-plus/icons-vue';
import {reactive} from 'vue';
//收集账号与密码的数据
let loginForm = reactive({username:'admin',password:'111111'})
const login = ()=>{
    console.log('111')
}
</script>

<style scoped lang="scss">
.login_container{
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background1.2.heic') no-repeat;
    background-size:cover
}
.login_form{
    position:relative;
    width:80%;
    top:30vh;
    background:url("@/assets/images/login_form.png") no-repeat;
    background-size:cover;
    padding:40px;
    h1{
        color:white;
        font-size:40px;
    }
    h2{
        color:white;
        font-size:20px;
        margin:20px 0px;
    }
    .login_btn{

    }
}
</style>