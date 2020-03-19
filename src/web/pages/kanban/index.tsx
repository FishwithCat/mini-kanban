import React from 'react';
import styled from 'styled-components';
import { AppSideBar } from '@/web/components/AppSideBar';
import { useSelector } from 'react-redux';
import { RootState } from '@/web/redux/create-store';
import { useCurrentUser } from '@/web/hooks/useCurrentUser';
import { CreateValueStream } from './components/CreateValueStream';
import { ValueStream } from './valueStream';
import { useAvailableStreams } from '@/web/hooks/useAvailableStreams';


interface KanbanProps {

}
export const Kanban: React.FC<KanbanProps> = React.memo(props => {

    // const dispatch = useDispatch()
    const currentUser = useCurrentUser()
    const availableStream = useAvailableStreams(currentUser?.id)

    const activeKanbanId = useSelector((state: RootState) => state.userReducer.activeStreamId)

    return (
        <KanbanWrapper>
            <AppSideBar />
            {
                availableStream.length == 0 ?
                    <CreateValueStream user={currentUser} />
                    :
                    <div className="content">
                        {
                            activeKanbanId && <ValueStream id={activeKanbanId} />
                        }
                    </div>
            }
        </KanbanWrapper>
    )
})

const KanbanWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

    .app-side-bar {
        border-bottom: 1px solid #f7f7f7;
        background-color: #fff;
    }

    .menu {
        border-bottom: 1px solid #e5e5e5;
    }

    .content {
        flex: 1;
        overflow: hidden;
    }
`