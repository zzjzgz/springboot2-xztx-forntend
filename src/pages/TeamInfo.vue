<template>
    <div class="top">
        <van-image
            round
            width="7rem"
            height="7rem"
            fit="cover"
            position="center"
            :src="teamAvatarUrl"
        />
    </div>
    <van-cell-group style="margin-left: 5%;margin-right: 5%">
        <van-cell title="队伍名" :value="teamName" />
        <van-cell title="描述" :value="teamDescription" />
        <van-cell title="队伍人数" :value="hasJoinNum + ' / ' + maxNum" />
        <van-cell title="过期时间" :value="expireTime.slice(0,10)" />
    </van-cell-group>
    <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
        队员信息
    </van-divider>
    <user-card-list :user-list="userList" :loading = "loading"/>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showFailToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const router = useRouter()
const route = useRoute()

const id = route.query.id;
const teamName:String = <String>route.query.teamName;
const teamDescription:String = <String>route.query.teamDescription;
const expireTime:String = <String>route.query.expireTime;
const maxNum:String = <String>route.query.maxNum;
const hasJoinNum:String = <String>route.query.hasJoinNum;
const teamAvatarUrl:String = <String>route.query.teamAvatarUrl;

const loading = ref(true);
const userList = ref([])

onMounted( async ()=>{
    loading.value = true;
    // 普通模式，直接分页查询用户
    const userListData = await myAxios.post('/team/info',{
        id,
    })
        .then(function (response) {
            // console.log('/user/recommend succeed', response);
            return response?.data;
        })
        .catch(function (error) {
            console.error('/user/recommend error', error);
            showFailToast('请求失败');
        })
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
})

</script>


<style scoped>
.top {
    display: flex;
    justify-content: center;   /* 水平居中 */
}
</style>