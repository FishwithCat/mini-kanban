import { User } from "@/model/user";
import { Reducer } from "redux";
import { TypedAction } from "@/model/action";
import userActionKeys from "./userActionKeys";
import { LoginSuccessPayload, SetActiveValueStreamPayload } from "./userActions";
import valueStreamActionKeys from "../valueStream/valueStreamActionKeys";
import { CreateValueStreamSuccessPayload, DeleteValueStreamSuccessPayload } from "../valueStream/valueStreamActions";
import { listImmutableDelete } from "@/web/utils/immutable";
import { ValueStreamBaseInfo } from "@/model/ValueStream";
import { EmptyArray } from "@/model/empty";
import { immutableUpdateList } from "@/model/utils";

export interface UserState {
    currentUser: User | null,
    activeStreamId: string | null,
    availableStreamMap: Record<string, ValueStreamBaseInfo[]>
}

const initState: UserState = {
    currentUser: null,
    activeStreamId: null,
    availableStreamMap: {}
}

export const userReducer: Reducer<UserState, TypedAction> = (state = initState, action) => {
    switch (action.type) {
        case userActionKeys.loginSuccess:
            return handleLoginSuccess(state, action.payload)
        case userActionKeys.logout:
            return handleLogout(state)
        case userActionKeys.setActiveValueStream:
            return handleSetActiveKanban(state, action.payload)
        case valueStreamActionKeys.createValueStreamSuccess:
            return handleCreateKanbanSuccess(state, action.payload)
        case valueStreamActionKeys.deleteValueStreamSuccess:
            return handleDeleteKanbanSuccess(state, action.payload)
        default:
            return state
    }
}

const handleLoginSuccess = (state: UserState, payload: LoginSuccessPayload) => {
    const { name, id, available } = payload
    if (!name) return state
    const availableStreamMap = { ...state.availableStreamMap }
    let activeStreamId = null
    if (available.length > 0) {
        activeStreamId = available[0].id
    }
    availableStreamMap[id] = available ?? EmptyArray
    return {
        ...state,
        currentUser: { id, name },
        activeStreamId,
        availableStreamMap
    }
}

const handleLogout = (state: UserState): UserState => {
    return {
        ...state,
        currentUser: null
    }
}

const handleSetActiveKanban = (state: UserState, payload: SetActiveValueStreamPayload) => {
    const { streamId } = payload
    return {
        ...state,
        activeStreamId: streamId
    }
}

const handleCreateKanbanSuccess = (state: UserState, payload: CreateValueStreamSuccessPayload) => {
    if (!state.currentUser) return state
    const { userId, valueStream } = payload
    const { id: streamId, name } = valueStream
    const availableStreamMap = { ...state.availableStreamMap }
    const availableList = immutableUpdateList(availableStreamMap[userId] ?? [], { id: streamId, name })
    availableStreamMap[userId] = availableList
    return {
        ...state,
        availableStreamMap
    }
}

const handleDeleteKanbanSuccess = (state: UserState, payload: DeleteValueStreamSuccessPayload) => {
    if (!state.currentUser) return state
    const { streamId } = payload
    const availableStreamMap = { ...state.availableStreamMap }
    for (let userId in availableStreamMap) {
        availableStreamMap[userId] = availableStreamMap[userId].filter(stream => stream.id !== streamId)
    }
    return {
        ...state,
        availableStreamMap
    }
}