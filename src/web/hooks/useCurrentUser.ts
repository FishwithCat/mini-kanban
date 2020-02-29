import React from 'react';
import { RootState } from '@/web/redux/create-store';
import { useSelector } from 'react-redux';

export const useCurrentUser = () => {
    const currentUser = useSelector((state: RootState) => state.userReducer.currentUser)
    return currentUser
}