<template>
  <div>
    <Category :scene="scene"/>
    <el-card style="margin: 10px 0px">
      <div v-show="scene==0">
        <el-button type="primary" size="default" @click="addAttr" icon="Plus" :disabled="categoryStore.c3Id ? false : true">
          添加属性
        </el-button>
        <el-table border style="margin: 10px 0px" :data="attrArr">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-tag style="margin: 5px" v-for="(item, index) in row.attrValueList" :key="item.id">
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button type="primary" size="default" @click="updateAttr" icon="Edit"></el-button>
              <el-button type="primary" size="default" @click="" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene==1">
        <!-- 展示添加属性与修改数据的结构 -->
        <el-form :inline="true">
          <el-form-item>
            <el-input placeholder="请您输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="default" @click="" icon="Plus">添加属性值</el-button>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
        <el-table border style="margin: 10px 0px;">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性值名称"></el-table-column>
          <el-table-column label="属性值操作"></el-table-column>
        </el-table>
        <el-button type="primary" size="default">保存</el-button>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
//获取分类的仓库
import { reqAttr } from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category'
import { ref, watch } from 'vue'
let categoryStore = useCategoryStore()
//引入类型
import type { Attr } from '@/api/product/attr/type'
//存储已有属性和属性值
let attrArr = ref<Attr[]>([])
//定义card组件内容切换变量
let scene = ref<number>(0)
//监听仓库三级分类id变化
watch(
  () => categoryStore.c3Id,
  () => {
    //清空上一次查询的属性值
    attrArr.value = []
    //保证有三级分类id再发请求
    if (!categoryStore.c3Id) return
    getAttr()
  },
)
//获取已有属性值
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let result = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code == 200) {
    attrArr.value = result.data
  }
}
//添加属性按钮回调函数
const addAttr = () => {
  //切换为添加属性组件
  scene.value = 1
}
//修改属性按钮回调函数
const updateAttr = () => {
  scene.value = 1
}
//取消按钮的回调
const cancel = () => {
  scene.value = 0
}
</script>

<style lang="scss"></style>
