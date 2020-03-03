import React from 'react';
import Button, { ButtonProps } from 'antd/es/button';
import 'antd/es/button/style';


export const MButton: React.FC<ButtonProps> = React.memo(props => {
    return <Button {...props}>
        {props.children}
    </Button>
})