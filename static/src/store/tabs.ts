import { defineStore } from 'pinia'
import { ITab, Types } from './types'

export const useTabsStore = defineStore({
    id: Types.TABS,
    state: () => {
        let data: ITab[] = []
        return {
            count: 0,
            collapse: false,
            tabsList: data
        }
    },
    getters: {
        getCount(): number {
            return this.count;
        },
        //获取collapse
        getCollapse(): boolean {
            return this.collapse;
        },
        getTabsList(): any[] {
            return this.tabsList
        }
    },
    actions: {
        setCount(count: number) {
            this.$state.count = count
        },
        setCollapse(collapse: boolean) {
            this.$state.collapse = collapse
        },
        addTab(tab: ITab){
            if(this.$state.tabsList.some(item=>item.path===tab.path)) return;
            this.$state.tabsList.push(tab)
        }
    }

})