<template>
    <SysDialog :title="dialog.title" :visible="dialog.visible" :height="dialog.height" :width="dialog.width"
        @onClose='onClose' @onConfirm='confirm'>
        <template v-slot:content>
            <!-- 
                :model 表单绑定的对象
                :ref 相当于div的id，是唯一的
                :rules 表单验证规则
                 -->
            <el-form :model="dialogModel" ref="addAndEditDeptForm" :rules="rules" label-width="80px" :inline="false"
                size="small">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="parentName" label="上级部门">
                            <el-input type='hidden' v-model="dialogModel.pid"></el-input>
                            <el-input @click="selectParent" v-model="dialogModel.parentName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="name" label="部门名称">
                            <el-input v-model="dialogModel.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="deptCode" label="部门编码">
                            <el-input v-model="dialogModel.deptCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="deptPhone" label="部门电话">
                            <el-input v-model="dialogModel.deptPhone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="manager" label="部门经理">
                            <el-input v-model="dialogModel.manager"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="deptAddress" label="部门地址">
                            <el-input v-model="dialogModel.deptAddress"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="orderNum" label="部门序号">
                            <el-input v-model="dialogModel.orderNum"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

        </template>
    </SysDialog>
    <!-- 上级部门的弹框 -->
    <parent ref="parentRef" @select="select"></parent>
</template>
<script setup lang='ts'>
import { ref } from 'vue'
import SysDialog from '@/components/SysDialog/index.vue'
import parent from './parent.vue'
import useDialog from '@/hooks/useDialog'
import { EditType, Title } from '@/utils/BaseEnum'
import useBaseModel from '@/composables/department/useBaseModel'
import useSelectParent from '@/composables/department/useSelectParent'
import { DeptModel, SelectNode } from '@/api/dept/deptModel'
import { ElForm } from 'element-plus'
import useInstance from '@/hooks/useInstance'

//全局挂载
const { global } = useInstance()

//基础数据
const { rules, dialogModel } = useBaseModel()

//弹框
const { dialog, onClose, onShow } = useDialog()

//表单的ref属性
const addAndEditDeptForm = ref<InstanceType<typeof ElForm>>()

//注册事件
const emit = defineEmits(['save'])
//弹框确定返回表单值给父组件
const confirm = () => {
    addAndEditDeptForm.value?.validate(valid => {
        if (valid) {
            //返回值
            emit('save', dialogModel)
            //关闭弹框
            onClose()
        }
    })
    // //返回值
    // emit('save', dialogModel)
    //关闭弹框
    // onClose()
}

//父组件调用子组件展示弹框
const show = (type: string, row?: DeptModel) => {
    dialog.width = 650
    dialog.height = 250
    //设置弹框的标题
    type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
    //显示弹框
    onShow()
    //清除表单旧数据
    global.$resetForm(addAndEditDeptForm.value, dialogModel)
    if (EditType.EDIT == type) {
        global.$objCopy(row, dialogModel)
    }

    //设置type
    dialogModel.type = type
}

defineExpose({
    show
})

//上级部门
const { parentRef, selectParent } = useSelectParent()

//选中上级的数据
const select = (node: SelectNode) => {
    console.log('父组件取到', node)
    dialogModel.pid = node.id
    dialogModel.parentName = node.name
}

</script>