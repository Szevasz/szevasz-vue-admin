<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="center">中间</div>
        <div class="right">右侧</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
//引入子组件
import Top from '/src/views/screen/components/top/index.vue'
import Sex from '/src/views/screen/components/sex/index.vue'
import Age from '/src/views/screen/components/age/index.vue'
import Tourist from '/src/views/screen/components/tourist/index.vue'
//获取数据大屏展示内容盒子的DOM元素
let screen = ref()

//定义大屏缩放比例
function getScale(w = 1980, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})

//监听视口
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(src/views/screen/images/bg.png) no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    width: 1980px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .right {
        flex: 1;
      }
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1.2;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
          background-color: hotpink;
        }
      }
      .center {
        flex: 2;
      }
    }
  }
}
</style>
