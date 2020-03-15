import { User } from "@/model/user";
import { Reducer } from "redux";
import { TypedAction } from "@/model/action";
import userActionKeys from "./userActionKeys";
import { LoginSuccessPayload, SetActiveValueStreamPayload } from "./userActions";
import valueStreamActionKeys from "../valueStream/valueStreamActionKeys";
import { CreateValueStreamSuccessPayload, DeleteValueStreamSuccessPayload, RenameValueStreamSuccessPayload } from "../valueStream/valueStreamActions";
import { listImmutableDelete } from "@/web/utils/immutable";
import { ValueStreamBaseInfo } from "@/model/ValueStream";
import { EmptyArray } from "@/model/empty";
import { immutableUpdateList, immutableUpdateObjList } from "@/model/utils";

type UserId = string
export interface UserState {
    currentUser: User | null,
    activeStreamId: string | null,
    availableStreamMap: Record<UserId, ValueStreamBaseInfo[]>
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
            return handleDeleteValueStreamSuccess(state, action.payload)
        case valueStreamActionKeys.renameValueStreamSuccess:
            return handleRenameValueStreamSuccess(state, action.payload)
        default:
            return state
    }
}

const handleLoginSuccess = (state: UserState, payload: LoginSuccessPayload) => {
    const { name, id, available } = payload
    if (!name) return state
    const availableStreamMap = { ...state.availableStreamMap }
    let activeStreamId = null
    const localStorageStreamId = localStorage.getItem('active')

    if (available.length > 0) {
        if (localStorageStreamId && available.findIndex(stream => stream.id === localStorageStreamId)) {
            activeStreamId = localStorageStreamId
        } else {
            activeStreamId = available[0].id
        }
    }
    availableStreamMap[id] = available ?? EmptyArray

    localStorage.setItem('currentUser', JSON.stringify(({ id, name })))
    if (activeStreamId) {
        localStorage.setItem('active', activeStreamId)
    }

    return {
        ...state,
        currentUser: { id, name },
        activeStreamId,
        availableStreamMap
    }
}

const handleLogout = (state: UserState): UserState => {
    localStorage.removeItem('currentUser')

    return {
        ...state,
        currentUser: null
    }
}

const handleSetActiveKanban = (state: UserState, payload: SetActiveValueStreamPayload) => {
    const { streamId } = payload

    if (streamId) localStorage.setItem('active', streamId)

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
        activeStreamId: streamId,
        availableStreamMap
    }
}

const handleDeleteValueStreamSuccess = (state: UserState, payload: DeleteValueStreamSuccessPayload) => {
    const { currentUser } = state
    if (!currentUser) return state
    const { id } = currentUser
    const { streamId } = payload
    const availableStreamMap = { ...state.availableStreamMap }
    for (let userId in availableStreamMap) {
        availableStreamMap[userId] = availableStreamMap[userId].filter(stream => stream.id !== streamId)
    }
    const currentAvailableStream = availableStreamMap[id]
    let activeStreamId = null
    if (currentAvailableStream.length > 0) {
        activeStreamId = currentAvailableStream[0].id
    }
    return {
        ...state,
        availableStreamMap,
        activeStreamId
    }
}

const handleRenameValueStreamSuccess = (state: UserState, payload: RenameValueStreamSuccessPayload) => {
    const { streamId, newName } = payload
    const availableStreamMap = { ...state.availableStreamMap }
    for (let userId in availableStreamMap) {
        const valueStreamList = availableStreamMap[userId]
        if (valueStreamList.findIndex(stream => stream.id === streamId) >= 0) {
            availableStreamMap[userId] = immutableUpdateObjList(valueStreamList, { id: streamId, name: newName }, 'id')
        }
    }
    return {
        ...state,
        availableStreamMap
    }
}