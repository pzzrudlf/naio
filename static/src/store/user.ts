import { defineStore } from 'pinia'
import { loginApi, getInfoApi } from '@/api/user/user'
import { Types } from './types'
import { LoginParam } from '@/api/user/userModel'
import { Result } from '@/http/request'
import { setToken as baseSetToken, setUserId, setExpireTime, getToken } from '@/utils/auth'


export type UserState = {
    token: string,
    userId: string | number,
    permissions: string[]
}

export const useUserStore = defineStore({
    id: Types.USER,
    state: (): UserState => {
        return {
            token: getToken() || '',
            userId: '',
            permissions: []
        }
    },
    // computed 修改state的值, 有缓存的
    getters: {
        getToken(): string {
            return this.token
        },
        getPermissions(): any[] {
            return this.permissions
        }
    },
    //既可以同步也可以异步，提交state
    actions: {
        setToken(token: string) {
            this.$state.token = token
        },
        setUserId(userId: string | number) {
            this.$state.userId = userId
        },
        login(userinfo: LoginParam) {
            return new Promise<Result>((resolve, reject) => {
                loginApi(userinfo).then((res) => {
                    // debugger
                    // res::
                    // {
                    //     error_code: 0,
                    //     access_token:
                    //     expires_in:
                    //     token_type:
                    //     msg: 'ok'
                    // }
                    if (res.data.code == 200) {
                        // 设置到pinia中
                        this.setToken(res.data.token)
                        this.setUserId((res.data.id))

                        //存储到sessionStorage
                        baseSetToken(res.data.token)
                        setUserId(res.data.id)
                        setExpireTime(res.data.expireTime)
                    }
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        //获取用户信息
        getInfo() {
            return new Promise((resolve, reject) => {
                getInfoApi().then(res => {
                    //设置权限
                    if (res.code == 200) {
                        this.setRoles(res.data.roles)
                    }
                    resolve(res.data)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        setRoles(roles: any[]) {
            this.$state.permissions = roles
        }
    },
    // 开启数据缓存，此处使用了pinia-plugin-persist插件
    // persist: {
    //     enabled: true,
    //     strategies: [
    //         {
    //             key: Types.USER,
    //             storage: localStorage,
    //             paths: ['token']
    //         }
    //     ]
    // }
})