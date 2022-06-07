import { getParentApi } from '@/api/menu/menu'
import { SelectNode } from '@/api/menu/menuModel'
import { MenuModel } from '@/api/menu/menuModel'
import { reactive } from 'vue'

export default function useMenuParent() {
    //上级树的数据
    const treeData = reactive({
        data: []
    })
    //选中的数据
    const selectNode = reactive<SelectNode>({
        id: '',
        name: ''
    })
    //树的属性
    const defaultProps = reactive({
        children: 'children', //设置树的children,后台api返回的json中的字段名
        label: 'label' //设置树的名字，后台api返回的json中的字段名
    })
    //树的点击事件
    const handleNodeClick = (data: MenuModel)=>{
        selectNode.id = data.id
        selectNode.name = data.label 
        console.log(selectNode)
    }
    //获取树的数据
    const getTreeData = async ()=>{
        let res = await getParentApi()
        if(res && res.code == 200){
            treeData.data = res.data
        }
    }
    return {
        treeData,
        selectNode,
        defaultProps,
        handleNodeClick,
        getTreeData
    }
}