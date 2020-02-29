import { Action } from "redux";

export interface TypedAction<T = any> extends Action {
    type: string,
    payload?: T
}