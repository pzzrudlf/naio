import { getRoleListApi } from '@/api/role/role'
import { RoleListParam } from '@/api/role/RoleModel'
import { getUserId } from '@/utils/auth'
import { onMounted, reactive } from 'vue'

export default function useRoleTable() {
    //表格数据
    const roleTable = reactive({
        list: []
    })
    //表格查询参数
    const listParam = reactive<RoleListParam>({
        userId: getUserId() || '',
        currentPage: 1,
        pageSize: 10,
        name: '',
        total:0
    })

    const getRoleList = async () => {
        let res = await getRoleListApi(listParam)
        if (res && res.code == 200) {
            roleTable.list = res.data.records
            listParam.total = res.data.total
        }
    }

    onMounted(() => {
        getRoleList()
    })

    //搜索按钮
    const searchBtn = () => {
        getRoleList()
    }
    //重置按钮
    const resetBtn = () => {
        listParam.name = ''
        getRoleList()
    }
    //页容量改变触发
    const sizeChange = (size: number) => {
        listParam.pageSize = size
        getRoleList()
    }
    //页数改变触发
    const currentChange = (page: number) => {
        listParam.currentPage = page
        getRoleList()
    }

    return {
        roleTable,
        listParam,
        getRoleList,
        searchBtn,
        resetBtn,
        sizeChange,
        currentChange
    }
}