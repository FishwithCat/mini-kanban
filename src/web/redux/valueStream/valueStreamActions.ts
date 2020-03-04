import { TypedAction } from "@/model/action";
import valueStreamActionKeys from "./valueStreamActionKeys";
import { ValueStream, ValueStreamStruct, Step, ValueStreamBaseInfo } from "@/model/ValueStream";
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

export interface RenameValueStreamPayload {
    streamId: string,
    newName: string
}
export const renameValueStream = (streamId: string, newName: string): TypedAction<RenameValueStreamPayload> => ({
    type: valueStreamActionKeys.renameValueStream,
    payload: { streamId, newName }
})

export type RenameValueStreamSuccessPayload = RenameValueStreamPayload
export const renameValueStreamSuccess = (streamId: string, newName: string): TypedAction<RenameValueStreamSuccessPayload> => ({
    type: valueStreamActionKeys.renameValueStreamSuccess,
    payload: { streamId, newName }
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


export interface SetModifiedStepPayload { step: Step | null }
export const setModifiedStep = (step: Step | null): TypedAction<SetModifiedStepPayload> => ({
    type: valueStreamActionKeys.setModifiedStep,
    payload: { step }
})

export interface SetModifiedValueStreamPayload { valueStream: ValueStreamBaseInfo | null }
export const setModifiedValueStream = (valueStream: ValueStreamBaseInfo | null): TypedAction<SetModifiedValueStreamPayload> => ({
    type: valueStreamActionKeys.setModifiedValueStream,
    payload: { valueStream }
})

export interface InviteMemberPayload {
    streamId: string,
    memberName: string
}
export const inviteMember = (streamId: string, memberName: string): TypedAction<InviteMemberPayload> => ({
    type: valueStreamActionKeys.inviteMember,
    payload: { streamId, memberName }
})

export interface DeleteMemberPayload {
    streamId: string,
    memberId: string
}
export const deleteMember = (streamId: string, memberId: string): TypedAction<DeleteMemberPayload> => ({
    type: valueStreamActionKeys.deleteMember,
    payload: { streamId, memberId }
})

export interface UpdateMemberSuccessPayload {
    streamId: string,
    members: UserBaseInfo[]
}
export const updateMemberSuccess = (streamId: string, members: UserBaseInfo[]): TypedAction<UpdateMemberSuccessPayload> => ({
    type: valueStreamActionKeys.updateMemberSuccess,
    payload: { streamId, members }
})
