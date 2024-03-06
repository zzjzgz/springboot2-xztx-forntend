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
        <van-button type="primary" @click="onSubmit" block="block">提交</van-button>
    </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast, showToast} from "vant";
import 'vant/es/toast/style'
import {getCurrentUser} from "../service/user.ts";
import MyAxios from "../plugins/myAxios.ts";

const router = useRouter();
const route = useRoute();

const editUser = ref({
    editKey: route.query.editKey,
    currentValue:route.query.currentValue,
    editName: route.query.editName,
})

const searchText = ref('');


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
            { text: '校招', id: '校招' },
            { text: '考公', id: '考公' },
            { text: '竞赛', id: '竞赛' },
            { text: '转行', id: '转行' },
            { text: '跳槽', id: '跳槽' },
            { text: '实习', id: '实习' },
        ]},
    {text: '身份',
        children: [
            { text: '小学', id: '小学' },
            { text: '初中', id: '初中' },
            { text: '高中', id: '高中' },
            { text: '大一', id: '大一' },
            { text: '大二', id: '大二' },
            { text: '大三', id: '大三' },
            { text: '大四', id: '大四' },
            { text: '研一', id: '研一' },
            { text: '研三', id: '研三' },
            { text: '学生', id: '学生' },
            { text: '待业', id: '待业' },
            { text: '实习中', id: '实习中' },
            { text: '工作中', id: '工作中' },
        ]},
    {text: '生活状态',
        children: [
            { text: '积极', id: '积极' },
            { text: 'emo', id: 'emo' },
            { text: '平常', id: '平常' },
            { text: '单身', id: '单身' },
            { text: '恋爱中', id: '恋爱中' },
            { text: '已婚', id: '已婚' },
        ]},
    {text: '兴趣',
        children: [
            { text: '听音乐', id: '听音乐' },
            { text: '跑步', id: '跑步' },
            { text: '书法', id: '书法' },
            { text: '摄影', id: '摄影' },
            { text: '画画', id: '画画' },
            { text: '吉他', id: '吉他' },
            { text: '钢琴', id: '钢琴' },
            { text: '小提琴', id: '小提琴' },
            { text: '跳舞', id: '跳舞' },
            { text: '唱歌', id: '唱歌' },
        ]},
    {text: '游戏',
        children: [
            { text: '王者荣耀', id: '王者荣耀' },
            { text: '原神', id: '原神' },
            { text: 'QQ飞车', id: 'QQ飞车' },
            { text: '第五人格', id: '第五人格' },
            { text: '崩坏三', id: '崩坏三' },
            { text: '崩铁', id: '崩铁' },
            { text: '绝区零', id: '绝区零' },
            { text: '蛋仔派对', id: '蛋仔派对' },
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
activeIds.value = JSON.parse(editUser.value.currentValue);
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
 * 提交
 */
const onSubmit = async () =>{
    const str = activeIds.value.toString().split(",")
    const jsonStr = JSON.stringify(str);
    const currentUser = await getCurrentUser();
    if (!currentUser){
        showFailToast('用户未登录');
        return;
    }
    const res = await myAxios.post('/user/update',{
        'id':currentUser.id,
        [editUser.value.editKey as string]:jsonStr,
    })
    if (res.code === 0 && res.data >0){
        showSuccessToast("修改成功");
        router.back();
    }else{
        showFailToast(res.description);
    }

}
</script>

<style scoped>

</style>