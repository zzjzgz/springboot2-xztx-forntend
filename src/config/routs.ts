// 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import UserUpdate from "../pages/UserUpdatePage.vue";
import SearchPag from "../pages/SearchPag.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPag from "../pages/SearchResultPag.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import JoinTeam from "../pages/JoinTeam.vue";
import CreateTeam from "../pages/CreateTeam.vue";
import UserPage from "../pages/UserPage.vue";
import UserRegisterPage from "../pages/UserRegisterPage.vue";
import UserUrlEditPage from "../pages/UserUrlEditPage.vue";
import UserTagEditPage from "../pages/UserTagEditPage.vue";
import TeamInfo from "../pages/TeamInfo.vue";

const routes = [
    { path: '/', component: Index },
    { path: '/team', title:'队伍', component: Team },
    { path: '/team/teamInfo', title:'队伍信息', component: TeamInfo },
    { path: '/team/add', title:'添加队伍', component: TeamAddPage },
    { path: '/team/update', title:'更新队伍', component: TeamUpdatePage },
    { path: '/user/update', title:'更新用户信息', component: UserUpdate },
    { path: '/user/joinTeam', title:'加入的队伍', component: JoinTeam },
    { path: '/user/createTeam', title:'创建的队伍', component: CreateTeam },
    { path: '/user', title:'个人', component: UserPage },
    { path: '/search', title:'搜索', component: SearchPag },
    { path: '/user/list', component: SearchResultPag },
    { path: '/user/edit',  component: UserEditPage },
    { path: '/user/login', title:'用户登录', component: UserLoginPage },
    { path: '/user/register', title:'用户注册', component: UserRegisterPage },
    { path: '/user/avatarUrl', title:'用户更换头像', component: UserUrlEditPage },
    { path: '/user/updateTag', title:'用户更换标签', component: UserTagEditPage },

]

export default routes;