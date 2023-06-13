<template>
  <div>
    <el-button type="primary" size="default" @click="" :icon="Plus">
      主要按钮
    </el-button>
    <el-button type="success" size="default" @click="" :icon="Edit">
      编辑
    </el-button>
    <el-button type="danger" size="default" @click="" :icon="Delete">
      删除
    </el-button>
  </div>
  <test />
</template>

<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import test from '@/components/test.vue'
</script>

<style scoped></style>
