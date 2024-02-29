<!--    将卡片模块抽取成组件-->
<template>
    <van-card
            v-for="team in teamList"
            :desc="team.teamDescription"
            :title="team.teamName"
            :thumb="team.teamAvatarUrl"
            @click="showTeamInfo(team.id,team.status,team.teamName,team.teamDescription,team.expireTime,team.maxNum,team.hasJoinNum,team.teamAvatarUrl)"
    >
        <template #tags>
            <van-text-ellipsis :content="'人数：' + team.hasJoinNum.toString() + '/' + team.maxNum.toString() + '人'"/>
            <van-text-ellipsis :content="'过期时间：' + team.expireTime?.toString().slice(0,10)"/>
            <van-tag plain type="danger" style="margin-right: 5px;margin-top: 5px;color: cornflowerblue">
                {{ teamStatesEnum[team.status] }}
            </van-tag>
        </template>
        <template #footer>
            <van-button size="small" v-if="team.userId != currentUser?.id && !team.hasJoin" @click="preJoinTeam(team)" plain type="primary">加入队伍
            </van-button>
            <van-button size="small" v-if="team.userId === currentUser?.id" @click="doUpdateTeam(team.id)" color="#34D291" plain type="primary">更新队伍
            </van-button>
            <van-button size="small" v-if="team.userId === currentUser?.id" @click="doDeleteTeam(team.id)" color="#ff0000" plain type="primary">解散队伍
            </van-button>
            <van-button size="small" v-if="team.userId != currentUser?.id && team.hasJoin" @click="doQuitTeam(team.id)" color="#ff0000" plain type="primary">退出队伍
            </van-button>
        </template>
    </van-card>
    <van-dialog v-model:show="showDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
        <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatesEnum} from "../constants/teamStates.ts";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {ref} from "vue";
import {onMounted} from "vue";
import {getCurrentUser} from "../service/user.ts";
import {useRouter} from "vue-router";

const router = useRouter()

const showDialog = ref(false);
const password = ref('');
const joinTeamId = ref();
interface UserCardListProps {
    teamList: TeamType[];
}

//@ ts-ignore
const props = withDefaults(defineProps<UserCardListProps>(), {
    teamList: [] as TeamType[],
});

const currentUser = ref();

onMounted(async ()=>{
    currentUser.value = await getCurrentUser();
})

//更新队伍
const doUpdateTeam = (id : Number) =>{
    router.push({
        path:'/team/update',
        query:{
            id,
        }
    })
}

//删除
const doDeleteTeam = async (id : Number) =>{
    const res = await myAxios.post('/team/delete', {
        id,
    })
    if (res.code === 0) {
        showSuccessToast('解散成功');
        router.go(0);
    } else {
        showFailToast('解散失败' + (res.description ? `：${res.description}` : ''));
    }
}

const preJoinTeam = (team: TeamType) => {
    joinTeamId.value = team.id;
    if (team.status == "2"){
        showDialog.value = true;
    }else {
        doJoinTeam();``
    }
}

/**
 * 加入队伍
 */
const doJoinTeam = async () => {
    if (!joinTeamId.value){
        return;
    }
    const res = await myAxios.post('/team/join', {
        teamId: joinTeamId.value,
        teamPassword:password.value,
    })
    if (res.code === 0) {
        showSuccessToast('加入成功');
        doJoinCancel();
        router.go(0);
    } else {
        showFailToast('加入失败' + (res.description ? `：${res.description}` : ''));
    }
}

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: Number) => {
    const res = await myAxios.post('/team/quit', {
        teamId: id,
    })
    if (res.code === 0) {
        showSuccessToast('退出成功');
        router.go(0);
    } else {
        showFailToast('退出失败' + (res.description ? `：${res.description}` : ''));
    }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

const showTeamInfo = (id : Number,states:String,teamName,teamDescription,expireTime,maxNum,hasJoinNum,teamAvatarUrl) => {
    if (states == '0'){
        router.push({
            path:'/team/teamInfo',
            query:{
                id,
                teamName,
                teamDescription,
                expireTime,
                maxNum,
                hasJoinNum,
                teamAvatarUrl,
            }
        })
    }else {
        showFailToast("仅公开队伍允许查看队伍信息");
        return;
    }
}

</script>

<style scoped>

</style>