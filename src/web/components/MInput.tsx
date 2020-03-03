import React from 'react';
import Input, { InputProps } from 'antd/es/input';
import 'antd/es/input/style';

export const MInput: React.FC<InputProps> = React.memo(props => {
    return (
        <Input {...props} />
    )
})