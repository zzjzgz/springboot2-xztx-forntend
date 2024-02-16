<template>
    <van-form @submit="onSubmit">
        <van-field
                v-model="editUser.currentValue"
                :name="editUser.editKey"
                :label="editUser.editName"
                :placeholder="`请输入${editUser.editName}`"
        />
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
import {getCurrentUser} from "../service/user.ts";

const router = useRouter();
const route = useRoute();

const editUser = ref({
    editKey: route.query.editKey,
    currentValue: route.query.currentValue,
    editName: route.query.editName,
})



const onSubmit = async () =>{
    const currentUser = await getCurrentUser();
    if (!currentUser){
        showFailToast('用户未登录');
        return;
    }
    let res = ref();
    if(editUser.value.editKey === 'gender'){
        if (editUser.value.currentValue === '男'){
            editUser.value.currentValue = '0';
        }else if (editUser.value.currentValue === '男'){
            editUser.value.currentValue = '1';
        }
        res = await myAxios.post('/user/update',{
            'id':currentUser.id,
            [editUser.value.editKey as number]:editUser.value.currentValue,
        })
    }else {
        res = await myAxios.post('/user/update',{
            'id':currentUser.id,
            [editUser.value.editKey as string]:editUser.value.currentValue,
        })
    }
    if (res.code === 0 && res.data >0){
        showSuccessToast("修改成功");
        router.back();
    }else{
        showFailToast(res.description);
    }
}
</script>

<style scoped>

</style>