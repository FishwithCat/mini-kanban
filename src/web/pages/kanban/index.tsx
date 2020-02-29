import React from 'react';
import styled from 'styled-components';
import { AppSideBar } from '@/web/components/AppSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/web/redux/create-store';
import { useCurrentUser } from '@/web/hooks/useCurrentUser';
import { CreateKanban } from './components/CreateKanban';
import { ValueStream } from './valueStream';
import { Menu } from './menu';

interface KanbanProps {

}
export const Kanban: React.FC<KanbanProps> = React.memo(props => {

    // const dispatch = useDispatch()
    const currentUser = useCurrentUser()

    const activeKanbanId = useSelector((state: RootState) => state.userReducer.activeStreamId)

    return (
        <KanbanWrapper>
            <AppSideBar />
            {
                currentUser?.available.length == 0 ?
                    <CreateKanban user={currentUser} />
                    :
                    <>
                        {/* <Menu /> */}

                        <div className="content">
                            {
                                activeKanbanId && <ValueStream id={activeKanbanId} />

                            }
                        </div>
                    </>
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
        padding: 10px;
        overflow-x: auto;
    }
`