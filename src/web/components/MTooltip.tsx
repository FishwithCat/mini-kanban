
import React from 'react';
import Tooltip, { TooltipProps } from 'antd/es/tooltip';
import 'antd/es/tooltip/style'


export const MTooltip: React.FC<TooltipProps> = React.memo(props => {
    const { children, ...restProps } = props
    return (
        <Tooltip {...restProps}>
            {children}
        </Tooltip>
    )
})