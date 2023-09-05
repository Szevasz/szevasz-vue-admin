<template>
  <div class="box4" ref="map">我是地图组件</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
//引入中国地图的JSON数据
import chinaJSON from './china.json'
//获取DOM元素
let map = ref()
//注册中国地图
echarts.registerMap('china', chinaJSON as any)
onMounted(() => {
  let mychart = echarts.init(map.value)
  //设置配置项
  mychart.setOption({
    //地图组件
    geo: {
      map: 'china',
      show: true,
      roam: true,
      label: {
        emphasis: {
          show: false,
        },
      },
      layoutSize: '100%',
      itemStyle: {
        normal: {
          borderColor: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: '#00F6FF',
              },
              {
                offset: 1,
                color: '#53D9FF',
              },
            ],
            false,
          ),
          borderWidth: 3,
          shadowColor: 'rgba(10,76,139,1)',
          shadowOffsetY: 0,
          shadowBlur: 60,
        },
      },
    },
    series: [
      {
        type: 'map',
        map: 'china',
        aspectScale: 0.75,
        //zoom:1.1,
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          },
        },
        itemStyle: {
          normal: {
            areaColor: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#073684', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#061E3D', // 100% 处的颜色
                },
              ],
            },
            borderColor: '#215495',
            borderWidth: 1,
          },
          emphasis: {
            areaColor: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#073684', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#061E3D', // 100% 处的颜色
                },
              ],
            },
          },
        },
        // data: outdata,
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        rippleEffect: {
          brushType: 'stroke',
        },
        showEffectOn: 'render',
        itemStyle: {
          normal: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(5,80,151,0.2)',
                },
                {
                  offset: 0.8,
                  color: 'rgba(5,80,151,0.8)',
                },
                {
                  offset: 1,
                  color: 'rgba(0,108,255,0.7)',
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      },
    ],
  })
})
</script>

<style scoped></style>
