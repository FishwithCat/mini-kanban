import React from 'react';
import Tabs, { TabsProps } from 'antd/es/tabs';
import 'antd/es/tabs/style';


export const MTabs: React.FC<TabsProps> = React.memo(props => {
    const { children, ...restProps } = props

    return (
        <Tabs {...restProps}>
            {children}
        </Tabs>
    )
})

export const MTabPane = Tabs.TabPane