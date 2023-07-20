<template>
  <el-card class="box-card">
    <!-- 顶部添加品牌按钮 -->
    <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
    <!-- 表格组件:用于展示数据 -->
    <el-table style="margin: 10px 0px" border :data="trademarkArr">
      <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
      <!-- table-column属性中的数据展示用的是div -->
      <el-table-column label="品牌名称">
        <template #="{ row, $index }">
          <pre>{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" alt="无图片" style="height: 100px; width: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="Edit" @click="updateTrademark"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChange" @current-change="getHasTrademark" v-model:current-page="PageNo"
      v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total" :total="total" />
  </el-card>
  <!-- 对话框组件,在添加品牌和修改已有品牌时使用 -->
  <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form style="width:80%">
      <el-form-item label="品牌名称" label-width="80px">
        <el-input placeholder="请您输入品牌名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="80px">
        <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
      <!-- 具名插槽footer -->
    <template #footer>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-button type="primary" size="default" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
import { Records, TradeMarkResponseData } from '@/api/product/trademark/type'
import { getChildState } from 'element-plus/es/components/tree/src/model/node.js'
//当前页码
let PageNo = ref<number>(1)
//每一页展示多少条数据
let limit = ref<number>(3)
//数据总数
let total = ref<number>(0)
//存储已有品牌的数据
let trademarkArr = ref<Records>([])
//控制对话框显示
let dialogFormVisible = ref<boolean>(false)
const getHasTrademark = async (pager = 1) => {
  PageNo.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(
    PageNo.value,
    limit.value,
  )
  total.value = result.data.total
  trademarkArr.value = result.data.records
  console.log(result)
}

onMounted(() => {
  getHasTrademark()
})

const sizeChange = () => {
  getHasTrademark()
}
//添加品牌按钮回调
const addTrademark = () => {
  dialogFormVisible.value = true
}
//修改品牌按钮回调
const updateTrademark = () => {
  dialogFormVisible.value = true
}

const cancel = () => {
  dialogFormVisible.value = false
}

const confirm = () => {
  dialogFormVisible.value = false
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
