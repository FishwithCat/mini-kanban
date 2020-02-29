export interface TimePoint {
    stepId: string,
    timeStamp: number
}

export interface CardInfo {
    title: string,
    stepId: string,
    describe?: string,
    participants?: string[],
    timeLine?: TimePoint[],
    priority?: string,
    position: number /** position 决定卡片前后顺序 */
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