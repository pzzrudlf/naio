import { AddDeptModel } from "@/api/dept/deptModel"
import { reactive } from "vue"

/**
 * 部门模块基础数据
 */
export default function useBaseModel() {
    //表单验证规则
    const rules = reactive({
        parentName: [{
            required: true,
            message: '请选择上级部门',
            trigger: 'change'
        }],
        name: [{
            required: true,
            message: '请填写部门名称',
            trigger: 'change'
        }]
    })

    //表单绑定的数据
    const dialogModel = reactive<AddDeptModel>({
        type: '',
        id: '',
        pid: '',
        parentName: '',
        manager: '',
        deptAddress: '',
        deptPhone: '',
        name: '',
        deptCode: '',
        orderNum: ''
    })

    return {
        rules,
        dialogModel
    }
}
