<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                v-model="userAccount"
                name="userAccount"
                label="账号"
                placeholder="账号"
                :rules="[{ required: true, message: '请填写账号' }]"
            />
            <van-field
                v-model="userPassword"
                type="password"
                name="userPassword"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
        </van-cell-group>
        <!-- 右对齐 -->
        <van-row justify="end">
            <van-col span="10" style="color: #1989fa" @click="register">没有账号？注册</van-col>
        </van-row>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import 'vant/es/toast/style'

const userAccount = ref('');
const userPassword = ref('');
const route = useRoute();
const onSubmit = async () => {
   const res = await myAxios.post('/user/login',{
        userAccount:userAccount.value,
        userPassword:userPassword.value,
    })
    console.log(res,'用户登录');
    if (res.code === 0 && res.data){
        showSuccessToast('登录成功');
        //回到之前的页面
        window.location.href = route.query?.rediect as string ?? '/';
    }else {
        showFailToast(res.description)
    }
}

const router = useRouter();

const register = () => {
    router.push({
        path:'/user/register'
    })
};

</script>

<style scoped>

</style>