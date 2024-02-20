import {UserType} from "./user";

/**
 * 队伍类型
 */
export type TeamType = {
    id: number;
    teamName: string;
    teamDescription: string;
    maxNum: number;
    hasJoinNum: number;
    expireTime?: Date;
    userId: number;
    createTime: Date;
    status: string;
    password?: string;
    teamAvatarUrl: string;
    createUser?:UserType;
    hasJoin:boolean;
};