import React from 'react';
import { useDispatch } from 'react-redux';
import { createValueStream } from '@/web/redux/valueStream/valueStreamActions';
import { User } from '@/model/user';
import { ValueStreamStruct } from '@/model/ValueStream';
import styled from 'styled-components';

interface CreateValueStreamProps {
    user: User | null
}
export const CreateValueStream: React.FC<CreateValueStreamProps> = React.memo(props => {
    const { user } = props

    const dispatch = useDispatch()


    const onCreateValueStream = React.useCallback(() => {
        if (!user?.id) return
        const newStream: ValueStreamStruct = {
            name: '新看板',
            steps: []
        }
        dispatch(createValueStream(user?.id, newStream))
    }, [dispatch, user])

    return (
        <Wrapper className="create-new-kanban">
            {/* <div onClick={onCreateValueStream}> */}
            <i className="create-btn iconfont icon-appstoreadd"
                onClick={onCreateValueStream}
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

