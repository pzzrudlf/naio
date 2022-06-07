export const enum Types {
    USER = 'userStore',
    TABS = 'tabsStore',
    COLLAPSE = 'collapseStore',
    MENU = 'menuStore'
}

export interface ITab {
    title: string,
    path: string
}

export interface ICollapse {
    count: number,
    collapse: boolean
}