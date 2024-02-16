<template>
    <form action="/">
        <van-search
                v-model="searchText"
                show-action
                placeholder="请输入要搜索的标签"
                @search="onSearch"
                @cancel="onCancel"
        />
    </form>
    <van-divider content-position="left">已选标签</van-divider>
    <div v-if="activeIds.length === 0">请选择选择</div>
    <van-row gutter="10">
        <van-col v-for="tag in activeIds">
            <van-tag closeable size="medium" type="primary" @close="doClose(tag)">
                {{ tag }}
            </van-tag>
        </van-col>
    </van-row>

    <van-divider content-position="left">选择标签</van-divider>
    <van-tree-select
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="tagList"
    />
    <div style="padding: 10px">
        <van-button type="primary" @click="doSearchResult" block="block">搜索</van-button>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from "vue-router";

const searchText = ref('');
const router = useRouter()

const originTagList = [
    {text: '方向',
    children: [
        { text: 'java', id: 'java' },
        { text: 'GO', id: 'GO' },
        { text: 'c++', id: 'c++' },
        { text: '前端', id: '前端' },
    ]},
    {text: '目标',
    children: [
        { text: '考研', id: '考研' },
        { text: '春招', id: '春招' },
        { text: '秋招', id: '秋招' },
        { text: '社招', id: '社招' },
    ]},
    ]
// 标签列表
let tagList = ref(originTagList);

/**
 * 搜索过滤
 * @param val
 */
const onSearch = (val) => {
    tagList.value = originTagList.map(parentTag => {
        const tempChildren = [...parentTag.children];
        const tempParentTag = {...parentTag};
        tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
        return tempParentTag;
    });

}

//取销搜索
const onCancel = () => {
    searchText.value = '';
    tagList.value = originTagList;
};

// 已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);

/**
 * 移除标签
 * @param tag
 */
const doClose = (tag) => {
    activeIds.value = activeIds.value.filter(item => {
        return item !== tag;
    })
}

/**
 * 搜索
 */
const doSearchResult = ()=>{
    router.push({
        path:'/user/list',
        query:{
            tags:activeIds.value
        }
    })
}
</script>

<style scoped>

</style>