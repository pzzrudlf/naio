export interface LoginParam {
    username: string;
    password: string;
    code: string
}

export interface LoginResult2 {
    error_code: number;
    access_token: string;
    expires_in: number;
    token_type: string;
    msg: string
}

/**
 * 登录返回值
 */
export interface LoginResult {
    code: number;
    token: string;
    id: number;
    expireTime: number
}

export interface UserInfo {
    avatar: string;
    id: string;
    introduction: string;
    name: string;
    roles: Array<string>
}

/**
 * 用户列表查询参数
 */
 export interface UserListParam{
    deptId:string | number;
    loginName:string;
    currentPage:number;
    pageSize:number;
    total:number;
}

/**
 * 表单提交的参数
 */
export interface AddUserModel{
    type:string;//add or edit
    id: string | number;
    deptId: string | number;
    deptName: string;
    loginName: string;
    mobile: string;
    nickName: string;
    email: string;
    username: string;
    password: string;
    sex: string;
}

export interface AssignRoleListParam{
    currentPage: number;
    pageSize: number;
    userId: string | number;
    total: number;
}

export interface SelectRoleParam{
    roleId:string | number;
    userId:string | number;
}