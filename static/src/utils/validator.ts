export const validatePassword = () => {
    return (rule:string, value:string, callback:(arg?: any)=>{}) => {
        if (value.length < 4) {
            callback(new Error('密码要大于等于4位'))
        } else {
            callback()
        }
    }
}