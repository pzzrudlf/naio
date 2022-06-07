import { createApp, createVNode } from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import { useUserStore } from '@/store/user'
import { useMenuStore } from '@/store/menu'
import { getToken, cleanSession } from '@/utils/auth'
//初始化样式
import '@/styles/index.less'
const app = createApp(App)
app.use(store).use(router)

//element-plus分页器中文显示
// import 'element-plus/dist/index.css'
// import ElementPlus from 'element-plus'
// import locale from 'element-plus/lib/locale/lang/zh-cn'
// app.use(ElementPlus, { locale })

//permission
import { permission } from '@/directives/permission'
app.directive('permission', permission)
//挂载工具
//引入echarts
import * as echarts from 'echarts'
import resetForm from '@/utils/resetform'
import objCopy from '@/utils/objcopy'
import myconfirm from '@/utils/myconfirm'

import * as ElementPlusIcons from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$resetForm = resetForm
app.config.globalProperties.$objCopy = objCopy
app.config.globalProperties.$myconfirm = myconfirm
app.config.globalProperties.$message = ElMessage
// //Icon全局组件
const Icon = (props: { icon: string }) => {
    const { icon } = props;
    return createVNode(ElementPlusIcons[icon as keyof typeof ElementPlusIcons])
};
app.component('Icon', Icon)

// for (const [key, component] of Object.entries(ElementPlusIcons)) {
//     app.component(key, component)
// }

app.mount('#app')
//权限验证
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
    //必须放beforeEach中
    const userStore = useUserStore()
    const menuStore = useMenuStore()
    let token = getToken()
    if (token) { //token存在
        if (to.path === '/login' || to.path === '/') {
            next({ path: '/' })
        } else {
            let hasRoles = userStore.$state.permissions && userStore.$state.permissions.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    await userStore.getInfo()
                    await menuStore.getMenuListActions(router)
                    //确保动态添加的路由已经被完全加载上去
                    next({ ...to, replace: true })
                } catch (error) {
                    //重置token
                    cleanSession()
                    //跳到登录
                    next({ path: '/login' })
                }
            }
        }
    } else { //token不存在 , 跳转的时候，需要注意 BredCurm.vue里面判断first
        //判断是否存在白名单中
        if (whiteList.indexOf(to.path) !== -1) { //存在白名单中
            next()
        } else { //不存在白名单中,去登录
            next({ path: '/login' })
        }
    }
})