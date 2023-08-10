<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请您输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select>
        <el-option label="华为"></el-option>
        <el-option label="苹果"></el-option>
        <el-option label="小米"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请您输入SPU描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU图标">
      <el-upload
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select>
        <el-option label="华为"></el-option>
        <el-option label="苹果"></el-option>
        <el-option label="小米"></el-option>
      </el-select>
      <el-button
        style="margin-left: 10px"
        type="primary"
        size="default"
        @click=""
        icon="Plus"
      ></el-button>
      <el-table border style="margin: 10px 0px">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
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
const initHasSpuData = async (spu: SpuData) => {
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
  //存储SPU的商品图片
  imgList.value = result1.data
  //存储已有的SPU的销售属性
  saleAttr.value = result2.data
  //存储全部的销售属性
  allSaleAttr.value = result3.data
}
//对外暴露
defineExpose({ initHasSpuData })
</script>

<style></style>
