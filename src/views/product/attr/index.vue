<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0px">
      <div v-show="scene == 0">
        <el-button type="primary" size="default" @click="addAttr" icon="Plus"
          :disabled="categoryStore.c3Id ? false : true">
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
      <div v-show="scene == 1">
        <!-- 展示添加属性与修改数据的结构 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请您输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="default" @click="addAttrValue" icon="Plus"
          :disabled="attrParams.attrName ? false : true">
          添加属性值
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
        <el-table border style="margin: 10px 0px" :data="attrParams.attrValueList">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input placeholder="请您输入属性值名称" v-model="row.valueName" v-if="row.flag" @blur="toLook(row,$index)" size="small"></el-input>
              <div v-else @click="toEdit(row)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作"></el-table-column>
        </el-table>
        <el-button type="primary" size="default" @click="save" :disabled="attrParams.attrValueList.length > 0?false:true">保存</el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
//获取分类的仓库
import { reqAttr, reqAddOrUpdateAttr } from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category'
import { reactive, ref, watch } from 'vue'
let categoryStore = useCategoryStore()
//引入类型
import type { Attr } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
import { AttrValue } from '@/api/product/attr/type'
//存储已有属性和属性值
let attrArr = ref<Attr[]>([])
//定义card组件内容切换变量
let scene = ref<number>(0)
//控制编辑模式或查看模式的数据
let flag = ref<boolean>(true)
//收集新增的属性的数据
let attrParams = reactive<Attr>({
  attrName: '', //新增的属性的名字
  attrValueList: [],
  categoryId: '', //三级分类的ID
  categoryLevel: 3, //三级分类
})
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
  //清空原先数据
  Object.assign(attrParams, {
    attrName: '', //新增的属性的名字
    attrValueList: [],
    categoryId: categoryStore.c3Id, //三级分类的ID
    categoryLevel: 3, //三级分类
  })
  //切换为添加属性组件
  scene.value = 1
  //收集新增属性的三级分类的id
  attrParams.categoryId = categoryStore.c3Id
}
//修改属性按钮回调函数
const updateAttr = () => {
  scene.value = 1
}
//取消按钮的回调
const cancel = () => {
  scene.value = 0
}
//添加属性值按钮的回调
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag:true  //控制每一个属性值的编辑模式和查看模式
  })
}
//保存按钮的回调
const save = async () => {
  //发请求
  let result = await reqAddOrUpdateAttr(attrParams)
  if (result.code == 200) {
    //切换场景
    scene.value = 0
    //提示信息
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}
//属性值表单失去焦点方法
const toLook = (row:AttrValue,$index:number) => {
  //非法情况1:属性值为空
  if(row.valueName.trim() == ''){
    //删除对应属性值为空的元素
    attrParams.attrValueList.splice($index,1)
    //提示信息
    ElMessage({
      type:'error',
      message:"属性值不能为空！"
    })
    return
  }
  //非法情况2:属性值重复
  let repeat = attrParams.attrValueList.find((item) => {
    //把当前失去焦点属性值对象从当前数组扣除
    if(item != row){
      return item.valueName === row.valueName
    }
  })
  if(repeat){
    //将重复的值去除
    attrParams.attrValueList.splice($index,1)
    ElMessage({
      type:'error',
      message:'属性值不能重复'
    })
    return
  }
  row.flag = false
}
//div获得焦点进入编辑模式方法
const toEdit = (row:AttrValue) => {
  row.flag = true
}
</script>

<style lang="scss"></style>
