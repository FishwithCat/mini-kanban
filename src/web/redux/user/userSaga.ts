import { put, call } from 'redux-saga/effects'
import { TypedAction } from "@/model/action";
import { LoginPayload, loginSuccess } from "./userActions";
import * as UserApi from '@/web/apis/UserApi';


function* login(action: TypedAction<LoginPayload>) {
    const payload = action.payload!
    const { name } = payload
    try {
        const result = yield call((action) => {
            return UserApi.login(name)
        }, null)
        if (result && result.id) {
            const { id, name, available } = result
            yield put(loginSuccess(id, name, available))
        }
    } catch (error) {

    }
}


export default {
    login
}