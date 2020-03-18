import React from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { useCurrentUser } from '@/web/hooks/useCurrentUser';
import { useDispatch } from 'react-redux';
import { login } from '../redux/user/userActions';
import { UserBaseInfo } from '@/model/user';
import { CURRENT_USER } from '../localstorage';


export const PrivateRouter: React.FC<RouteProps> = React.memo(props => {
    const history = useHistory()
    const currentUser = useCurrentUser()
    const dispatch = useDispatch()

    const isAuthenticated = React.useMemo(() => {
        if (currentUser?.id) return true
        return false
    }, [currentUser])

    const redirect = React.useCallback(() => {
        const storage = localStorage.getItem(CURRENT_USER)
        if (!storage) {
            setTimeout(() => {
                history.replace("/login");
            }, 300)
        } else {
            const userInStorage = JSON.parse(storage)
            const { id, name } = userInStorage
            const currentUser: UserBaseInfo = { id, name }
            dispatch(login(currentUser.name))
        }
    }, [history, isAuthenticated])

    React.useEffect(() => {
        if (!isAuthenticated) redirect()
    }, [isAuthenticated])

    return (
        isAuthenticated ?
            <Route {...props} />
            :
            null
    )
})