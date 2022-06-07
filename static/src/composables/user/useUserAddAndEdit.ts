import { SelectNode } from '@/api/dept/deptModel'
import { AddUserModel } from '@/api/user/userModel'
import { EditType, Title } from '@/utils/baseEnum'
import { DialogModel } from '@/utils/baseType'
import { ElForm } from 'element-plus'
import { ref } from 'vue'
import useInstance from '@/hooks/useInstance'

export default function useUserAddAndEdit(dialog: DialogModel, onShow: any, onClose: any, addModel: AddUserModel, emit: any) {

    const { global } = useInstance()

    const addUserForm = ref<InstanceType<typeof ElForm>>()

    const confirm = () => {
        addUserForm.value?.validate((valid) => {
            if (valid) {
                emit('save', addModel)
                //close dialog
                onClose()
            }
        })
    }

    const show = (type: string, row: AddUserModel) => {
        type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
        onShow()
        //清空表单
        global.$resetForm(addUserForm.value, addModel)
        //如果是编辑，要把编辑的数据复制到表单绑定的model里面
        if (type == EditType.EDIT) {
            global.$objCopy(row, addModel)
        }
        //设置是新增还是编辑
        addModel.type = type
    }

    //选中上级的数据
    const select = (node: SelectNode) => {
        addModel.deptId = node.id
        addModel.deptName = node.name
        console.log(addModel)
    }

    return {
        confirm, show, addUserForm, select
    }
}