<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in tabs">{{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang='ts'>
import { ref, Ref, watch} from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router';
const tabs: Ref<RouteLocationMatched[]> = ref([])
const route = useRoute()
const getBredCrumb = ()=>{
    let matched = route.matched.filter(item=>item.meta&&item.meta.title)
    //token不存在 , 跳转的时候，需要注意 BredCurm.vue里面判断first
    const first = matched[0]
    if (first.path !== '/dashboard') {
        matched = [{path:'/dashboard',meta: {title:'首页'}} as any].concat(matched)
    }
    tabs.value = matched
}
getBredCrumb()
watch(()=>route.path, ()=>getBredCrumb())
</script>
<style scoped lang='less'>
</style>