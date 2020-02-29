import { ValueStreamBaseInfo } from "./ValueStream";

export type IpAddr = string

export interface User {
    name: string,
    id: string,
    ip?: IpAddr,
    available: ValueStreamBaseInfo[]
}