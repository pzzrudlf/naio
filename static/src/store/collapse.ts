import { defineStore } from 'pinia'
import { ICollapse, Types } from './types'

export const useCollapseStore = defineStore({
    id: Types.COLLAPSE,
    state: () => {
        let data: ICollapse = {
            count: 0,
            collapse: false
        }
        return data
    },
    getters: {
        getCount(): number {
            return this.count
        },
        getCollapse(): boolean {
            return this.collapse
        }
    },
    actions: {
        setCount(count: number) {
            this.$state.count = count
        },
        setCollapse(collapse: boolean) {
            this.$state.collapse = collapse
        }
    }
})