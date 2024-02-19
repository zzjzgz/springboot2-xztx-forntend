<template>
    <div id="teamAddPage">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
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
                <van-field
                        v-model="addTeamData.teamName"
                        name="teamName"
                        label="队伍名"
                        placeholder="请输入队伍名"
                        :rules="[{ required: true, message: '请输入队伍名' }]"
                />
                <van-field
                        v-model="addTeamData.teamDescription"
                        rows="3"
                        autosize
                        label="队伍描述"
                        type="textarea"
                        placeholder="请输入队伍描述"
                />
                <van-field
                    is-link
                    readonly
                    clickable
                    name="date-picker"
                    label="过期时间"
                    :value="addTeamData.expireTime"
                    v-model="addTeamData.expireTime"
                    :placeholder="'点击选择过期时间'"
                    @click="showPicker = true"
                />
                <van-popup v-model:show="showPicker" position="bottom">
                    <van-picker-group
                        title="设定过期日期"
                        :tabs="['选择日期', '选择时间']"
                        @confirm="onConfirm"
                        @cancel="showPicker = false"
                    >
                        <van-date-picker
                            v-model="currentDate"
                            :min-date="minDate"
                        />
                        <van-time-picker
                            v-model="currentTime"
                            :columns-type="columnsType"
                        />
                    </van-picker-group>
                </van-popup>
                <van-field name="radio" label="队伍状态">
                    <template #input>
                        <van-radio-group v-model="addTeamData.status" direction="horizontal">
                            <van-radio name="0">公开</van-radio>
                            <van-radio name="1">私有</van-radio>
                            <van-radio name="2">加密</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field
                    v-if="Number(addTeamData.status) === 2"
                    v-model="addTeamData.password"
                    type="password"
                    name="userPassword"
                    label="密码"
                    placeholder="请输入队伍密码"
                    :rules="[{ required: true, message: '请填写队伍密码' }]"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import MyAxios from "../plugins/myAxios.js";
import {showFailToast, showSuccessToast, showToast} from "vant";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.js";
//控制弹窗
const showPicker = ref(false);

const router = useRouter();
const route = useRoute();
const teamId = route.query.id;


//最小时间
const minDate = new Date();


const currentDate = ref(['2024', '02', '08']);		//定义一个初始时间(年月日)
const currentTime = ref(['12', '00', '00']);		//定义一个初始时间(时分秒)
const columnsType = ['hour', 'minute', 'second'];
//用户填写的表单数据
const addTeamData = ref({});
const fileList = ref([
    { url: '' },
    // Uploader 根据文件后缀来判断是否为图片文件
    // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
    // { url: 'https://cloud-image', isImage: true },
]);

const onConfirm = () => {
    //组合过期时间，'T'是满足后端序列化配的
    addTeamData.value.expireTime = currentDate.value.join('-') + 'T' + currentTime.value.join(':');
    showPicker.value = false;		//有了这行才会使picker点击“确认”后自动关闭
};

//获取之前的队伍信息
onMounted(async ()=>{
    if (teamId <= 0){
        showFailToast("加载队伍失败，请刷新");
        return;
    }
    const res = await myAxios.get("/team/get",{
        params:{
            id:route.query.id,
        }
    });
    fileList.value[0].url = res.data.teamAvatarUrl;
    if (res?.code === 0){
        addTeamData.value = res.data;
    }else {
        showFailToast("加载队伍失败，请刷新");
    }
})

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
    console.log(file);
    showToast('文件大小不能超过 1 MB');
};



//提交
const onSubmit = async () => {
    const postData = {
        ...addTeamData.value,
        status: Number(addTeamData.value.status),
        teamAvatarUrl:fileList.value[0].url,
    }
    //todo前端参数校验
    const res = await MyAxios.post("/team/update",postData)
    if (res?.code === 0 && res.data){
        showSuccessToast("g更新成功");
        router.push({
            path:'/team',
            //当前页面不需要回退
            replace:true,
        })
    }else {
        showFailToast(res.description);
    }
}

</script>

<style scoped>

</style>