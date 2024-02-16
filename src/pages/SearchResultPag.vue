<template>
    <!--    将卡片模块抽取成组件-->
    <user-card-list :user-list="userList" :loading = "loading"/>
    <!-- 搜索提示 -->
    <van-empty v-if="!userList || userList.length < 1" image="search" description="结果为空" />
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import qs from 'qs'
import UserCardList from "../components/UserCardList.vue";

const route = useRoute()
const { tags } = route.query;
const userList = ref([])
const loading = ref(true);

onMounted(async ()=>{
    loading.value = true;
    const userListDate = await myAxios.get('/user/search/tags', {
        params: {
            tagNameList:tags,
        },
        paramsSerializer: params => {
            return qs.stringify(params,{indices:false});
        }
    })
        .then(function (response) {
            if (response.data.length === 0){
                showFailToast('数据为空');
            }else {
                showSuccessToast('查询成功');
            }
            return response?.data;
        })
        .catch(function (error) {
            console.log(error)
        })
        if (userListDate){
            userListDate.forEach(user=>{
                if (user.gender === 0){
                    user.gender = '男';
                }else if(user.gender === 1){
                    user.gender = '女';
                }else {
                    user.gender = '保密';
                }
            })

            userList.value = userListDate;
        }
    loading.value = false;
})

const openNewTab = ()=>{
    window.open('https://space.bilibili.com/646368042', '_blank');
}


// const mockUser = {
//     id: 1,
//     userProfile:'热爱编程，头发还健在，哈哈哈哈哈，平时听听音乐',
//     username: '骏哥',
//     userAccount: 'zzjny',
//     avatarUrl:'https://zzj-img.oss-cn-hangzhou.aliyuncs.com/2024/zzjtest.jpg',
//     gender:'男',
//     phone: 12346789,
//     email: '12341646@qq.com',
//     tags: ['java','emo','大三','崩铁','听音乐','原神','秋招中'],
//     createTime: new Date(),
// }


</script>

<style scoped>

</style>