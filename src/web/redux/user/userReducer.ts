import { User } from "@/model/user";
import { Reducer } from "redux";
import { TypedAction } from "@/model/action";
import userActionKeys from "./userActionKeys";
import { LoginSuccessPayload, SetActiveValueStreamPayload } from "./userActions";
import valueStreamActionKeys from "../valueStream/valueStreamActionKeys";
import { CreateValueStreamSuccessPayload, DeleteValueStreamSuccessPayload } from "../valueStream/valueStreamActions";
import { listImmutableDelete } from "@/web/utils/immutable";

export interface UserState {
    currentUser: User | null,
    activeStreamId: string | null,
}

const initState: UserState = {
    currentUser: null,
    activeStreamId: null,
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
    let activeStreamId = null
    if (available.length > 0) {
        activeStreamId = available[0].id
    }
    return {
        ...state,
        currentUser: { id, name, available },
        activeStreamId
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
    const currentUser: User = { ...state.currentUser }
    const { valueStream } = payload
    const { id, name } = valueStream
    const searchIndex = currentUser.available.findIndex(item => item.id === id)
    if (searchIndex >= 0) return state
    currentUser.available = currentUser.available.concat({ id, name })
    return {
        ...state,
        currentUser,
        activeStreamId: id
    }
}

const handleDeleteKanbanSuccess = (state: UserState, payload: DeleteValueStreamSuccessPayload) => {
    if (!state.currentUser) return state
    const currentUser: User = { ...state.currentUser }
    const { streamId } = payload
    const deleteIndex = currentUser.available.findIndex(item => item.id === streamId)
    if (deleteIndex < 0) return state
    currentUser.available = listImmutableDelete(currentUser.available, deleteIndex)
    let newActiveStreamId = null
    if (currentUser.available.length > 0) {
        newActiveStreamId = currentUser.available[0].id
    }
    return {
        ...state,
        activeStreamId: newActiveStreamId,
        currentUser
    }
}