import React from 'react';
import DropDown, { DropDownProps } from 'antd/es/dropdown';
import 'antd/es/dropdown/style';


export const MDropDown: React.FC<DropDownProps> = React.memo(props => {
    const { children, ...restProps } = props
    return (
        <DropDown {...restProps}>
            {props.children}
        </DropDown>
    )
})
