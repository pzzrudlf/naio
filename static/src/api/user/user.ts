import { AddUserModel, AssignRoleListParam, SelectRoleParam, LoginParam, LoginResult, UserInfo, UserListParam } from "./userModel"
import http from '../../http/http'


enum Api {
    getImg = '/api/sysUser/image',
    // login = '/api/auth/login',
    login = '/api/user/login',
    // getInfo = '/api/auth/info'
    getInfo = '/api/sysUser/getInfo',
    getLeftTree = '/api/department/list',
    getUserList = '/api/user/list',
    addAndEditUser = '/api/user',
    loginOut = '/api/sysUser/loginOut',
    getRoleList = '/api/user/getRolistForAssign',
    getRoleId = '/api/user/getRoleIdByUserId',
    assignSave = '/api/user/assingRole',
}

//登录
export async function loginApi(param: LoginParam) {
    let temp = {
        mobile: param.username,
        password: param.password
    }
    return await http.login<LoginResult>(Api.login, param)
}

//获取验证码
export async function getImageApi() {
    return await http.getImage(Api.getImg)
}

//获取用户信息
export const getInfoApi = async () => {
    return await http.get<UserInfo>(Api.getInfo)
}

//获取用户部门树
export const getLeftTreeApi = async () => {
    return await http.get(Api.getLeftTree)
}

//获取用户列表
export const getUserListApi = async (param: UserListParam) => {
    return await http.get(Api.getUserList, param)
}

export const addUserApi = async (param: AddUserModel) => {
    return await http.post(Api.addAndEditUser, param)
}

export const editUserApi = async (param: AddUserModel) => {
    return await http.put(Api.addAndEditUser, param)
}

export const deleteUserApi = async(param)=>{
    return await http.delete(Api.addAndEditUser, param)
}

export const loginOutApi = async(param)=>{
    return await http.post(Api.loginOut, param)
}

export const getRoleListApi = async(param: AssignRoleListParam)=>{
    return await http.get(Api.getRoleList, param)
}

export const getRoleIdApi = async(userId: number | string)=>{
    return await http.getRestApi(Api.getRoleId, { userId: userId})
}

export const assingRoleSaveApi = async(param: SelectRoleParam)=>{
    return await http.post(Api.assignSave, param)
}