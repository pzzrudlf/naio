//src/components/SvgIcon/index.vue
<template>
    <svg aria-hidden="true" class="svg-icon-spin">
        <use :xlink:href="symbolId" />
    </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type SvgIconName = {
    name: string
}

const data = defineProps<SvgIconName>()
const symbolId = computed(() => `#${data.name}`)

</script>
<script lang="ts">
export default {
    name: 'SvgIcon'
}
</script>
<style lang="less" scoped>
.svg-icon-spin {
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: -0.15em;
    overflow: hidden;
}
</style>

