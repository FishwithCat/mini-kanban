import React from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { useCurrentUser } from '@/web/hooks/useCurrentUser';
import { useDispatch } from 'react-redux';
import { login } from '../redux/user/userActions';
import { UserBaseInfo } from '@/model/user';


export const PrivateRouter: React.FC<RouteProps> = React.memo(props => {
    const history = useHistory()
    const currentUser = useCurrentUser()
    const dispatch = useDispatch()

    const isAuthenticated = React.useMemo(() => {
        if (currentUser?.id) return true
        return false
    }, [currentUser])

    const redirect = React.useCallback(() => {
        const cookie = localStorage.getItem('currentUser')
        if (!cookie) {
            setTimeout(() => {
                history.replace("/login");
            }, 300)
        } else {
            const currentUser: UserBaseInfo = JSON.parse(cookie)
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