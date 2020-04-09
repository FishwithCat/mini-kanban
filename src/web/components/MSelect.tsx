import React from 'react';
import Select, { SelectProps } from 'antd/es/select';
import 'antd/es/select/style';
import styled from 'styled-components';


export const MSelect: React.FC<SelectProps<string>> = React.memo(props => {
    const { children, ...restProps } = props
    return (
        <Select {...restProps}>
            {children}
        </Select>
    )
})

export const Option = Select.Option

export const BlockMSelect = styled(MSelect)`
    width: 100%;
`