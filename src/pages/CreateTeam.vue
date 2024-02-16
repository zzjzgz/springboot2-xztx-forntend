<template>
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
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
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter()

//搜索
const searchText = ref('');
const searchListTeam = async (val = '') => {
    const res = await myAxios.get('/team/list/myCreate', {
        params: {
            searchText:val,
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

const doDeleteTeam = async (id : Number) =>{
    const res = await myAxios.post('/team/delete', {
        id,
    })
    if (res.code === 0) {
        showSuccessToast('解散成功');
        router.go(0);
    } else {
        showFailToast('解散失败' + (res.description ? `：${res.description}` : ''));
    }
}



const offset = ref({ x: window.innerWidth*0.8, y: window.innerHeight*0.85 });
</script>


<style scoped>

</style>