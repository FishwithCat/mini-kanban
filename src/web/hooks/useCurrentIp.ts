import React from 'react';
import { address } from 'ip'


export const useCurrentIp = () => {
    return address()
}