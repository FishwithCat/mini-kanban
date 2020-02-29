import { Request } from './ApiBuilder';
import isEmpty from 'lodash/isEmpty';


export const login = (name: string) => {
    if (isEmpty(name)) return
    return Request.post(`/user/login`, { name }).then(res => {
        return res.data
    })
}