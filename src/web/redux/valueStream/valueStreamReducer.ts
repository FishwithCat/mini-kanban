import valueStreamActionKeys from "./valueStreamActionKeys";
import { Reducer } from "redux";
import { TypedAction } from "@/model/action";
import { CreateValueStreamSuccessPayload, FetchValueStreamSuccessPayload, DeleteValueStreamSuccessPayload, SetModifiedStepPayload, UpdateStepsSuccessPayload } from "./valueStreamActions";
import { ValueStream, ValueStreamStruct, Step } from "@/model/ValueStream";
import { ModalPosition } from "@/model/position";

export interface ValueStreamState {
    valueStreamStructMap: Record<string, ValueStreamStruct>,
    modifiedStep: {
        data: Step | null,
        modalPosition?: ModalPosition
    } | null
}

const initState = {
    valueStreamStructMap: {},
    modifiedStep: null
}

export const valueStreamReducer: Reducer<ValueStreamState, TypedAction> = (state = initState, action) => {
    switch (action.type) {
        case valueStreamActionKeys.fetchValueStreamSuccess:
            return handleFetchValueStreamSuccess(state, action.payload)
        case valueStreamActionKeys.createValueStreamSuccess:
            return handleCreateValueStreamSuccess(state, action.payload)
        case valueStreamActionKeys.deleteValueStreamSuccess:
            return handleDeleteValueStreamSuccess(state, action.payload)
        case valueStreamActionKeys.updateStepsSuccess:
            return handleUpdateStepsSuccess(state, action.payload)
        case valueStreamActionKeys.setModifiedStep:
            return handleSetModifiedStep(state, action.payload)
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