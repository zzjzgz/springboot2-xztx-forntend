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
            <van-field
                v-model="checkPassword"
                type="password"
                name="checkPassword"
                label="确认密码"
                placeholder="确认密码"
                :rules="[{ required: true, message: '请再次填写密码' }]"
            />
        </van-cell-group>
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
const checkPassword = ref('');
const route = useRoute();
const onSubmit = async () => {
   const res = await myAxios.post('/user/register',{
        userAccount:userAccount.value,
        userPassword:userPassword.value,
       checkPassword:checkPassword.value,
    })
    if (res.code === 0 && res.data){
        showSuccessToast('注册成功');
        //回到之前的页面
        window.location.href = route.query?.rediect as string ?? '/';
    }else {
        showFailToast(res.description)
    }
}

const router = useRouter();


</script>

<style scoped>

</style>