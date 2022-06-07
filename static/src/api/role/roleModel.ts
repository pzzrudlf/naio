/**
 * 角色列表查询参数
 */
export interface RoleListParam {
    userId: string | number;
    currentPage: number;
    pageSize: number;
    name: string;
    total: number;
}

/**
 * 角色类型定义
 */
export interface AddRoleModel {
    id: number | string;
    name: string;
    remark: string;
    createUser: string | number;
    type: string; //新增、编辑
}

export interface DeleteParam {
    id: number | string;
}

/**
 * 分配权限树数据查询参数
 */
export interface AssignTreeParam{
    userId:number | string;
    roleId:number | string;
}
/**
 * 分配权限保存参数
 */
export interface AssignSaveParam{
    roleId:string | number;
    list:Array<string | number>
}