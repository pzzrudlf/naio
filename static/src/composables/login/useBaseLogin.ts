import {reactive,ref} from 'vue'
import { ElForm } from 'element-plus';
import { LoginParam } from '../../api/user/userModel'
import { validatePassword } from '../../utils/validator'

export default function useBaseLogin(){
    //登录表单ref
    const formRef = ref<InstanceType<typeof ElForm>>();
    //表单绑定的数据域
    // const loginModel = reactive<LoginParm>({
    //     username:'18511013819',
    //     password:'pzzrudlf',
    //     code: ''
    // })
    const loginModel = reactive<LoginParam>({
        username:'admin',
        password:'1234',
        code: ''
    })
    //表单验证规则
    const loginRules = reactive({
        username:[{
            required:true,
            trigger:'blur',
            message:'请填写登录账户'
        }],
        password:[{
            required:true,
            trigger:'blur',
            validator: validatePassword()
        }],
        code: [{
            required: true,
            tigger: 'blur',
            message:'请填写验证码'
        }]
    })
    return {
        loginModel,
        loginRules,
        formRef
    }
}