import { Reducer } from "redux";
import { TypedAction } from "@/model/action";
import statisticActionKeys from "./statisticActionKeys";
import { FetchThroughputDataPayload, FetchLeadTimeDataPayload, FetchLeadTimeDataSuccessPayload } from './statisticActions';
import { FetchStatus } from "@/model/fetch";


type cardId = string

export interface StatisticState {
    leadTimeData: {
        streamId: string | null,
        status: FetchStatus,
        data: Record<number, cardId>
    }
}

const initState: StatisticState = {
    leadTimeData: { status: FetchStatus.Idle, streamId: null, data: {} }
}


export const statisticReducer: Reducer<StatisticState, TypedAction> = (state = initState, action) => {
    switch (action.type) {
        case statisticActionKeys.fetchLeadTimeData:
            return handleFetchLeadTimeData(state, action.payload)
        case statisticActionKeys.fetchLeadTimeDataSuccess:
            return handleFetchLeadTimeDataSuccess(state, action.payload)
        case statisticActionKeys.fetchThroughputDataSuccess:
            return handleFetchThroughputDataSuccess(state, action.payload)
        default:
            return state
    }
}

const handleFetchLeadTimeData = (state: StatisticState, payload: FetchLeadTimeDataPayload): StatisticState => {
    return {
        ...state,
        leadTimeData: {
            status: FetchStatus.Loading,
            streamId: payload.streamId,
            data: state.leadTimeData.data
        }
    }
}

const handleFetchLeadTimeDataSuccess = (state: StatisticState, payload: FetchLeadTimeDataSuccessPayload): StatisticState => {
    const { streamId, data } = payload
    return {
        ...state,
        leadTimeData: {
            status: FetchStatus.Loading,
            streamId,
            data
        }
    }
}

const handleFetchThroughputDataSuccess = (state: StatisticState, payload: FetchThroughputDataPayload) => {
    return state
}