/**
 * 清空表单
 * @param formRef       表单的ref属性
 * @param formModel     表单绑定的model
 */
export default function resetform(formRef: any, formModel: any) {
    //清空数据
    Object.keys(formModel).forEach(key=>{
        formModel[key] = ''
    })
    //清除表单的验证
    if(formRef){
        formRef.resetFields()
        formRef.clearValidate()
    }
}