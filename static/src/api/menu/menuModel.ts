/**
 * 权限类型定义
 */
export interface AddMenuModel {
    id: number | string;
    editType: string; //新增、编辑
    type: string; //菜单类型 ： 0 目录 1 菜单  2 按钮
    parentId: number | string;
    parentName: string;
    label: string;
    icon: string;
    name: string;
    path: string;
    url: string;
    code: string;
    orderNum: number;
}

export interface MenuModel {
    id: string | number,
    parentId: string,
    parentName: string,
    label: string,
    code: string,
    path: string,
    name: string,
    url: string,
    orderNum: string | number,
    type: string,
    icon: string,
    remark: string,
    createTime: string,
    updateTime: string,
    children: Array<MenuModel>,
    value: string,
    open: boolean
}

//上级部门树选中的数据
export interface SelectNode {
    id: string | number;
    name: string;
}