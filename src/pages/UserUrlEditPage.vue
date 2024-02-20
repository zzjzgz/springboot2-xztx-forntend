<template>
    <van-form @submit="onSubmit">
        <van-field name="uploader" label="上传头像">
            <template #input>
                <van-uploader
                    :after-read="afterRead"
                    v-model="fileList" reupload
                    @oversize="onOversize"
                    :max-count="2"
                    :max-size="1024 * 1024"
                />
            </template>
        </van-field>
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
import {showFailToast, showSuccessToast, showToast} from "vant";
import 'vant/es/toast/style'
import {getCurrentUser} from "../service/user.ts";
import MyAxios from "../plugins/myAxios.ts";

const router = useRouter();
const route = useRoute();

const editUser = ref({
    editKey: route.query.editKey,
    currentValue: route.query.currentValue,
    editName: route.query.editName,
})


//头像上传的数据
const fileList = ref([
    { url: editUser.value.currentValue },
    // Uploader 根据文件后缀来判断是否为图片文件
    // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
    // { url: 'https://cloud-image', isImage: true },
]);

//头像上传
const afterRead = async (file) => {

    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };
    const res = await MyAxios.post("/upload",{
        file:file.file,
    },config)
    if (res?.code === 0 && res.data){
        fileList.value[0].url = res.data;
        showSuccessToast("上传成功");
    }else {
        showFailToast(res.description);
    }
};
// 限制上传大小
const onOversize = (file) => {
    showToast('文件大小不能超过 1 MB');
};

const onSubmit = async () =>{
    const currentUser = await getCurrentUser();
    if (!currentUser){
        showFailToast('用户未登录');
        return;
    }
    const res = await myAxios.post('/user/update',{
        'id':currentUser.id,
        [editUser.value.editKey as string]:fileList.value[0].url,
    })
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