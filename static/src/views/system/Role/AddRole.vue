<template>
    <SysDialog :title="dialog.title" :width="dialog.width" :visible="dialog.visible" :height="dialog.height"
        @onClose='onClose' @onConfirm='confirm'>
        <template v-slot:content>
            <el-form :model="addRoleModel" ref="addRoleForm" :rules="rules" label-width="80px" :inline="false"
                size="normal">
                <el-row :gutter="20">
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="name" label="角色名称">
                            <el-input v-model="addRoleModel.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item label="角色备注">
                            <el-input v-model="addRoleModel.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </template>
    </SysDialog>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog/index.vue'
import useDialog from '@/hooks/useDialog'
import useAddRole from '@/composables/role/useAddRole'

//弹框属性
const { dialog, onClose, onShow } = useDialog()

const emit = defineEmits(['save'])
const { confirm, show, addRoleModel, rules, addRoleForm } = useAddRole(dialog, onClose, onShow, emit)

//暴露方法
defineExpose({
    show
})
</script>