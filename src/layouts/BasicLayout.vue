<template class="nav">
    <van-nav-bar
            :title="title"
            left-text=""
            right-text="按钮"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickSearch"
    >
    <template #right>
        <van-icon name="search" size="18" />
    </template>
    </van-nav-bar>

    <div id="content">
        <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view />
    </div>


    <van-tabbar route>
        <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
        <van-tabbar-item to="/team" icon="search" name="team">队伍页</van-tabbar-item>
        <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
    </van-tabbar>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import routes from "../config/routs.ts";

const router = useRouter()
const route = useRoute()
const DEFAULT_TITLE = '寻知同行';
const title = ref(DEFAULT_TITLE);

/**
 * 根据路由切换标题
 */
router.beforeEach((to, from) => {
    const toPath = to.path;
    const route = routes.find((route) => {
        return toPath == route.path;
    })
    title.value = route?.title ?? DEFAULT_TITLE;
})

const onClickLeft = () => {
    router.back();
};
const onClickSearch = () => {
    router.push('/search')
};
//高亮，首页高亮
// const active = ref('index');

</script>

<style scoped>
#content{
    padding-bottom: 55px;
}
</style>