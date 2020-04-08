import statisticActionKeys from "./statisticActionKeys";
import { BaseQuery } from "@/model/query";
import { TypedAction } from "@/model/action";


type cardId = string

export interface FetchLeadTimeDataPayload {
    streamId: string,
    query: BaseQuery
}
export const fetchLeadTimeData = (streamId: string, query: BaseQuery): TypedAction<FetchThroughputDataPayload> => ({
    type: statisticActionKeys.fetchLeadTimeData,
    payload: { streamId, query }
})

export interface FetchLeadTimeDataSuccessPayload {
    streamId: string,
    data: Record<number, cardId>
}
export const fetchLeadTimeDataSuccess = (streamId: string, data: Record<number, cardId>): TypedAction<FetchLeadTimeDataSuccessPayload> => ({
    type: statisticActionKeys.fetchLeadTimeDataSuccess,
    payload: { streamId, data }
})

export interface FetchThroughputDataPayload {
    streamId: string,
    query: BaseQuery
}
export const fetchThroughputData = (streamId: string, query: BaseQuery): TypedAction<FetchThroughputDataPayload> => ({
    type: statisticActionKeys.fetchThroughputData,
    payload: { streamId, query }
})

export interface FetchThroughputDataSuccessPayload {
    streamId: string,
    data: Record<number, cardId>
}
export const fetchThroughputDataSuccess = (streamId: string, data: Record<number, cardId>): TypedAction<FetchThroughputDataSuccessPayload> => ({
    type: statisticActionKeys.fetchThroughputDataSuccess,
    payload: { streamId, data }
})