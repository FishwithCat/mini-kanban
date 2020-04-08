import { Request } from './ApiBuilder';
import { BaseQuery } from '@/model/query';


export const fetchLeadTimeData = (streamId: string, query: BaseQuery) => {
    return Request.post(`/statistic/leadtime`, {
        streamId,
        period: query.period
    }).then(res => {
        return res.data
    })
}

export const fetchThroughputData = (streamId: string, query: BaseQuery) => {
    return Request.post(`/statistic/throughput`, {
        streamId,
        period: query.period
    }).then(res => {
        return res.data
    })
}