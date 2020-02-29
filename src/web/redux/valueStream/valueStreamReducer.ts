import valueStreamActionKeys from "./valueStreamActionKeys";
import { Reducer } from "redux";
import { TypedAction } from "@/model/action";
import { CreateValueStreamSuccessPayload, FetchValueStreamSuccessPayload, DeleteValueStreamSuccessPayload, UpdateStepsSuccessPayload, SetModifiedStepPayload, FetchValueStreamMembersSuccessPayload, InviteMemberSuccessPayload } from "./valueStreamActions";
import { ValueStream, ValueStreamStruct, Step } from "@/model/ValueStream";
import { ModalPosition } from "@/model/position";
import { UserBaseInfo } from "@/model/user";
import { immutableUpdateList, immutableUpdateObjList } from "@/model/utils";

export interface ValueStreamState {
    valueStreamStructMap: Record<string, ValueStreamStruct>,
    vsMemberMap: Record<string, UserBaseInfo[]>,
    modifiedStep: {
        data: Step | null,
        modalPosition?: ModalPosition
    } | null
}

const initState = {
    valueStreamStructMap: {},
    vsMemberMap: {},
    modifiedStep: null
}

export const valueStreamReducer: Reducer<ValueStreamState, TypedAction> = (state = initState, action) => {
    switch (action.type) {
        case valueStreamActionKeys.fetchValueStreamSuccess:
            return handleFetchValueStreamSuccess(state, action.payload)
        case valueStreamActionKeys.fetchValueStreamMembersSuccess:
            return handleFetchValueStreamMembersSuccess(state, action.payload)
        case valueStreamActionKeys.createValueStreamSuccess:
            return handleCreateValueStreamSuccess(state, action.payload)
        case valueStreamActionKeys.deleteValueStreamSuccess:
            return handleDeleteValueStreamSuccess(state, action.payload)
        case valueStreamActionKeys.updateStepsSuccess:
            return handleUpdateStepsSuccess(state, action.payload)
        case valueStreamActionKeys.setModifiedStep:
            return handleSetModifiedStep(state, action.payload)
        case valueStreamActionKeys.inviteMemberSuccess:
            return handleInviteMemberSuccess(state, action.payload)
        default:
            return state
    }
}


const handleFetchValueStreamSuccess = (state: ValueStreamState, payload: FetchValueStreamSuccessPayload) => {
    const { valueStream } = payload
    return {
        ...state,
        valueStreamStructMap: _updateValueStream(state.valueStreamStructMap, valueStream)
    }
}

const handleFetchValueStreamMembersSuccess = (state: ValueStreamState, payload: FetchValueStreamMembersSuccessPayload) => {
    const { streamId, members } = payload
    const vsMemberMap = { ...state.vsMemberMap }
    vsMemberMap[streamId] = members
    return {
        ...state,
        vsMemberMap
    }
}

const handleCreateValueStreamSuccess = (state: ValueStreamState, payload: CreateValueStreamSuccessPayload) => {
    const { valueStream } = payload
    const { id } = valueStream
    return {
        ...state,
        valueStreamStructMap: _updateValueStream(state.valueStreamStructMap, valueStream),
    }
}

const _updateValueStream = (valueStreamStructMap: Record<string, ValueStreamStruct>, newKanban: ValueStream) => {
    const { id, ...restProperties } = newKanban
    if (!id) return valueStreamStructMap
    const newMap = { ...valueStreamStructMap }
    newMap[id] = restProperties
    return newMap
}

const handleDeleteValueStreamSuccess = (state: ValueStreamState, payload: DeleteValueStreamSuccessPayload) => {
    const { streamId: kanbanId } = payload
    const valueStreamStructMap = { ...state.valueStreamStructMap }
    delete valueStreamStructMap[kanbanId]
    return {
        ...state,
        valueStreamStructMap
    }
}

const handleUpdateStepsSuccess = (state: ValueStreamState, payload: UpdateStepsSuccessPayload) => {
    const { streamId, steps: newSteps } = payload
    const valueStreamStructMap = { ...state.valueStreamStructMap }
    const streamStruct = valueStreamStructMap[streamId]
    if (!streamStruct) return state
    streamStruct.steps = newSteps
    return {
        ...state,
        valueStreamStructMap
    }
}

const handleSetModifiedStep = (state: ValueStreamState, payload: SetModifiedStepPayload) => {
    const { step, modalPosition } = payload
    if (step === null) {
        return {
            ...state,
            modifiedStep: null
        }
    }
    return {
        ...state,
        modifiedStep: {
            data: step,
            modalPosition
        }
    }
}

const handleInviteMemberSuccess = (state: ValueStreamState, payload: InviteMemberSuccessPayload) => {
    const { streamId, members } = payload
    const vsMemberMap = { ...state.vsMemberMap }
    vsMemberMap[streamId] = members
    return {
        ...state,
        vsMemberMap
    }
}