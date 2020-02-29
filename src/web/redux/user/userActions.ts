import userActionKeys from "./userActionKeys";
import { TypedAction } from "@/model/action";
import { IpAddr, User } from "@/model/user";
import { ValueStreamBaseInfo } from "@/model/ValueStream";

export interface LoginPayload {
    name: string,
}
export const login = (name: string): TypedAction<LoginPayload> => ({
    type: userActionKeys.login,
    payload: { name }
})

export interface LoginSuccessPayload {
    id: string,
    name: string,
    available: ValueStreamBaseInfo[]
}
export const loginSuccess = (id: string, name: string, available: ValueStreamBaseInfo[]): TypedAction<LoginSuccessPayload> => ({
    type: userActionKeys.loginSuccess,
    payload: { id, name, available }
})

export const logout = (): TypedAction => ({
    type: userActionKeys.logout
})

export interface SetActiveValueStreamPayload {
    streamId: string | null
}
export const setActiveValueStream = (streamId: string | null): TypedAction<SetActiveValueStreamPayload> => ({
    type: userActionKeys.setActiveValueStream,
    payload: { streamId }
})