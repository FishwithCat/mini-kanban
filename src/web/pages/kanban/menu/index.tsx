import React from 'react';
import styled from 'styled-components';

interface MenuProps {

}
export const Menu: React.FC<MenuProps> = React.memo(props => {
    return (
        <Wrapper className="menu">

        </Wrapper>
    )
})

const Wrapper = styled.div`
    height: 40px;
    background: #fff;
`