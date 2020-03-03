import React from 'react';
import Tag, { TagProps } from 'antd/es/tag';
import 'antd/es/tag/style';
import styled from 'styled-components';

export const MChip: React.FC<TagProps> = React.memo(props => {
    const { children, ...restProps } = props
    return <StyledTag {...restProps}>
        {props.children}
    </StyledTag>
})

const StyledTag = styled(Tag)`
    border-radius: 11px;
`