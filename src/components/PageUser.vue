<template>
    <van-pagination
            v-model="currentPage"
            :page-count="20"
            mode="simple"
            @change=pageNum
    />
</template>

<script setup lang="ts">
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";


const currentPage = ref(1);

const userList = ref([])
const pageNum = async ()=>{
    const userListDate = await myAxios.get('/user/recommend', {
        params: {
            pageNum:currentPage.value,
            pageSize:4,
        },
    })
        .then(function (response) {
            // showSuccessToast('查询成功')
            return response?.data?.records;
        })
        .catch(function (error) {
            showFailToast('请求失败')
            console.log(error)
        })
    if (userListDate){
        userListDate.forEach(user=>{
            if (user.tags){
                user.tags = JSON.parse(user.tags)
            }
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
}

</script>

<style scoped>

</style>