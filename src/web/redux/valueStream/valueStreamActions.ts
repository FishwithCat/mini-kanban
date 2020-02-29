import { TypedAction } from "@/model/action";
import valueStreamActionKeys from "./valueStreamActionKeys";
import { ValueStream, ValueStreamStruct, Step, ValueStreamBaseInfo } from "@/model/ValueStream";
import { ModalPosition } from "@/model/position";
import { UserBaseInfo } from "@/model/user";

export interface FetchValueStreamPayload { kanbanId: string }
export const fetchValueStream = (kanbanId: string): TypedAction<FetchValueStreamPayload> => ({
    type: valueStreamActionKeys.fetchValueStream,
    payload: { kanbanId }
})

export interface FetchValueStreamSuccessPayload { valueStream: ValueStream }
export const fetchValueStreamSuccess = (valueStream: ValueStream): TypedAction<FetchValueStreamSuccessPayload> => ({
    type: valueStreamActionKeys.fetchValueStreamSuccess,
    payload: { valueStream }
})

export interface FetchValueStreamMembersPayload { streamId: string }
export const fetchValueStreamMembers = (streamId: string): TypedAction<FetchValueStreamMembersPayload> => ({
    type: valueStreamActionKeys.fetchValueStreamMembers,
    payload: { streamId }
})

export interface FetchValueStreamMembersSuccessPayload {
    streamId: string,
    members: UserBaseInfo[]
}
export const fetchValueStreamMembersSuccess = (streamId: string, members: UserBaseInfo[]): TypedAction<FetchValueStreamMembersSuccessPayload> => ({
    type: valueStreamActionKeys.fetchValueStreamMembersSuccess,
    payload: { streamId, members }
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
    userId: string
    valueStream: ValueStream
}
export const createValueStreamSuccess = (userId: string, valueStream: ValueStream): TypedAction<CreateValueStreamSuccessPayload> => ({
    type: valueStreamActionKeys.createValueStreamSuccess,
    payload: { userId, valueStream }
})

export interface DeleteValueStreamPayload { streamId: string }
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

export interface InviteMemberPayload {
    streamId: string,
    memberName: string
}
export const inviteMember = (streamId: string, memberName: string): TypedAction<InviteMemberPayload> => ({
    type: valueStreamActionKeys.inviteMember,
    payload: { streamId, memberName }
})

export interface InviteMemberSuccessPayload {
    streamId: string,
    members: UserBaseInfo[]
}
export const inviteMemberSuccess = (streamId: string, members: UserBaseInfo[]): TypedAction<InviteMemberSuccessPayload> => ({
    type: valueStreamActionKeys.inviteMemberSuccess,
    payload: { streamId, members }
})