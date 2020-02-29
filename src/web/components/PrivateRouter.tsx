import React from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { useCurrentUser } from '@/web/hooks/useCurrentUser';


export const PrivateRouter: React.FC<RouteProps> = React.memo(props => {
    const history = useHistory()
    const currentUser = useCurrentUser()

    const isAuthenticated = React.useMemo(() => {
        if (currentUser?.id) return true
        return false
    }, [currentUser])

    const redirect = React.useCallback(() => {
        setTimeout(() => {
            history.replace("/login");
        }, 300)
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