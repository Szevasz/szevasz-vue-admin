<template>
  <div>
    <!-- 三级分类组件 -->
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0px">
      <div v-show="scene == 0">
        <el-button type="primary" size="default" @click="addSpu" icon="Plus">
          添加SPU
        </el-button>
        <el-table style="margin: 10px 0px" border :data="records">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="SPU操作">
            <template #="{ row, $index }">
              <el-button
                type="primary"
                size="default"
                @click=""
                icon="Plus"
                title="添加SKU"
              ></el-button>
              <el-button
                type="primary"
                size="default"
                @click="updateSpu"
                icon="Edit"
                title="修改SPU"
              ></el-button>
              <el-button
                type="primary"
                size="default"
                @click=""
                icon="View"
                title="查看SKU列表"
              ></el-button>
              <el-button
                type="primary"
                size="default"
                @click=""
                icon="Delete"
                title="删除SPU"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout=" prev, pager, next, jumper,->,total, sizes"
          :total="total"
          @size-change="changeSize"
          @current-change="getHasSpu"
        />
      </div>
      <!-- 添加spu｜修改spu组件 -->
      <SpuForm v-show="scene == 1" @changeScene="changeScene"></SpuForm>
      <!-- 添加sku组件 -->
      <SkuForm v-show="scene == 2"></SkuForm>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqHasSpu } from '@/api/product/spu'
import { HasSpuResponseData, Records } from '@/api/product/spu/type'
import useCategoryStore from '@/store/modules/category'
import { ref, watch } from 'vue'
//引入子组件
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
let categoryStore = useCategoryStore()
//场景的数据
let scene = ref<number>(0) //0:显示已有spu 1:添加或修改已有spu 2:添加sku的结构
//分页器默认页码
let pageNo = ref<number>(1)
//每页展示多少数据
let pageSize = ref<number>(3)
//存储已有的spu的数据
let records = ref<Records>([])
//存储已有SPU总数
let total = ref<number>(0)
//监听三级分类id变化
watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return
    getHasSpu()
  },
)
//获取某一个三级分类下的全部的已有的SPU
const getHasSpu = async (pager = 1) => {
  pageNo.value = pager
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
//分页器下拉菜单发生变化的时候触发
const changeSize = () => {
  getHasSpu()
}
//添加SPU按钮回调
const addSpu = () => {
  scene.value = 1
}
//修改已有SPu按钮回调
const updateSpu = () => {
  scene.value = 1
}
//子组件SpuForm绑定自定义事件:目前是让子组件通知父组件切换场景为0
const changeScene = (num: number) => {
  scene.value = num
}
</script>

<style lang="scss"></style>
