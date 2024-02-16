import myAxios from "../plugins/myAxios.ts";
// import * as moment from "moment-timezone";
import {setCurrentUserState} from "../states/user.ts";


export const getCurrentUser = async ()=>{
    // const currentUser = getCurrentUserState();
    // //登录后，直接返回数据
    // if (currentUser) {
    //     return currentUser;
    // }
    //从远程获取
    const res =  await myAxios.get('/user/current');
    if (res.code === 0){
        setCurrentUserState(res.data);
        if (res.data.createTime){
            res.data.createTime = res.data.createTime.toString().slice(0,10);
        }
        if (res.data.gender === 0){
            res.data.gender = '男';
        }else if(res.data.gender === 1){
            res.data.gender = '女';
        }else {
            res.data.gender = '保密';
        }
        return res.data;
    }
    return null;

}