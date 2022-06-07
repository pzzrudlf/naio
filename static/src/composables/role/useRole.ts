import { AddRoleModel } from '@/api/role/RoleModel'
import { EditType } from '@/utils/baseEnum'
import { ref } from 'vue'
import { Result } from '@/http/request'
import { addRoleApi, deleteRoleApi, editRoleApi } from '@/api/role/role'
import useInstance from '@/hooks/useInstance'

export default function useRole(getRoleList: any) {

    const { global } = useInstance()

    //分配权限弹框的ref属性
    const assignMenuRef = ref<{show:(roleId:string,name:string)=>void}>()

    const addRoleRef = ref<{ show: (type: string, row?: AddRoleModel) => void }>()

    const addBtn = () => {
        addRoleRef.value?.show(EditType.ADD)
    }
    const editBtn = (row: AddRoleModel) => {
        addRoleRef.value?.show(EditType.EDIT, row)
    }
    const deleteBtn = async (id: number | string) => {
        console.log('role=>deleteBtn::',id)
        let param = {
            id: id
        }
        let confirm = await global.$myconfirm('确定删除该数据吗?')
        if (confirm) {
            let res = await deleteRoleApi(param)
            if (res && res.code == 200) {
                global.$message({ message: res.msg, type: 'success' })
                getRoleList()
            }
        }
    }
    const save = async (param: AddRoleModel) => {
        console.log('父组件接收的参数==>', param)
        let res: Result
        if (param.type == EditType.ADD) {
            res = await addRoleApi(param)
        } else {
            res = await editRoleApi(param)
        }
        if (res && res.code == 200) {
            //刷新列表
            getRoleList()
            //信息提示
            global.$message({ message: res.msg, type: 'success' })
        }
    }
    const assignPermission = (roleId: string, name: string) => {
        assignMenuRef.value?.show(roleId,name)
    }

    return {
        addBtn,
        editBtn,
        deleteBtn,
        save,
        assignPermission,
        addRoleRef,
        assignMenuRef
    }
}