import React from 'react';
import styled from 'styled-components';
import { useCardDetail } from '@/web/hooks/useCardDetail';

interface CardDetailProps {
    streamId: string,
    cardId: string
}
export const CardDetail: React.FC<CardDetailProps> = React.memo(props => {

    const { streamId, cardId } = props

    const cardDetail = useCardDetail(streamId, cardId)

    return (
        <Wrapper className="card-detail">
            test
            {cardId}
        </Wrapper>
    )
})

const Wrapper = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
    height: 100%;
`