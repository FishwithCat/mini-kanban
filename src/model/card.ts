import { UserBaseInfo, User } from "./user";

/** string for stepId */
export const ARCHIVE = '__ARCHIVE'
export const ABANDON = '__ABANDON'

export interface TimePoint {
    stepId: string,
    timeStamp: number
}

export enum Priority {
    low,
    default,
    high,
    urgent
}

export interface CardInfo {
    title: string,
    stepId: string,
    position: number /** position 决定卡片前后顺序 */
    describe?: any, // Delta
    blockInfo?: string,
    participants?: UserBaseInfo[],
    timeLine?: TimePoint[],
    priority?: Priority,
}

export interface Card extends CardInfo {
    id: string
}

export interface DragInfo {
    stepId: string,
    index: number
}

export interface CardPosition {
    stepId: string,
    position: number
}

export interface Discuss {
    id: string,
    user: User,
    content: string
}
