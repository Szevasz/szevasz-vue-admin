<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input placeholder="请你输入职位关键词" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="search" :disabled="keyword ? false : true">
          搜索
        </el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px">
    <el-button type="primary" size="default" icon="Plus" @click="addRole">
      添加职位
    </el-button>
    <el-table border style="margin: 10px 0px" :data="allRole">
      <el-table-column type="index" align="center" label="#"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column label="职位名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" align="center" show-overflow-tooltip prop="createTime"></el-table-column>
      <el-table-column label="更新时间" align="center" show-overflow-tooltip prop="updateTime"></el-table-column>
      <el-table-column label="操作" width="280px" align="center">
        <!-- row:已有的职位对象 -->
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="User" @click="setPermisstion(row)">
            分配权限
          </el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">
            编辑
          </el-button>
          <el-popconfirm :title="`你确定要删除${row.roleName}?`" width="260px" @confirm="removeRole(row.id)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
      :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="400" @current-change="getHasRole"
      @size-change="sizeChange" />
  </el-card>
  <!-- 添加职位与更新已有职位的结构:对话框 -->
  <el-dialog v-model="dialogVisible" title="添加职位">
        <el-form>
            <el-form-item label="职位名称" prop="roleName">
                <el-input placeholder="请你输入职位名称"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" size="default" @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" size="default" @click="save">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
//请求方法
import { reqAllRoleList } from '@/api/acl/role'
import { Records, RoleData, RoleResponseData } from '@/api/acl/role/type'
//当前页码
let pageNo = ref<number>(1)
//一页展示几条数据
let pageSize = ref<number>(10)
//搜索职位关键字
let keyword = ref<string>('')
//存储全部已有的职位
let allRole = ref<Records>([])
//职位总个数
let total = ref<number>(0)
//对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
//组件挂载完毕
onMounted(() => {
  //获取职位请求
  getHasRole()
})
//获取全部用户信息的方法|分页器当前页码发生变化的回调
const getHasRole = async (pager = 1) => {
  //修改当前页码
  pageNo.value = pager
  let result: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    allRole.value = result.data.records
  }
}
//下拉菜单的回调
const sizeChange = () => {
  getHasRole()
}
//搜索按钮的回调
const search = () => {
  getHasRole()
  keyword.value = ''
}
//重置按钮的回调
const reset = () => {
  keyword.value = ''
  getHasRole()
}
//添加职位按钮的回调
const addRole = () => {
    //对话框显示出来
    dialogVisible.value = true

}
//更新已有的职位按钮的回调
const updateRole = (row: RoleData) => {
    //显示出对话框
    dialogVisible.value = true;
}
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
</style>
