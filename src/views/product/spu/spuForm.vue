<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请您输入SPU名称" v-model="SpuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="SpuParams.tmId">
        <el-option v-for="(item, index) in AllTradeMark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请您输入SPU描述" v-model="SpuParams.description"></el-input>
    </el-form-item>
    <el-form-item label="SPU图标">
      <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
        :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlerUpload">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="height: 100%;width: 100%;"/>
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select>
        <el-option label="华为"></el-option>
        <el-option label="苹果"></el-option>
        <el-option label="小米"></el-option>
      </el-select>
      <el-button style="margin-left: 10px" type="primary" size="default" @click="" icon="Plus"></el-button>
      <el-table border style="margin: 10px 0px">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="销售属性名称" width="120px"></el-table-column>
        <el-table-column label="销售属性值"></el-table-column>
        <el-table-column label="操作" width="120px"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type {
  HasSaleAttr,
  HasSaleAttrResponseData,
  SaleAttr,
  SpuData,
  SpuImg,
} from '@/api/product/spu/type'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
} from '@/api/product/spu'
import type {
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
} from '@/api/product/spu/type'
import { TradeMark } from '@/api/product/trademark/type'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
let $emit = defineEmits(['changeScene'])
const cancel = () => {
  $emit('changeScene', 0)
}

//存储已有的SPU数据
let AllTradeMark = ref<TradeMark[]>([])
//商品图片
let imgList = ref<SpuImg[]>([])
//已有的SPU销售属性
let saleAttr = ref<SaleAttr[]>([])
//全部销售属性
let allSaleAttr = ref<HasSaleAttr[]>([])
//存储已有的SPU
let SpuParams = ref<SpuData>({
  category3Id: '',
  spuName: '',
  description: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [],
})
//控制查看大图对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
//存储预览图片地址
let dialogImageUrl = ref<string>('')

const initHasSpuData = async (spu: SpuData) => {
  //存储已有的SPU对象
  SpuParams.value = spu
  //spu:父组件传递过来的已有的SPU对象
  //获取全部品牌的数据
  let result: AllTradeMark = await reqAllTradeMark()
  //获取摸一个品牌下全部售卖商品的图片
  let result1: SpuHasImg = await reqSpuImageList(spu.id as number)
  //获取已有的SPU销售属性的数据
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  //获取整个项目全部的SPU的销售属性
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr()

  //存储全部品牌的数据
  AllTradeMark.value = result.data
  //存储SPU的商品图片(map将对应数据名称转换适应Element组件的需要)
  imgList.value = result1.data.map(item => {
    return {
      name: item.imgName,
      url: item.imgUrl
    }
  })
  //存储已有的SPU的销售属性
  saleAttr.value = result2.data
  //存储全部的销售属性
  allSaleAttr.value = result3.data
}
//照片墙点击预览按钮的时候触发钩子
const handlePictureCardPreview = (file:any) => {
  //对话框显示图片地址赋值
  dialogImageUrl.value = file.url
  //弹出对话框
  dialogVisible.value = true
}
//照片墙删除文件钩子
const handleRemove = () => {
  console.log('success')
}
//照片钱上传成功之前的钩子约束文件的大小与类型
const handlerUpload = (file: any) => {
    if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
        if (file.size / 1024 / 1024 < 3) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件务必小于3M'
            })
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传文件务必PNG|JPG|GIF'
        })
        return false;
    }
}
//对外暴露
defineExpose({ initHasSpuData })
</script>

<style></style>
