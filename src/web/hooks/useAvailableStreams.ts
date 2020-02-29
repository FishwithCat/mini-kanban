import React from 'react';
import { RootState } from '@/web/redux/create-store';
import { useSelector } from 'react-redux';
import { EmptyArray } from '@/model/empty';

export const useAvailableStreams = (userId: string | undefined) => {
    const availableStreamMap = useSelector((state: RootState) => state.userReducer.availableStreamMap)

    return userId ? availableStreamMap[userId] ?? EmptyArray : EmptyArray
}