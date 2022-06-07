<template>
    <el-main>
        <!-- 搜索栏 -->
        <el-form :model="listParam" label-width="80px" :inline="true" size="small">
            <el-form-item>
                <el-input placeholder="请输入角色名称" v-model="listParam.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :icon="Search" @click="searchBtn">搜索</el-button>
                <el-button :icon="Close" style="color: #FF7670;" @click="resetBtn">重置</el-button>
                <el-button v-permission="['sys:role:add']" type="primary" :icon="Plus" @click="addBtn">新增</el-button>
            </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :height="tableHeight" :data="roleTable.list" border stripe>
            <el-table-column prop="name" label="角色名称"></el-table-column>
            <el-table-column prop="remark" label="角色备注"></el-table-column>
            <el-table-column label="操作" align="center" width="300">
                <template #default="scope">
                    <el-button type="primary" size="small" :icon="Edit" v-permission="['sys:role:edit']" @click="editBtn(scope.row)">编辑</el-button>
                    <el-button type="primary" size="small" :icon="Setting" v-permission="['sys:role:assign']" @click="assignPermission(scope.row.id, scope.row.name)">分配权限</el-button>
                    <el-button type="danger" size="small" :icon="Delete" v-permission="['sys:role:delete']" @click="deleteBtn(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="sizeChange" @current-change="currentChange"
            :current-page.sync="listParam.currentPage" :page-sizes="[10, 20, 40, 80, 100]"
            :page-size="listParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listParam.total"
            background></el-pagination>
    </el-main>
    <!-- 新增、编辑 -->
    <AddRole ref='addRoleRef' @save="save"></AddRole>
    <!-- 分配权限弹框 -->
    <AssignMenu ref="assignMenuRef"></AssignMenu>
</template>
<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { Search, Close, Plus, Delete, Edit, Setting } from '@element-plus/icons-vue'
import useRoleTable from '@/composables/role/useRoleTable'
import useRole from '@/composables/role/useRole'
import AddRole from './AddRole.vue'
import AssignMenu from './AssignMenu.vue'

//表格高度
const tableHeight = ref(0)
//表格列表
const { listParam, roleTable, getRoleList, sizeChange, currentChange, searchBtn, resetBtn } = useRoleTable()
//新增、编辑
const { addBtn, editBtn, deleteBtn, save, assignPermission, addRoleRef, assignMenuRef } = useRole(getRoleList)

onMounted(() => {
    nextTick(() => {
        tableHeight.value = window.innerHeight - 220
    })
})
</script>