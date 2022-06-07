import http from '@/http/http'
import { AddMenuModel } from './menuModel'

enum Api {
    getMenuList = '/api/sysUser/getMenuList',
    getTable = '/api/menu/list',
    getParent = '/api/menu/parent',
    add = '/api/menu',
    edit = '/api/menu',
    delete = '/api/menu'
}

export const getMenuListApi = async () => {
    return await http.get(Api.getMenuList)
}

export const getMenuTableApi = async () => {
    return await http.get(Api.getTable)
}

export const getParentApi = async () => {
    return await http.get(Api.getParent)
}
//新增
export const addMenuApi = async (params: AddMenuModel) => {
    return await http.post(Api.add, params)
}
//编辑
export const editMenuApi = async (params: AddMenuModel) => {
    return await http.put(Api.edit, params)
}
//删除
export const deleteMenuApi = async (id: number) => {
    return await http.delete(Api.delete, {id: id})
}