import * as StatisticApi from '@/web/apis/StatisticApi';
import { put, call } from 'redux-saga/effects'
import { TypedAction } from '@/model/action';
import { FetchThroughputDataPayload, fetchThroughputDataSuccess, fetchLeadTimeDataSuccess } from './statisticActions';


function* fetchLeadTimeData(action: TypedAction<FetchThroughputDataPayload>) {
    const payload = action.payload!
    const { streamId, query } = payload
    try {
        const result = yield call(action => {
            return StatisticApi.fetchLeadTimeData(streamId, query)
        }, null)

        if (result) {
            yield put(fetchLeadTimeDataSuccess(streamId, result))
        }
    } catch (error) {

    }
}


function* fetchThroughputData(action: TypedAction<FetchThroughputDataPayload>) {
    const payload = action.payload!
    const { streamId, query } = payload
    try {
        const result = yield call(action => {
            return StatisticApi.fetchThroughputData(streamId, query)
        }, null)

        if (result) {
            yield put(fetchThroughputDataSuccess(streamId, result))
        }
    } catch (error) {

    }
}

export default {
    fetchLeadTimeData,
    fetchThroughputData
}