<template>
    <van-swipe :autoplay="3000" lazy-render style="height: 30%;">
        <van-swipe-item v-for="image in images" :key="image">
            <img :src="image" style="width: 100%;height: 30%" />
        </van-swipe-item>
    </van-swipe>
    <van-tabs v-model:active="active" @change="onTabChange">
        <van-tab title="推荐" name="index"/>
        <van-tab title="匹配" name="match"/>
    </van-tabs>
<!--    <van-cell center title="匹配伙伴">-->
<!--        <template #right-icon>-->
<!--            <van-switch v-model="isMatchMode"/>-->
<!--        </template>-->
<!--    </van-cell>-->
<!--    将卡片模块抽取成组件-->
    <user-card-list :user-list="userList" :loading = "loading"/>
<!--    <van-pagination-->
<!--        v-if="userList && userList.length >= 1"-->
<!--        v-model="currentPage"-->
<!--        :page-count="5"-->
<!--        :total-items="24"-->
<!--        @change=pageNum1-->
<!--    />-->
  <!-- 搜索提示 -->
    <van-empty v-if="!userList || userList.length < 1" image="error" description="数据为空" />
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute()
const { tags } = route.query;
const userList = ref([])

//标签拦
const active = ref('index');

//标签拦切换
const onTabChange = async (name) => {
        let userListData;
        loading.value = true;
    if (name === 'match') {
        const num = 10;
        userListData = await myAxios.get('/user/match', {
            params: {
                num,
            },
        })
            .then(function (response) {
                // console.log('/user/match succeed', response);
                return response?.data;
            })
            .catch(function (error) {
                console.error('/user/match error', error);
                showFailToast('请求失败');
            })
    }else{
        // 普通模式，直接分页查询用户
        userListData = await myAxios.get('/user/recommend', {
            params: {
                pageSize: 10,
                pageNum: 1,
            },
        })
            .then(function (response) {
                // console.log('/user/recommend succeed', response);
                return response?.data?.records;
            })
            .catch(function (error) {
                console.error('/user/recommend error', error);
                showFailToast('请求失败');
            })
    }
        if (userListData) {
        userListData.forEach((user) => {
            if (user.gender === 0){
                user.gender = '男';
            }else if(user.gender === 1){
                user.gender = '女';
            }else {
                user.gender = '保密';
            }
        })
        userList.value = userListData;
    }
    loading.value = false;
}

const images = [
    'https://zzj-img.oss-cn-hangzhou.aliyuncs.com/3.png',
    'https://zzj-img.oss-cn-hangzhou.aliyuncs.com/zzj_img/imgs/1.jpg',
    'https://zzj-img.oss-cn-hangzhou.aliyuncs.com/2024/wallhaven-v9evw5_1920x1080.jpg'
];
// const isMatchMode = ref<boolean>(false);

const loading = ref(true);

//页面加载时触发按钮事件
onMounted( async ()=>{
    onTabChange('index');
})

/**
 * 加载数据
 */
// const loadData = async () => {
//     let userListData;
//     loading.value = true;
//     // 匹配模式，根据标签匹配用户
//     if (isMatchMode.value) {
//         const num = 10;
//         userListData = await myAxios.get('/user/match', {
//             params: {
//                 num,
//             },
//         })
//             .then(function (response) {
//                 // console.log('/user/match succeed', response);
//                 return response?.data;
//             })
//             .catch(function (error) {
//                 console.error('/user/match error', error);
//                 showFailToast('请求失败');
//             })
//     } else {
//         // 普通模式，直接分页查询用户
//         userListData = await myAxios.get('/user/recommend', {
//             params: {
//                 pageSize: 10,
//                 pageNum: 1,
//             },
//         })
//             .then(function (response) {
//                 // console.log('/user/recommend succeed', response);
//                 return response?.data?.records;
//             })
//             .catch(function (error) {
//                 console.error('/user/recommend error', error);
//                 showFailToast('请求失败');
//             })
//     }
//     if (userListData) {
//         userListData.forEach((user) => {
//             if (user.gender === 0){
//                 user.gender = '男';
//             }else if(user.gender === 1){
//                 user.gender = '女';
//             }else {
//                 user.gender = '保密';
//             }
//         })
//         userList.value = userListData;
//     }
//     loading.value = false;
// }
//
// watchEffect(() => {
//     onTabChange;
// })
</script>

<style scoped>

</style>