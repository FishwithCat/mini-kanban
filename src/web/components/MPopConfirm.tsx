import React from 'react';
import Popconfirm, { PopconfirmProps } from 'antd/es/popconfirm';
import 'antd/es/popconfirm/style';

export const MPopConfirm: React.FC<PopconfirmProps> = React.memo(props => {
    const { children, ...restProps } = props
    return (
        <Popconfirm {...restProps}>
            {children}
        </Popconfirm>
    )
})