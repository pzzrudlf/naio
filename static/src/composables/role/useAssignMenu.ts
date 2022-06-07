import { DialogModel } from '@/utils/baseType'
import { assignTreeApi, assignSaveApi } from '@/api/role/role'
import { AssignSaveParam, AssignTreeParam } from '@/api/role/roleModel'
import { reactive, ref } from 'vue'
import { getUserId } from '@/utils/auth'
import { ElTree } from 'element-plus'
import useInstance from '@/hooks/useInstance'

export default function useAssignMenu(dialog: DialogModel, onShow, onClose) {
    const { global } = useInstance()

    //权限树的ref属性
    const assignTree = ref<InstanceType<typeof ElTree>>()
    //树的属性配置
    const defaultProps = reactive({
        children: 'children',
        label: 'label',
    })
    //权限树数据
    const assignTreeData = reactive({
        list: [],
        assignTreeChecked: [] //原来分配的权限id的集合
    })
    //定义分配权限保存的参数
    const saveParam = reactive<AssignSaveParam>({
        roleId: '',
        list: []
    })
    //确定事件
    const confirm = async () => {
        //获取选中的数据
        let checkedIds = assignTree.value?.getCheckedKeys(false) || []
        //获取半节点ids
        let hlfIds = assignTree.value?.getHalfCheckedKeys() || []
        saveParam.list = checkedIds?.concat(hlfIds)
        //提交保存
        let res = await assignSaveApi(saveParam)
        if (res && res.code == 200) {
            //信息提示
            global.$message({ message: res.msg, type: 'success' })
            //关闭弹框
            onClose()
        }
    }
    //弹框展示
    const show = (roleId: string, name: string) => {
        //数据
        assignTreeData.list = []
        assignTreeData.assignTreeChecked = []
        //设置角色id
        saveParam.roleId = roleId
        const param = {
            roleId: roleId,
            userId: getUserId() || ''
        }
        //查询权限树的数据
        getAssignTree(param)
        //设置弹框的属性
        dialog.height = 420
        dialog.width = 300
        dialog.title = '为【' + name + '】分配权限'
        onShow()
    }
    //获取权限树数据
    const getAssignTree = async (param: AssignTreeParam) => {
        let res = await assignTreeApi(param)
        if (res && res.code == 200) {
            //设置权限树数据
            assignTreeData.list = res.data.listmenu
            //设置角色原来的权限Id
            assignTreeData.assignTreeChecked = res.data.checkList
            //数据回显，判断角色原来是否已经分配过权限，如果有，回显
            if (assignTreeData.assignTreeChecked.length > 0) {
                let newArr = []
                assignTreeData.assignTreeChecked.forEach((item => {
                    checked(item, assignTreeData.list, newArr)
                }))
                assignTreeData.assignTreeChecked = newArr
            }
        }
    }
    const checked = (id, data, newArr) => {
        data.forEach((item) => {
            if (item.id == id) {
                if (item.children && item.children.length == 0) {
                    newArr.push(item.id)
                }
            } else {
                if (item.children && item.children.length != 0) {
                    //递归调用
                    checked(id, item.children, newArr)
                }
            }
        })
    }
    return {
        confirm,
        show,
        assignTreeData,
        defaultProps,
        assignTree
    }
}