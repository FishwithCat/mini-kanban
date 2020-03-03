import React from 'react';
import logo from '@/web/images/logo.png';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setActiveValueStream } from '@/web/redux/user/userActions';
import { RootState } from '@/web/redux/create-store';
import { useCurrentUser } from '@/web/hooks/useCurrentUser';
import { EmptyArray } from '@/model/empty';
import { ValueStreamBaseInfo } from '@/model/ValueStream';
import { MSelect, Option } from '../MSelect';



interface AppSideBarProps { }
export const AppSideBar: React.FC<AppSideBarProps> = React.memo(props => {

    const dispatch = useDispatch()
    const currentUser = useCurrentUser()
    const activeValueStreamId = useSelector((state: RootState) => state.userReducer.activeStreamId)
    const availableStreamMap = useSelector((state: RootState) => state.userReducer.availableStreamMap)

    const availableStreams = React.useMemo<ValueStreamBaseInfo[]>(() => {
        if (!currentUser) return EmptyArray
        return availableStreamMap[currentUser.id] ?? EmptyArray
    }, [currentUser, availableStreamMap])

    const onLogOut = React.useCallback(() => {
        dispatch(logout())
    }, [])

    const switchValueStream = React.useCallback(
        (event) => {
            dispatch(setActiveValueStream(event.target.value))
        },
        []
    )
    // const onDeleteKanban = React.useCallback(() => {
    //     if (!activeKanbanId) return
    //     dispatch(deleteValueStream(activeKanbanId))
    // }, [dispatch, activeKanbanId])

    return (
        <AppSideBarWrapper className="app-side-bar">
            <img src={logo} className="logo" />
            <div className="switch-stream-area">
                <MSelect value={activeValueStreamId!}
                    onChange={switchValueStream}
                    bordered={false}
                >
                    {
                        availableStreams.map(stream => (
                            <Option value={stream.id}>
                                {stream.name}
                            </Option>
                        ))
                    }
                </MSelect>
            </div>


            <div className="menu-icons">
            </div>

            <LogoutBtn className="iconfont icon-export" onClick={onLogOut} />
        </AppSideBarWrapper >
    )
})


const AppSideBarWrapper = styled.div`
    padding: 5px 20px;
    display: flex;

    .logo {
        height: 32px;
        flex-shrink: 0;
    }

    .switch-stream-area {
        margin-left: 10px;
    }

    .menu-icons {
        display: flex;
        flex: 1;
        text-align: center;

        > i {
            font-size: 24px;
            cursor: pointer;
            margin-left: 4px;
            height: 32px;
            line-height: 32px;
        }
    }
`

const LogoutBtn = styled.i`
    cursor: pointer;
    font-size: 20px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin: 0 auto;
    flex-shrink: 0;

    &:hover {
        color: #f44336;
    }
`