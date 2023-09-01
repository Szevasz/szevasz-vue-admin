<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名:">
        <el-input placeholder="请你输入搜索用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default">搜索</el-button>
        <el-button type="primary" size="default">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px">
    <el-button type="primary" size="default" @click="addUser">
      添加用户
    </el-button>
    <el-button type="danger" size="default" @click="">批量删除</el-button>
    <!-- table展示用户信息 -->
    <el-table style="margin: 10px 0px" border :data="userArr">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column
        label="用户名字"
        align="center"
        prop="username"
      ></el-table-column>
      <el-table-column
        label="用户名称"
        align="center"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="用户角色"
        align="center"
        prop="roleName"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
      ></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" @click="" icon="User">
            分配角色
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="updateUser(row)"
            icon="Edit"
          >
            编辑
          </el-button>
          <el-button type="primary" size="small" @click="" icon="Delete">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @size-change="handler"
      @current-change="getHasUser"
    />
  </el-card>
  <!-- 抽屉组件：完成添加新用户｜更新用户 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>添加用户</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input
            placeholder="请您输入用户姓名"
            v-model="userParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input
            placeholder="请您输入用户昵称"
            v-model="userParams.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input
            placeholder="请您输入用户密码"
            v-model="userParams.password"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { reqAddOrUpdateUser, reqUserInfo } from '@/api/acl/user'
import type { Records, UserResponseData, User } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

//默认页码
let pageNo = ref<number>(1)
//一页展示几条数据
let pageSize = ref<number>(5)
//用户总个数
let total = ref<number>(0)
//存储全部用户数组
let userArr = ref<Records>([])
//控制抽屉组件的显示与隐藏
let drawer = ref<boolean>(false)
//收集用户信息的响应式数据
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
//组件挂载完毕
onMounted(() => {
  getHasUser()
})
//获取全部已有的用户信息
const getHasUser = async (pager = 1) => {
  //收集当前页码
  pageNo.value = pager
  let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value)
  if (result.code == 200) {
    console.log(result)
    total.value = result.data.total
    userArr.value = result.data.records
  }
}
//分页器下拉菜单事件回调方法
const handler = () => {
  getHasUser()
}
//添加用户按钮方法回调
const addUser = () => {
  drawer.value = true
  //清空数据
  Object.assign(userParams, {
    username: '',
    name: '',
    password: '',
  })
}
//编辑用户按钮方法回调
const updateUser = (row: User) => {
  drawer.value = true
}
//保存按钮的回调
const save = async () => {
  let result: any = await reqAddOrUpdateUser(userParams)
  //添加或者更新成功
  if (result.code == 200) {
    //关闭抽屉
    drawer.value = false
    //提示消息
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功',
    })
    //获取最新的全部账号的信息
    getHasUser()
  } else {
    //关闭抽屉
    drawer.value = false
    //提示信息
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失败' : '添加失败',
    })
  }
}
//抽屉的取消按钮方法回调
const cancel = () => {
  drawer.value = false
}
</script>

<style lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
