import { ref,onMounted } from 'vue'
import { getImageApi } from '../../api/user/user'
export default function useImage() {

    //定义图片src
    const imgSrc = ref('');

    // 获取图片
    //btoa 创建一个base64编码的字符串
    const getImage = async () => {
        await getImageApi().then(res => {
            return 'data:image/png;base64,' + btoa(
                new Uint8Array(res.data as any).reduce((data, byte) => data + String.fromCharCode(byte), '')
            )
        }).then(data => {
            imgSrc.value = data;
        })
    }
    onMounted(()=>{
        getImage()
    })
    return {
        imgSrc,
        getImage
    }
}