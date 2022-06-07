<template>
    <SysDialog :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible"
        @onClose="onClose" @onConfirm="confirm">
        <template v-slot:content>
            <!-- 角色列表 -->
            <el-table size='small' :height="tableHeight" :data="roleList.list" border stripe>
                <el-table-column width="50" align="center" label="选择">
                    <template #default="scope">
                        <el-radio v-model="selectRoleId" :label="scope.row.id" @change="getSelectRole(scope.row)">{{ ""
                        }}</el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="角色名称"></el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="sizeChange" @current-change="currentChange"
                :current-page.sync="param.currentPage" :page-sizes="[10, 20, 40, 80, 100]" :page-size="param.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="param.total" background></el-pagination>
        </template>
    </SysDialog>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog/index.vue'
import useDialog from '@/hooks/useDialog'
import useAssignRole from '@/composables/user/useAssignRole'

//弹框属性
const { dialog, onClose, onShow } = useDialog()

const { confirm, show, roleList, param, sizeChange, currentChange, tableHeight, selectRoleId, getSelectRole } = useAssignRole(dialog, onClose, onShow)

//暴露方法
defineExpose({
    show
})
</script>