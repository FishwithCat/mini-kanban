import { Period } from "./time";
import { Card } from "./card";
import dayjs, { Dayjs } from 'dayjs'

export abstract class Query {
    abstract generateCondition(): (card: Card) => boolean
}

export class BaseQuery extends Query {
    period: Period;

    constructor(period: Period) {
        super()
        this.period = period
    }

    generateCondition = () => {
        return (card: Card) => {
            const createDate = card.timeLine?.[0]
            if (!createDate) return false
            const { start, end } = this.period
            return dayjs(createDate.timeStamp).isAfter(dayjs(start)) && dayjs(createDate.timeStamp).isBefore(dayjs(end))
        }
    }
}


export interface Query {
    period: Period
}