<template>
    <template v-if="user">
        <div class="top">
            <van-image
                round
                width="8rem"
                height="8rem"
                fit="cover"
                position="center"
                :src="user.avatarUrl"
                @click="toAvatarUrlEdit('avatarUrl','头像',user.avatarUrl)"
            />
        </div>
        <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username','昵称',user.username)"/>
        <van-cell title="个人简介" is-link to="/user/edit" :value="user.userProfile" @click="toEdit('userProfile','个人简介',user.userProfile)"/>
        <van-cell title="用户名" :value="user.userAccount"/>
        <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
        <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
        <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
        <van-cell title="标签" is-link to="/user/updateTag" :value="user.tags" @click="toTagEdit('tags','标签',user.tags)">
            <van-tag plain type="danger" v-for="tag in JSON.parse(user.tags)" style="margin-right: 5px;margin-top: 5px;color: cornflowerblue">
                {{ tag }}
            </van-tag>
        </van-cell>
        <van-cell title="注册时间" :value="user.createTime"/>
    </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import 'vant/es/toast/style'
// //中文语言包
// import 'moment/locale/zh-cn'
import {getCurrentUser} from "../service/user.ts";


// const user = {
//     id: 1,
//     username: '骏哥',
//     userAccount: 'zzjny',
//     avatarUrl:'https://img.touxiangwu.com/zb_users/upload/2022/10/202210311667198862146079.jpg',
//     gender:'男',
//     phone: 12346789,
//     email: '12341646@qq.com',
//     tags: 'java',
//     createTime: new Date(),
// }

const user = ref();

//会在页面首次加载时出发，这是个钩子函数
onMounted(async ()=>{
    const res = await getCurrentUser();
    if (res){
        user.value = res;
    }
})

const router = useRouter();

//更新文字信息
const toEdit = (editKey: string, editName: string, currentValue: string) => {
    router.push({
        path: '/user/edit',
        query: {
            editKey,
            editName,
            currentValue,
        }
    })
}

//更新头像
const toAvatarUrlEdit = (editKey: string, editName: string, currentValue: string) => {
    router.push({
        path: '/user/avatarUrl',
        query: {
            editKey,
            editName,
            currentValue,
        }
    })
}

//更新标签
const toTagEdit = (editKey: string, editName: string, currentValue: string) => {
    router.push({
        path: '/user/updateTag',
        query: {
            editKey,
            editName,
            currentValue,
        }
    })
}

</script>

<style scoped>
.top {
    display: flex;
    justify-content: center;   /* 水平居中 */
}
</style>