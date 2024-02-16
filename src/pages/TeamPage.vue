<template>
    <van-notice-bar
        color="#1989fa"
        background="#ecf9ff"
        left-icon="volume-o"
        text="相同道路的伙伴，总能找到共鸣，不论风雨，我们共同前行。"
    />
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
    <van-tabs v-model:active="active" @change="onTabChange">
        <van-tab title="公开" name="public"/>
        <van-tab title="加密" name="token"/>
        <van-tab title="私有" name="private"/>
    </van-tabs>
    <van-floating-bubble
        axis="xy"
        icon="plus"
        magnetic="x"
        v-model:offset="offset"
        is-link @click="showPopup"
    />
    <team-card-list :team-list="teamList"/>
    <!-- 搜索提示 -->
    <van-empty v-if="teamList?.length < 1" image="search" description="未找到队伍" />

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showFailToast} from "vant";

const router = useRouter()

//搜索
const searchText = ref('');
const myJoinListTeam = ref([]);
const active = ref('public')

//标签切换
const onTabChange = (name) =>{
    if (name === 'public'){
        searchListTeam(searchText.value,0);
    }else if (name === 'token'){
        searchListTeam(searchText.value,2);
    }else {
        searchListTeam(searchText.value,1);
    }
}
//搜索结果
const searchListTeam = async (val = '',status = 0) => {
    const res = await myAxios.get('/team/list', {
        params: {
            searchText:val,
            status,
        },
    })
    if (res?.code === 0){
        teamList.value = res.data;
    }else {
        showFailToast("请求失败，请重试")
    }
}

// const listTeam = async () =>{
//     const res = await myAxios.get('/team/list/page', {
//         params: {
//             pageNum:1,
//             pageSize:25,
//         },
//     })
//     if (res?.code === 0){
//         teamList.value = res.data.records;
//     }else {
//         showFailToast("请求失败，请重试")
//     }
// }

const teamList = ref([])

//加载队伍
onMounted( async ()=>{
    searchListTeam();
})

//搜索队伍
const onSearch = (val) =>{
    searchListTeam(val)
}
const onCancel = () => {
    searchListTeam();
};

//加入队伍按钮
const show = ref(false);
const showPopup = () => {
    show.value = true;
    router.push({
        path:'/team/add'
    })
};



const offset = ref({ x: window.innerWidth*0.8, y: window.innerHeight*0.85 });
</script>


<style scoped>

</style>