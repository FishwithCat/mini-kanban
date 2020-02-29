import React from 'react';
import logo from '@/web/images/logo.png';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/web/redux/user/userActions';
import { RootState } from '@/web/redux/create-store';


interface AppSideBarProps { }
export const AppSideBar: React.FC<AppSideBarProps> = React.memo(props => {

    const dispatch = useDispatch()
    const activeValueStreamId = useSelector((state: RootState) => state.userReducer.activeStreamId)

    const onLogOut = React.useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    // const onDeleteKanban = React.useCallback(() => {
    //     if (!activeKanbanId) return
    //     dispatch(deleteValueStream(activeKanbanId))
    // }, [dispatch, activeKanbanId])

    return (
        <AppSideBarWrapper className="app-side-bar">
            <img src={logo} className="logo" />

            <div className="menu-icons">
                <i className="" />
            </div>

            <LogoutBtn className="iconfont icon-export" onClick={onLogOut} />
        </AppSideBarWrapper>
    )
})

const AppSideBarWrapper = styled.div`
    padding: 5px 20px;
    display: flex;

    .logo {
        height: 32px;
        flex-shrink: 0;
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