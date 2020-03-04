import valueStreamActionKeys from "./valueStreamActionKeys";
import { Reducer } from "redux";
import { TypedAction } from "@/model/action";
import {
    CreateValueStreamSuccessPayload, FetchValueStreamSuccessPayload,
    DeleteValueStreamSuccessPayload, UpdateStepsSuccessPayload,
    SetModifiedStepPayload, FetchValueStreamMembersSuccessPayload,
    UpdateMemberSuccessPayload,
    SetModifiedValueStreamPayload, RenameValueStreamSuccessPayload
} from "./valueStreamActions";
import { ValueStream, ValueStreamStruct, Step, ValueStreamBaseInfo } from "@/model/ValueStream";
import { UserBaseInfo } from "@/model/user";
// import { immutableUpdateList, immutableUpdateObjList } from "@/model/utils";

export interface ValueStreamState {
    valueStreamStructMap: Record<string, ValueStreamStruct>,
    vsMemberMap: Record<string, UserBaseInfo[]>,
    modifiedStep: Step | null,
    modifiedValueStream: ValueStreamBaseInfo | null
}

const initState = {
    valueStreamStructMap: {},
    vsMemberMap: {},
    modifiedStep: null,
    modifiedValueStream: null
}

export const valueStreamReducer: Reducer<ValueStreamState, TypedAction> = (state = initState, action) => {
    switch (action.type) {
        case valueStreamActionKeys.fetchValueStreamSuccess:
            return handleFetchValueStreamSuccess(state, action.payload)
        case valueStreamActionKeys.fetchValueStreamMembersSuccess:
            return handleFetchValueStreamMembersSuccess(state, action.payload)
        case valueStreamActionKeys.createValueStreamSuccess:
            return handleCreateValueStreamSuccess(state, action.payload)
        case valueStreamActionKeys.renameValueStreamSuccess:
            return handleRenameValueStreamSuccess(state)
        case valueStreamActionKeys.deleteValueStreamSuccess:
            return handleDeleteValueStreamSuccess(state, action.payload)
        case valueStreamActionKeys.updateStepsSuccess:
            return handleUpdateStepsSuccess(state, action.payload)
        case valueStreamActionKeys.setModifiedStep:
            return handleSetModifiedStep(state, action.payload)
        case valueStreamActionKeys.setModifiedValueStream:
            return handleSetModifiedValueStream(state, action.payload)
        case valueStreamActionKeys.updateMemberSuccess:
            return handleUpdateMemberSuccess(state, action.payload)
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
    return {
        ...state,
        valueStreamStructMap: _updateValueStream(state.valueStreamStructMap, valueStream),
        modifiedValueStream: null
    }
}

const handleRenameValueStreamSuccess = (state: ValueStreamState) => {
    return {
        ...state,
        modifiedValueStream: null
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
    const { step } = payload
    return {
        ...state,
        modifiedStep: step
    }
}

const handleSetModifiedValueStream = (state: ValueStreamState, payload: SetModifiedValueStreamPayload) => {
    const { valueStream } = payload
    return {
        ...state,
        modifiedValueStream: valueStream
    }
}

const handleUpdateMemberSuccess = (state: ValueStreamState, payload: UpdateMemberSuccessPayload) => {
    const { streamId, members } = payload
    const vsMemberMap = { ...state.vsMemberMap }
    vsMemberMap[streamId] = members
    return {
        ...state,
        vsMemberMap
    }
}