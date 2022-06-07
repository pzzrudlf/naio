import { getMenuTableApi } from "@/api/menu/menu"
import { onMounted, reactive } from 'vue'

export default function useMenuTable(){
    const menuTable = reactive({
        list: []
    })

    const getMenuTable = async()=>{
        let res = await getMenuTableApi()
        if(res && res.code == 200){
            menuTable.list = res.data
        }
    }
    onMounted(()=>{
        getMenuTable()
    })

    return {
        menuTable,
        getMenuTable
    }
}