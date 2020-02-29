import React from 'react';
import { useDispatch } from 'react-redux';
import { createValueStream } from '@/web/redux/valueStream/valueStreamActions';
import { User } from '@/model/user';
import { ValueStreamStruct } from '@/model/ValueStream';
import styled from 'styled-components';

interface CreateKanbanProps {
    user: User | null
}
export const CreateKanban: React.FC<CreateKanbanProps> = React.memo(props => {
    const { user } = props

    const dispatch = useDispatch()


    const onCreateKanban = React.useCallback(() => {
        if (!user?.id) return
        const newStream: ValueStreamStruct = {
            name: '新看板',
            steps: []
        }
        dispatch(createValueStream(user?.id, newStream))
    }, [dispatch, user])

    return (
        <Wrapper className="create-new-kanban">
            {/* <div onClick={onCreateKanban}> */}
            <i className="create-btn iconfont icon-appstoreadd"
                onClick={onCreateKanban}
            />
            {/* <div> 新建看板 </div> */}
            {/* </div> */}
        </Wrapper>
    )
})

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5f5f5;
    
    .create-btn {
        font-size: 64px;
        transition: all .3s ease-out;
        color: #777;
        cursor: pointer;
        
        &:hover {
            transform: scale(1.2);
            color: #2196f3;
        }
    }
`

