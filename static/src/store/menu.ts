import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { getMenuListApi } from '../api/menu/menu'
import { Types } from './types'
import Layout from '@/layout/Index.vue'

const modules = import.meta.glob('../views/**/*.vue')

export type MenuState = {
    count: number,
    collapse: boolean,
    menuList: any
}

export const useMenuStore = defineStore({
    id: Types.MENU,
    state: (): MenuState => {
        return {
            count: 0,
            collapse: false,
            menuList: [
                {
                    path: '/dashboard',
                    component: "Layout",
                    meta: {
                        title: "首页",
                        icon: "HomeFilled",
                        roles: ["sys:manage"]
                    },
                    children: []
                }
            ]
        }
    },
    getters: {
        getMenuList(): any {
            return this.menuList;
        },
    },
    actions: {
        setCount(count: number){
            this.count = count
        },
        setCollapse(collapse: boolean){
            this.collapse = collapse
        },
        setMenuList(routes: Array<RouteRecordRaw>) {
            this.menuList = this.menuList.concat(routes)
        },
        getMenuListActions(router: any) {
            return new Promise((resolve, reject) => {
                //存的是有权限的路由，是一个数组
                getMenuListApi().then(res => {
                    let accessedRoutes: RouteRecordRaw[] = [];
                    if (res.code == 200) {
                        // console.log('res.data',res.data)
                        accessedRoutes = filterAsyncRoutes(res.data, router)
                    }
                    this.setMenuList(accessedRoutes)
                    resolve(accessedRoutes)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
})

/*
                        {
                            "msg": "获取成功",
                            "code": 200,
                            "data": [
                                {
                                    "path": "/system",
                                    "component": "Layout",
                                    "name": "system",
                                    "meta": {
                                        "title": "系统管理",
                                        "icon": "Setting",
                                        "roles": [
                                            "sys:manage"
                                        ]
                                    },
                                    "children": [
                                        {
                                            "path": "/department",
                                            "component": "/system/department/department",
                                            "name": "department",
                                            "meta": {
                                                "title": "机构管理",
                                                "icon": "List",
                                                "roles": [
                                                    "sys:dept"
                                                ]
                                            }
                                        },
                                        {
                                            "path": "/userList",
                                            "component": "/system/User/UserList",
                                            "name": "userList",
                                            "meta": {
                                                "title": "用户管理",
                                                "icon": "UserFilled",
                                                "roles": [
                                                    "sys:user"
                                                ]
                                            }
                                        },
                                        {
                                            "path": "/roleList",
                                            "component": "/system/Role/RoleList",
                                            "name": "roleList",
                                            "meta": {
                                                "title": "角色管理",
                                                "icon": "Wallet",
                                                "roles": [
                                                    "sys:role"
                                                ]
                                            }
                                        },
                                        {
                                            "path": "/menuList",
                                            "component": "/system/Menu/MenuList",
                                            "name": "menuList",
                                            "meta": {
                                                "title": "权限管理",
                                                "icon": "Menu",
                                                "roles": [
                                                    "sys:menu"
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    "path": "/test3parent",
                                    "component": "Layout",
                                    "name": "test3parent",
                                    "redirect": "/test3",
                                    "meta": {
                                        "title": "测试1-1-1",
                                        "icon": "ShoppingBag",
                                        "roles": [
                                            "sys:test"
                                        ]
                                    },
                                    "children": [
                                        {
                                            "path": "/test3",
                                            "component": "/test/test3",
                                            "name": "test3",
                                            "meta": {
                                                "title": "测试1-1-1",
                                                "icon": "ShoppingBag",
                                                "roles": [
                                                    "sys:test"
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    "path": "/goods",
                                    "component": "Layout",
                                    "name": "goods",
                                    "meta": {
                                        "title": "商品管理",
                                        "icon": "Tickets",
                                        "roles": [
                                            "sys:goods"
                                        ]
                                    },
                                    "children": [
                                        {
                                            "path": "/phone1",
                                            "name": "phone1",
                                            "meta": {
                                                "title": "手机分类",
                                                "icon": "UserFilled",
                                                "roles": [
                                                    "sys:phoneRoot"
                                                ]
                                            },
                                            "children": [
                                                {
                                                    "path": "/phone",
                                                    "component": "/phone/index",
                                                    "name": "phone",
                                                    "meta": {
                                                        "title": "华为手机",
                                                        "icon": "UserFilled",
                                                        "roles": [
                                                            "sys:phone:index"
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            "path": "/goodCategory",
                                            "component": "/goods/goodsCategory/goodsCategoryList",
                                            "name": "goodCategory",
                                            "meta": {
                                                "title": "分类管理",
                                                "icon": "ShoppingBag",
                                                "roles": [
                                                    "sys:goodsCategory"
                                                ]
                                            }
                                        },
                                        {
                                            "path": "/test2",
                                            "name": "test",
                                            "meta": {
                                                "title": "分类测试",
                                                "icon": "ShoppingBag",
                                                "roles": [
                                                    "sys:1"
                                                ]
                                            },
                                            "children": [
                                                {
                                                    "path": "/cs1",
                                                    "component": "/cs1/index",
                                                    "name": "cs1",
                                                    "meta": {
                                                        "title": "测试1-2",
                                                        "icon": "Menu",
                                                        "roles": [
                                                            "sys:cs1"
                                                        ]
                                                    },
                                                    "children": [
                                                        {
                                                            "path": "/cs2",
                                                            "component": "/test/test2",
                                                            "name": "cs2",
                                                            "meta": {
                                                                "title": "测试1-2-1",
                                                                "icon": "Menu",
                                                                "roles": [
                                                                    "sys:cs2"
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    "path": "/test",
                                                    "component": "/test/test",
                                                    "name": "test",
                                                    "meta": {
                                                        "title": "测试1-1",
                                                        "icon": "ShoppingBag",
                                                        "roles": [
                                                            "sys:1-1"
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "path": "/systenConfig",
                                    "component": "Layout",
                                    "name": "systenConfig",
                                    "meta": {
                                        "title": "系统工具",
                                        "icon": "ChatLineSquare",
                                        "roles": [
                                            "sys:systenConfig"
                                        ]
                                    },
                                    "children": [
                                        {
                                            "path": "/document",
                                            "component": "/system/config/systemDocument",
                                            "name": "http://42.193.158.170:8089/swagger-ui/index.html",
                                            "meta": {
                                                "title": "接口文档",
                                                "icon": "DocumentCopy",
                                                "roles": [
                                                    "sys:document"
                                                ]
                                            }
                                        },
                                        {
                                            "path": "/systemCode",
                                            "component": "/system/config/code",
                                            "name": "systemCode",
                                            "meta": {
                                                "title": "日志管理",
                                                "icon": "Operation",
                                                "roles": [
                                                    "sys:systemCode"
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
*/
export function filterAsyncRoutes(routes: RouteRecordRaw[], router: any) {
    const res: Array<RouteRecordRaw> = []
    //循环每一个路由
    routes.forEach((route: any) => {
        const tmp = { ...route }
        const component = tmp.component;
        if (route.component) {
            if (component == 'Layout') {
                tmp.component = Layout;
            } else {
                // console.log(component)
                tmp.component = modules[`../views${component}.vue`]
            }
        }
        //判断是否有下级
        if (tmp.children) {
            tmp.children = filterAsyncRoutes(tmp.children, router)
        }
        // console.log(tmp)
        router.addRoute(tmp)
        res.push(tmp)
    })
    console.log(res)
    return res
}