<!--    将卡片模块抽取成组件-->
<template>
    <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
    <van-card
            :desc="user.userProfile"
            :title="user.username"
            :thumb="user.avatarUrl"
            :tag="user.gender"
    >
        <template #tags>
            <van-tag plain type="danger" v-for="tag in JSON.parse(user.tags)" style="margin-right: 5px;margin-top: 5px;color: cornflowerblue">
                {{ tag }}
            </van-tag>
        </template>
        <template #footer>
            <van-button size="small" plain type="primary" @click="openNewTab">联系我</van-button>
        </template>
    </van-card>
    </van-skeleton>
</template>

<script setup lang="ts">
import {UserType} from "../models/user";

interface UserCardListProps{
    userList:UserType[];
    loading: boolean;
}
//@ ts-ignore
const props = withDefaults(defineProps<UserCardListProps>(),{
    loading: true,
   userList: [] as UserType[],

});

const openNewTab = ()=>{
    window.open('https://space.bilibili.com/646368042', '_blank');
}

</script>

<style scoped>

</style>