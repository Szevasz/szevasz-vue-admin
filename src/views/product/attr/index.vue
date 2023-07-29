<template>
  <div>
    <Category />
    <el-card style="margin: 10px 0px">
      <el-button type="primary" size="default" @click="" icon="Plus" :disabled="categoryStore.c3Id ? false : true">
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0px" :data="attrArr">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{row,$index}">
            <el-tag style="margin: 5px;" v-for="(item,index) in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{row,$index}">
            <el-button type="primary" size="default" @click="" icon="Edit"></el-button>
            <el-button type="primary" size="default" @click="" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
//获取分类的仓库
import { reqAttr } from '@/api/product/attr';
import useCategoryStore from '@/store/modules/category'
import { ref, watch } from 'vue';
let categoryStore = useCategoryStore()
//引入类型
import type { Attr } from "@/api/product/attr/type"
//存储已有属性和属性值
let attrArr = ref<Attr[]>([])
//监听仓库三级分类id变化
watch(() => categoryStore.c3Id, () => {
  //清空上一次查询的属性值
  attrArr.value = []
  //保证有三级分类id再发请求
  if(!categoryStore.c3Id) return
  getAttr()
})
//获取已有属性值
const getAttr = async () => {
  const {c1Id,c2Id,c3Id} = categoryStore;
  let result = await reqAttr(c1Id,c2Id,c3Id)
  if(result.code == 200) {
    attrArr.value = result.data
  }
}
</script>

<style lang="scss"></style>
