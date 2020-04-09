import { Period } from "./time";
import { Card } from "./card";
import dayjs, { Dayjs } from 'dayjs'
import { StepRange } from "./ValueStream";

export abstract class Query {
    abstract generateCondition(): (card: Card) => boolean
}

export class BaseQuery extends Query {
    period: Period;
    stepRange: StepRange;

    constructor(period: Period, stepRange: StepRange) {
        super()
        this.period = period
        this.stepRange = stepRange
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