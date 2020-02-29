import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/web/redux/create-store';
import { fetchValueStream, fetchValueStreamMembers } from '@/web/redux/valueStream/valueStreamActions';
import { UserBaseInfo } from '@/model/user';


export const useValueStreamMembers = (streamId: string) => {
    const dispatch = useDispatch()
    const vsMembersMap = useSelector((state: RootState) => state.valueStreamReducer.vsMemberMap)

    const members = React.useMemo<UserBaseInfo[] | undefined>(() => {
        return vsMembersMap[streamId]
    }, [vsMembersMap, streamId])

    React.useEffect(() => {
        if (!streamId) return
        dispatch(fetchValueStreamMembers(streamId))
    }, [streamId])

    return members
}