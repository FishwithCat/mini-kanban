import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/web/redux/create-store';
import { UserBaseInfo } from '@/model/user';
import { EmptyArray } from '@/model/empty';


const COLORS = ['#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']

export const useValueStreamMembers = (streamId: string): UserBaseInfo[] => {

    const vsMembers = useSelector((state: RootState) => state.valueStreamReducer.vsMemberMap[streamId] ?? EmptyArray)

    const members = React.useMemo<UserBaseInfo[]>(() => {
        return vsMembers.map((member, index: number) => {
            return {
                ...member,
                color: COLORS[index % COLORS.length]
            }
        })
    }, [vsMembers, streamId])

    // React.useEffect(() => {
    //     if (!streamId) return
    //     dispatch(fetchValueStreamMembers(streamId))
    // }, [streamId])

    return members
}