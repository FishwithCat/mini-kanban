import React from 'react';
import Menu, { MenuProps } from 'antd/es/menu';
import 'antd/es/menu/style';

export const MMenu: React.FC<MenuProps> = React.memo(props => {
    const { children, ...restProps } = props
    return (
        <Menu {...restProps}>
            {props.children}
        </Menu>
    )
})

export const MenuItem = Menu.Item