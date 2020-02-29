import * as ValueStreamApi from '@/web/apis/ValueStreamApi';
import { put, call } from 'redux-saga/effects'
import { TypedAction } from "@/model/action";
import {
    FetchValueStreamPayload, fetchValueStreamSuccess,
    CreateValueStreamPayload, createValueStreamSuccess,
    DeleteValueStreamPayload, deleteValueStreamSuccess,
    DeleteStepPayload, UpdateStepPayload,
    updateStepsSuccess,
    FetchValueStreamMembersPayload,
    fetchValueStreamMembersSuccess,
    InviteMemberPayload,
    inviteMemberSuccess,

} from './valueStreamActions';


function* fetchValueStream(action: TypedAction<FetchValueStreamPayload>) {
    const payload = action.payload!
    const { kanbanId } = payload
    try {
        const result = yield call((action) => {
            return ValueStreamApi.fetchValueStream(kanbanId)
        }, null)
        if (result && result.id) {
            const { id, name, steps, creator } = result
            yield put(fetchValueStreamSuccess({ id, name, steps, creator }))
        }
    } catch (error) {

    }
}

function* fetchValueStreamMembers(action: TypedAction<FetchValueStreamMembersPayload>) {
    const payload = action.payload!
    const { streamId } = payload
    try {
        const result = yield call((action) => {
            return ValueStreamApi.fetchValueStreamMembers(streamId)
        }, null)
        if (result && result.id) {
            const { members } = result
            yield put(fetchValueStreamMembersSuccess(streamId, members))
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
            yield put(createValueStreamSuccess(userId, result))
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

function* inviteMember(action: TypedAction<InviteMemberPayload>) {
    const payload = action.payload!
    const { streamId, memberName } = payload
    try {
        const result = yield call(action => {
            return ValueStreamApi.inviteMember(streamId, memberName)
        }, null)

        if (result && result.id) {
            const { id, members } = result
            yield put(inviteMemberSuccess(id, members))
        }
    } catch (error) {

    }
}

export default {
    fetchValueStream,
    fetchValueStreamMembers,
    createValueStream,
    deleteValueStream,
    updateStep,
    deleteStep,
    inviteMember
}