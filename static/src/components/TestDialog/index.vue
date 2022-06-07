<template>
    <el-button type="primary" size="default" @click="addBtn">新增</el-button>
    <SysDialog :title="dialog.title" :visible="dialog.visible" :width="dialog.width" :height="dialog.height"
        @onClose='onClose' @onConfirm='onConfirm'>
        <template v-slot:content="{ item }">
            弹框内容 {{ item }}
        </template>
    </SysDialog>
</template>
<script setup lang='ts'>
import { reactive } from 'vue'
import SysDialog from '../SysDialog/index.vue'
const dialog = reactive({
    title: '新增',
    height: 280,
    width: 630,
    visible: false
})
//按钮点击事件
const addBtn = () => {
    dialog.visible = true;
}
//弹框关闭
const onClose = () => {
    dialog.visible = false;
}
//弹框确定
const onConfirm = () => {
    dialog.visible = false;
}
</script>
