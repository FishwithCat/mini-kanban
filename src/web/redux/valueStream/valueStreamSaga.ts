import * as ValueStreamApi from '@/web/apis/ValueStreamApi';
import { put, call } from 'redux-saga/effects'
import { TypedAction } from "@/model/action";
import {
    FetchValueStreamPayload, fetchValueStreamSuccess,
    CreateValueStreamPayload, createValueStreamSuccess,
    DeleteValueStreamPayload, deleteValueStreamSuccess,
    DeleteStepPayload, UpdateStepPayload,
    updateStepsSuccess,

} from './valueStreamActions';


function* fetchValueStream(action: TypedAction<FetchValueStreamPayload>) {
    const payload = action.payload!
    const { kanbanId } = payload
    try {
        const result = yield call((action) => {
            return ValueStreamApi.fetchValueStream(kanbanId)
        }, null)
        if (result && result.id) {
            const { id, name, steps } = result
            yield put(fetchValueStreamSuccess({ id, name, steps }))
        }
    } catch (error) {

    }
}

function* createValueStream(action: TypedAction<CreateValueStreamPayload>) {
    const payload = action.payload!
    const { userId, valueStreamStruct } = payload
    try {
        const result = yield call((action) => {
            return ValueStreamApi.createValueStream(userId, valueStreamStruct)
        }, null)
        if (result && result.id) {
            yield put(createValueStreamSuccess(result))
        }
    } catch (error) {

    }
}

function* deleteValueStream(action: TypedAction<DeleteValueStreamPayload>) {
    const payload = action.payload!
    const { streamId } = payload
    try {
        const result = yield call((action) => {
            return ValueStreamApi.deleteValueStream(streamId)
        }, null)
        if (result && result.id) {
            yield put(deleteValueStreamSuccess(result.id))
        }
    } catch (error) {

    }
}

function* updateStep(action: TypedAction<UpdateStepPayload>) {
    const payload = action.payload!
    const { streamId, newStep } = payload
    try {
        const result = yield call(action => {
            return ValueStreamApi.updateStep(streamId, newStep)
        }, null)
        if (result && result.id) {
            const { steps } = result
            yield put(updateStepsSuccess(streamId, steps))
        }
    } catch (error) {

    }
}

function* deleteStep(action: TypedAction<DeleteStepPayload>) {
    const payload = action.payload!
    const { streamId, stepId } = payload
    try {
        const result = yield call(action => {
            return ValueStreamApi.deleteStep(streamId, stepId)
        }, null)
        if (result && result.id) {
            const { steps } = result
            yield put(updateStepsSuccess(streamId, steps))
        }
    } catch (error) {

    }
}

export default {
    fetchValueStream,
    createValueStream,
    deleteValueStream,
    updateStep,
    deleteStep,
}