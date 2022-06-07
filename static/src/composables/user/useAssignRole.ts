import { ref, reactive, onMounted, nextTick } from 'vue'
import { getUserId } from '@/utils/auth'
import useInstance from '@/hooks/useInstance'
import { DialogModel } from '@/utils/baseType'
import { AssignRoleListParam } from '@/api/user/userModel'
import { getRoleListApi, getRoleIdApi, assingRoleSaveApi } from '@/api/user/user'

export default function useAssignRole(dialog: DialogModel, onClose, onShow) {
    const { global } = useInstance()
    //表格高度
    const tableHeight = ref(0)
    //被分配角色的用户id
    const selecUserId = ref<string | number>('')
    //选择的角色id
    const selectRoleId = ref('')
    //确定
    const confirm = async () => {
        if(!selectRoleId.value){
            global.$message({ message: '请选择角色', type: 'warning' })
            return;
        }
        let parm = {
            roleId: selectRoleId.value,
            userId: selecUserId.value
        }
        console.log(parm)
        let res = await assingRoleSaveApi(parm)
        if (res && res.code == 200) {
            global.$message({ message: '分配成功', type: 'success' })
            //关闭弹框
            onClose()
        }
    }
    //展示弹框
    const show = async (name: string, userId: string | number) => {
        selecUserId.value = userId
        selectRoleId.value = ''
        //查询该用户原来的角色id
        let res = await getRoleIdApi(userId)
        if (res && res.data) {
            selectRoleId.value = res.data.roleId
        }
        //设置弹框标题
        dialog.title = '为【' + name + '】分配角色'
        onShow()
    }
    //角色列表查询参数
    const param = reactive<AssignRoleListParam>({
        currentPage: 1,
        pageSize: 4,
        userId: getUserId() || '',
        total: 0
    })
    //角色列表数据
    const roleList = reactive({
        list: []
    })
    //获取列表的数据
    const getRoleList = async () => {
        let res = await getRoleListApi(param)
        if (res && res.code == 200) {
            roleList.list = res.data.records
            param.total = res.data.total
        }
    }
    onMounted(() => {
        nextTick(() => {
            tableHeight.value = window.innerHeight - 400
        })
        getRoleList()
    })
    //页容量改变时触发
    const sizeChange = (size: number) => {
        param.pageSize = size
        getRoleList()
    }
    //页数改变时触发
    const currentChange = (page: number) => {
        param.currentPage = page
        getRoleList()
    }
    //单选按钮点击事件
    const getSelectRole = (row: any) => {
        console.log(row)
        //设置选中的角色id
        selectRoleId.value = row.id
    }
    return {
        confirm,
        show,
        param,
        roleList,
        sizeChange,
        currentChange,
        tableHeight,
        selectRoleId,
        getSelectRole
    }
}