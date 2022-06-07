<template>
  <el-main :style="{ height: mianHeight + 'px' }">
    <div style="display: flex;">
      <el-card style="flex: 1;">
        <template #header>
          <div class="card-header">
            <span>订单统计</span>
          </div>
        </template>
        <CommonEcharts :height="height" :options="options1"></CommonEcharts>
        <!-- <div ref="myChart" :style="{ width: '400px', height: '300px' }"></div> -->
      </el-card>
      <el-card style="margin-left: 20px;flex: 1;">
        <template #header>
          <div class="card-header">
            <span>订单统计</span>
          </div>
        </template>
        <CommonEcharts :height="height" :options="options2"></CommonEcharts>
        <!-- <div ref="myChart1" :style="{ width: '400px', height: '300px' }"></div> -->
      </el-card>
      <el-card style="margin-left: 20px;flex: 1;">
        <template #header>
          <div class="card-header">
            <span>订单统计</span>
          </div>
        </template>
        <CommonEcharts :height="height" :options="options3"></CommonEcharts>
        <!-- <div ref="myChart2" :style="{ width: '400px', height: '300px' }"></div> -->
      </el-card>
    </div>
  </el-main>
</template>
<script setup lang='ts'>
import { ref, nextTick, onMounted, reactive } from 'vue'
import CommonEcharts from '@/components/CommonEcharts/index.vue'
const mianHeight = ref(0)

//柱状图
const height = ref('300px')
let options1 = reactive({
  xAxis: {
    type: 'category' as 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value' as 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar' as 'bar'
    }
  ]
})

//饼图
let options2 = reactive({
  title: {
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie' as 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})

//环图
let options3 = reactive({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
})

onMounted(() => {
  nextTick(() => {
    mianHeight.value = window.innerHeight - 100
  })
})
</script>
<style scoped lang='less'>
</style>