import { ref } from 'vue'

export default function useSelectParent() {
    const parentRef = ref<{ show: () => void }>()

    const selectParent = ()=>{
        parentRef.value?.show()
    }
    return {
        parentRef,
        selectParent
    }
}