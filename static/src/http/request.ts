import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse } from "axios"
import { ElMessage } from "element-plus"
import { getToken } from "../utils/auth"
import qs from 'qs'

export interface Result<T = any> {
    error_code: number;
    code: number; //将要废弃使用
    msg: string;
    data: T;
}
export enum StatusCode{
    // NoAuth  = 40100, //token失效
    NoAuth  = 600, //token失效
    // Success = 0 //返回成功
    Success = 200 //返回成功
}
class request {
    private instance: AxiosInstance;
    constructor(config: AxiosRequestConfig) {
        //创建axios实例
        this.instance = axios.create(config)
        this.interceptors()
    }
    //axios拦截器
    private interceptors() {
        //请求发送之前拦截
        this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
            let token = getToken() || '';
            if (token) {
                //把token添加到请求头部
                config.headers = {
                    ...config.headers,
                    token: token
                };
            }
            //这里可以设置头部token携带到后端进行token的验证
            return config
        }, (error) => {
            // 错误抛到业务代码
            error.data = {}
            error.data.msg = '服务器异常，请联系管理员！'
            return error
        })

        /**
         * 请求返回之后拦截
         * res的类型是AxiosResponse<any>
         */
        this.instance.interceptors.response.use((res: AxiosResponse) => {
            if (res && res.data) {
                const data = res.data as any;
                if (data.code == StatusCode.NoAuth) {
                    //清空sessionStorage数据
                    sessionStorage.clear();
                    //跳到登录
                    window.location.href = "/login";
                    // return res;
                } else if (data.code == StatusCode.Success || res.config.responseType === "arraybuffer") {
                    // return Promise.resolve(res);
                    return res;
                } else { // 这里我们在服务端将正确返回的状态码标为200
                    console.log('88889999')
                    ElMessage.error(data.msg || '服务器出错!')
                    return res || null // 返回数据
                }
            }

        }, (error) => { // 这里是遇到报错的回调
            console.log('进入错误')
            error.data = {};
            if (error && error.response) {
                switch (error.response.status) {
                    case 400:
                        error.data.msg = '错误请求';
                        ElMessage.error(error.data.msg)
                        break
                    case 401:
                        error.data.msg = '未授权，请重新登录';
                        ElMessage.error(error.data.msg)
                        break
                    case 403:
                        error.data.msg = '拒绝访问';
                        ElMessage.error(error.data.msg)
                        break
                    case 404:
                        error.data.msg = '请求错误,未找到该资源';
                        ElMessage.error(error.data.msg)
                        break
                    case 405:
                        error.data.msg = '请求方法未允许';
                        ElMessage.error(error.data.msg)
                        break
                    case 408:
                        error.data.msg = '请求超时';
                        ElMessage.error(error.data.msg)
                        break
                    case 500:
                        error.data.msg = '服务器端出错';
                        ElMessage.error(error.data.msg)
                        break
                    case 501:
                        error.data.msg = '网络未实现';
                        ElMessage.error(error.data.msg)
                        break
                    case 502:
                        error.data.msg = '网络错误';
                        ElMessage.error(error.data.msg)
                        break
                    case 503:
                        error.data.msg = '服务不可用';
                        ElMessage.error(error.data.msg)
                        break
                    case 504:
                        error.data.msg = '网络超时';
                        ElMessage.error(error.data.msg)
                        break
                    case 505:
                        error.data.msg = 'http版本不支持该请求';
                        ElMessage.error(error.data.msg)
                        break
                    default:
                        error.data.msg = `连接错误${error.response.status}`;
                        ElMessage.error(error.data.msg)
                }
            } else {
                error.data.msg = "连接到服务器失败";
                ElMessage.error(error.data.msg)
            }
            // return Promise.reject(error)
            return error
        })
    }
    getParms(parms: any): string {
        let _params = "";
        if (Object.is(parms, undefined || null)) {
            _params = ''
        } else {
            for (const key in parms) {
                if (parms.hasOwnProperty(key) && parms[key]) {
                    _params += `${parms[key]}/`
                }
            }
        }
        //去掉参数最后一位/
        if (_params) _params = _params.substr(0, _params.length - 1);
        return _params;
    }
    /**
     *  http://localhost:8089/api/user/getUserById?userId=10
     * @param url   /api/user/getUserById
     * @param parms  {userId:10}
     * @returns 
     */
    get<T = any>(url: string, parms?: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.get<T>(url, {
                params: parms,
                paramsSerializer: (parms) => {
                    return qs.stringify(parms)
                }
            }).then((res) => {
                resolve(res.data as any)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    getRestApi<T = any>(url: string, parms?: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.get<T>(this.getParms(parms) ? `${url}/${this.getParms(parms)}` : url)
                .then((res) => {
                    resolve(res.data as any)
                }).catch((error) => {
                    reject(error)
                })
        })
    }

    post<T = any>(url: string, parms: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.post<T>(url, parms, {
                transformRequest: [(params) => {
                    return JSON.stringify(params)
                }],
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                resolve(res.data as any)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    put<T = any>(url: string, parms: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.put<T>(url, parms, {
                transformRequest: [(params) => {
                    return JSON.stringify(params)
                }],
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                resolve(res.data as any)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    delete<T = any>(url: string, parms: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.delete<T>(this.getParms(parms) ? `${url}/${this.getParms(parms)}` : url)
                .then((res) => {
                    resolve(res.data as any)
                }).catch((error) => {
                    reject(error)
                })
        })
    }

    login<T = any>(url: string, params: any): Promise<Result<T>> {
        return new Promise((resolve, reject) => {
            this.instance.post<T>(url, params, {
                transformRequest: [(params) => {
                    return qs.stringify(params)
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((res) => {
                resolve(res as any)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    
    getImage(url: string) {
        return this.instance.post(url, null, {
            responseType: 'arraybuffer'
        })
    }

}
export default request