import React from 'react';
import Drawer, { DrawerProps } from 'antd/es/drawer';
import 'antd/es/drawer/style';
import styled from 'styled-components';

export const MDrawer: React.FC<DrawerProps> = React.memo(props => {
    const { children, ...restProps } = props
    return (
        <StyledDrawer {...restProps}>
            {children}
        </StyledDrawer>
    )
})

const StyledDrawer = styled(Drawer)`
    .ant-drawer-body {
        padding: 0;
    }
`