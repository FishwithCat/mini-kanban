import { TypedAction } from "@/model/action";
import valueStreamActionKeys from "./valueStreamActionKeys";
import { ValueStream, ValueStreamStruct, Step } from "@/model/ValueStream";
import { ModalPosition } from "@/model/position";

export interface FetchValueStreamPayload {
    kanbanId: string
}
export const fetchValueStream = (kanbanId: string): TypedAction<FetchValueStreamPayload> => ({
    type: valueStreamActionKeys.fetchValueStream,
    payload: { kanbanId }
})

export interface FetchValueStreamSuccessPayload {
    valueStream: ValueStream
}
export const fetchValueStreamSuccess = (valueStream: ValueStream): TypedAction<FetchValueStreamSuccessPayload> => ({
    type: valueStreamActionKeys.fetchValueStreamSuccess,
    payload: { valueStream }
})

export interface CreateValueStreamPayload {
    userId: string,
    valueStreamStruct: ValueStreamStruct
}
export const createValueStream = (userId: string, valueStreamStruct: ValueStreamStruct): TypedAction<CreateValueStreamPayload> => ({
    type: valueStreamActionKeys.createValueStream,
    payload: { userId, valueStreamStruct }
})

export interface CreateValueStreamSuccessPayload {
    valueStream: ValueStream
}
export const createValueStreamSuccess = (valueStream: ValueStream): TypedAction<CreateValueStreamSuccessPayload> => ({
    type: valueStreamActionKeys.createValueStreamSuccess,
    payload: { valueStream }
})

export interface DeleteValueStreamPayload {
    streamId: string
}
export const deleteValueStream = (streamId: string): TypedAction<DeleteValueStreamPayload> => ({
    type: valueStreamActionKeys.deleteValueStream,
    payload: { streamId }
})

export interface DeleteValueStreamSuccessPayload {
    streamId: string
}
export const deleteValueStreamSuccess = (streamId: string): TypedAction<DeleteValueStreamSuccessPayload> => ({
    type: valueStreamActionKeys.deleteValueStreamSuccess,
    payload: { streamId }
})

export interface UpdateStepsSuccessPayload {
    streamId: string,
    steps: Step[]
}
export const updateStepsSuccess = (streamId: string, steps: Step[]): TypedAction<UpdateStepsSuccessPayload> => ({
    type: valueStreamActionKeys.updateStepsSuccess,
    payload: { streamId, steps }
})

export interface DeleteStepPayload {
    streamId: string,
    stepId: string
}
export const deleteStep = (streamId: string, stepId: string): TypedAction<DeleteStepPayload> => ({
    type: valueStreamActionKeys.deleteStep,
    payload: { streamId, stepId }
})

// export interface DeleteStepSuccessPayload extends DeleteStepPayload { }
// export const deleteStepSuccess = (streamId: string, stepId: string): TypedAction<DeleteStepSuccessPayload> => ({
//     type: valueStreamActionKeys.deleteStepSuccess,
//     payload: { streamId, stepId }
// })

export interface UpdateStepPayload {
    streamId: string,
    newStep: Step
}
export const updateStep = (streamId: string, newStep: Step): TypedAction<UpdateStepPayload> => ({
    type: valueStreamActionKeys.updateStep,
    payload: { streamId, newStep }
})


export interface SetModifiedStepPayload {
    step: Step | null,
    modalPosition?: ModalPosition
}
export const setModifiedStep = (step: Step | null, modalPosition?: ModalPosition): TypedAction<SetModifiedStepPayload> => ({
    type: valueStreamActionKeys.setModifiedStep,
    payload: { step, modalPosition }
})