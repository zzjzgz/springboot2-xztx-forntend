<template>
    <template v-if="user">
        <div class="top">
            <van-image
                round
                width="8rem"
                height="8rem"
                fit="cover"
                position="center"
                :src="user?.avatarUrl"
            />
        </div>
        <van-cell title="昵称" :value="user?.username"/>
        <van-cell title="修改信息" is-link to="/user/update"/>
        <van-cell title="我创建的队伍" is-link to="/user/createTeam" />
        <van-cell title="我加入的队伍" is-link to="/user/joinTeam" />
        <van-row justify="end">
            <van-col span="7" >
                <van-button plain hairline type="primary" @click="quitUser">退出登录</van-button>
            </van-col>
        </van-row>

    </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import 'vant/es/toast/style'
// //中文语言包
// import 'moment/locale/zh-cn'
import {getCurrentUser} from "../service/user.ts";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";


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

const quitUser = async ()=>{
    const res = await myAxios.post('/user/logout',{})
    if (res.code === 0 && res.data){
        showSuccessToast('退出成功');
        //回到登录页面
        window.location.href = '/user/login';
    }else {
        showFailToast(res.description)
    }
}

const router = useRouter();

</script>

<style scoped>
.top {
    display: flex;
    justify-content: center;   /* 水平居中 */
}
</style>