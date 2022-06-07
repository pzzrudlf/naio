<template>
    <template v-for="menu in menuList" :key="menu.path">
        <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path" :key="menu.path">
            <template #title>
                <i v-if="menu.meta.icon && menu.meta.icon.includes('el-icon')" :class="menu.meta.icon"></i>
                <!-- <component class="icons" v-else :is="menu.meta.icon" /> -->
                <Icon class="icons" v-else :icon="menu.meta.icon" />
                <span>{{ menu.meta.title }}</span>
            </template>
            <menu-item :menuList="menu.children"></menu-item>
        </el-sub-menu>
        <el-menu-item style="color: #f4f4f5" v-else :index="menu.path">
            <i v-if="menu.meta.icon && menu.meta.icon.includes('el-icon')" :class="menu.meta.icon"></i>
                <!-- 动态组件的使用方法 -->
                <!-- <component class="icons" v-else :is="menu.meta.icon" /> -->
                <Icon class="icons" v-else :icon="menu.meta.icon" />
            <template #title>{{ menu.meta.title }}</template>
        </el-menu-item>
    </template>
</template>
    
<script setup lang='ts'>
// import { defineProps } from 'vue'
defineProps(['menuList'])
</script>
    
<style lang="less" scoped>
.icons{
    width: 24px;
    height: 18px;
    margin-right: 5px;
}
</style>