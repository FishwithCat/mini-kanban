// import { ValueStreamBaseInfo } from "./ValueStream";

export type IpAddr = string

export interface User extends UserBaseInfo {
}

export interface UserBaseInfo {
    name: string,
    id: string,
    ip?: IpAddr,
    color?: string
}