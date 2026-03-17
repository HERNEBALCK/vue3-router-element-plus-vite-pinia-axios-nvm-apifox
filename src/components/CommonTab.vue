<template>
    <div class="tags">
        <el-tag
            v-for="(tag, index) in tags"    
            :key="tag.name"
            :closable="tag.name !== 'home'"
            :effect="route.name === tag.name ? 'dark' : 'plain'"
            @click="handleMenu(tag)"
            @close="handleClose(tag, index)"
        >
            {{ tag.label }}
        </el-tag>
    </div>
</template>

<script setup>
// 类似浏览器多标签页功能
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useAllDataStore } from '@/stores'
const store = useAllDataStore()
const tags = computed(() => store.state.tags)
const route = useRoute()
const router = useRouter()
// 标签跳转
const handleMenu = (tag) => {
    router.push(tag.name)
    store.selectMenu(tag)
}
// 关闭标签
const handleClose = ( tag, index ) => {
    store.undateTags(tag)
    // 点击关闭的tag不是对应的当前页面
    if(tag.name !== route.name) return
    if(index === store.state.tags.length) {
        // 关闭的是最后一个，则跳转到前一个
        store.selectMenu(tags.value[index - 1])
        router.push(tags.value[index - 1].name)
    } else {
        // 关闭的是中间标签，则跳转到后一个
        store.selectMenu(tags.value[index])
        router.push(tags.value[index].name)
    }
}
</script>

<style lang="less" scoped>
.tags {
    margin: 20px 0 0 20px;
}
.el-tag {
    margin-right: 10px;
}
</style>
