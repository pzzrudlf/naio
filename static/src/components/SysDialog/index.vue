<template>
    <el-dialog :model-value="visible" :title="title" :before-close="onClose" append-to-body :width="width + 'px'">
        <div class="container" :style="{ height: height + 'px' }">
            <slot name="content" :item="'pzzrudlf'"></slot>
        </div>
        <template v-slot:footer>
            <span class="dialog-footer">
                <el-button type="danger" @click="onClose">Cancel</el-button>
                <el-button type="primary" @click="onConfirm">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang='ts'>
// import { defineProps, defineEmits } from 'vue'
const props = defineProps({
    title: {
        type: String,
        default: '标题'
    },
    visible: {
        type: Boolean,
        default: false
    },
    width: {
        type: Number,
        default: 600,
    },
    height: {
        type: Number,
        default: 250,
    }
})
const emit = defineEmits(['onClose', 'onConfirm'])

const onClose = () => {
    emit('onClose')
}
const onConfirm = () => {
    emit('onConfirm')
}

</script>
<style scoped lang='less'>
.container {
  overflow-x: initial;
  overflow-y: auto;
}
.el-dialog {
  border-top-left-radius: 7px !important;
  border-top-right-radius: 7px !important;
  .el-dialog__header {
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;
    background-color: #1890ff !important;
    .el-dialog__title {
      color: #fff;
      font-size: 16px;
      font-weight: 600;
    }
    .el-dialog__close {
      color: #fff;
    }
  }
  .el-dialog__body {
    padding: 10px;
  }
  .el-dialog__footer {
    border-top: 1px solid #e8eaec !important;
    padding: 10px;
  }
}
</style>