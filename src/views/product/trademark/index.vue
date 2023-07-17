<template>
  <el-card class="box-card">
    <!-- 顶部添加品牌按钮 -->
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <!-- 表格组件:用于展示数据 -->
    <el-table style="margin: 10px 0px" border :data="trademarkArr">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <!-- table-column属性中的数据展示用的是div -->
      <el-table-column label="品牌名称">
        <template #="{ row, $index }">
          <pre>{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img
            :src="row.logoUrl"
            alt="无图片"
            style="height: 100px; width: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChange"
      @current-change="getHasTrademark"
      v-model:current-page="PageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
    />
  </el-card>
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
</script>

<style lang="scss"></style>
