<template>
    <el-main>
        <!-- 搜索栏 -->
        <el-form :model="searchForm" :rules="rules" label-width="80px" :inline="true" size="small">
            <el-form-item>
                <el-input v-model="searchForm.searchName" placeholder="请输入部门名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :icon="Search" @click="searchBtn">查询</el-button>
                <el-button :icon="Close" @click="resetBtn">重置</el-button>
                <el-button size="small" type='primary' :icon="Plus" @click="addBtn">新增</el-button>
            </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :height="tableHeight" :data="tableData.list" style="width: 100%" row-key="id" default-expand-all size="medium" border
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
            <el-table-column prop="name" label="部门名称" />
            <el-table-column prop="deptCode" label="部门编码" />
            <el-table-column prop="deptPhone" label="部门电话" />
            <el-table-column width='200' align='center' label="操作">
                <template #default="scope">
                    <el-button size="small" type="success" :icon="Edit" @click="editBtn(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" :icon="Close" @click="deleteBtn(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-main>
    <addAndEdit ref="addAndEditDeptRef" @save="save"></addAndEdit>
</template>
<script setup lang="ts">
import { Edit, Close, Plus, Search } from '@element-plus/icons-vue'
import useBaseModel from '@/composables/department/useBaseModel'
import useDeptTable from '@/composables/department/useDeptTable'
import useDept from '@/composables/department/useDept'
import addAndEdit from './addAndEdit.vue'
// 基础数据
const { rules } = useBaseModel()
// 表格列表
const { searchForm, tableData, tableHeight, getDeptList } = useDeptTable()
// 表格的操作 搜索、重置、新增、编辑、删除
const { searchBtn, resetBtn, addBtn, editBtn, deleteBtn, save, addAndEditDeptRef } = useDept(getDeptList, searchForm)

</script>