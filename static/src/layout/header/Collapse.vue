<template>
  <el-icon @click="changeIcon" class="icons">
   <component :is="status ? Expand : Fold" />
  </el-icon>
</template>
<script setup lang='ts'>
import { computed} from 'vue'
import { Fold,Expand } from '@element-plus/icons-vue'
import { useCollapseStore } from '../../store/collapse'

const collapseStore = useCollapseStore()

const status = computed(()=>{
    return collapseStore.getCollapse
})
const changeIcon = ()=>{
    collapseStore.setCollapse(!status.value)
}
</script>
<style scoped lang='less'>
.icons{
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #303133;
  cursor: pointer;
  margin-right: 15px;
}
</style>