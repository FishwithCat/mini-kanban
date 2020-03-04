import React from 'react';
import logo from '@/web/images/logo.png';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setActiveValueStream } from '@/web/redux/user/userActions';
import { RootState } from '@/web/redux/create-store';
import { useCurrentUser } from '@/web/hooks/useCurrentUser';
import { EmptyArray } from '@/model/empty';
import { ValueStreamBaseInfo, ValueStreamStruct } from '@/model/ValueStream';
import { MSelect, Option } from '../MSelect';
import { MDropDown } from '../MDropdown';
import { MenuItem, MMenu } from '../MMenu';
import { MTooltip } from '../MTooltip';
import { setModifiedStep, setModifiedValueStream, createValueStream, renameValueStream } from '@/web/redux/valueStream/valueStreamActions';
import { MModal } from '../MModal';
import { ModifyValueStream } from './ModifyValueStream';



interface AppSideBarProps { }
export const AppSideBar: React.FC<AppSideBarProps> = React.memo(props => {

    const dispatch = useDispatch()
    const currentUser = useCurrentUser()
    const activeValueStreamId = useSelector((state: RootState) => state.userReducer.activeStreamId)
    const availableStreamMap = useSelector((state: RootState) => state.userReducer.availableStreamMap)
    const modifiedStream = useSelector((state: RootState) => state.valueStreamReducer.modifiedValueStream)

    const availableStreams = React.useMemo<ValueStreamBaseInfo[]>(() => {
        if (!currentUser) return EmptyArray
        return availableStreamMap[currentUser.id] ?? EmptyArray
    }, [currentUser, availableStreamMap])

    const onLogOut = React.useCallback(() => {
        dispatch(logout())
    }, [])

    const switchValueStream = React.useCallback(
        (streamId) => {
            dispatch(setActiveValueStream(streamId))
        },
        []
    )
    // const onDeleteKanban = React.useCallback(() => {
    //     if (!activeKanbanId) return
    //     dispatch(deleteValueStream(activeKanbanId))
    // }, [dispatch, activeKanbanId])

    const menu = React.useMemo(() => (
        <MMenu>
            <StyledMenuItem onClick={onLogOut}>
                <i className="iconfont icon-export" />
                <span className="name"> 退 出</span>
            </StyledMenuItem>
        </MMenu>
    ), [onLogOut])


    const showCreateValueStream = React.useCallback(() => {
        /** hack: id 为 '', 认为是新建看板 */
        dispatch(setModifiedValueStream({ id: '', name: '新看板' }))
    }, [])

    const showModifyStream = React.useCallback(() => {
        const modifiedStream = availableStreams.find(stream => stream.id === activeValueStreamId)
        if (!modifiedStream) return
        dispatch(setModifiedValueStream(modifiedStream))
    }, [activeValueStreamId, availableStreams])

    const hideModifyValueStreamModal = React.useCallback(() => {
        dispatch(setModifiedValueStream(null))
    }, [])

    const onSaveValueStream = React.useCallback((valueStream: ValueStreamBaseInfo) => {
        if (!currentUser?.id) return
        const { id, name } = valueStream
        /** hack: id 为 '', 认为是新建看板 */
        if (id === '') {
            const newStream: ValueStreamStruct = { name, steps: [] }
            dispatch(createValueStream(currentUser.id, newStream))
        } else {
            dispatch(renameValueStream(id, name))
        }
    }, [currentUser?.id])

    return (
        <AppSideBarWrapper className="app-side-bar">
            <img src={logo} className="logo" />
            <div className="switch-stream-area">
                <MSelect value={activeValueStreamId!}
                    onChange={switchValueStream}
                    bordered={false}
                >
                    {
                        availableStreams.filter(stream => stream.id !== undefined)
                            .map(stream => (
                                <Option value={stream.id!}>
                                    {stream.name}
                                </Option>
                            ))
                    }
                </MSelect>
            </div>


            <div className="menu-icons">
                <MTooltip title="价值流设置">
                    <i className="iconfont icon-edit" onClick={showModifyStream} />
                </MTooltip>
                <MTooltip title="新建价值流">
                    <i className="iconfont icon-appstoreadd" onClick={showCreateValueStream} />
                </MTooltip>

                <MDropDown overlay={menu} trigger={['click']}>
                    <i className="iconfont icon-menu" />
                </MDropDown>
            </div>

            {/* <LogoutBtn className="iconfont icon-export" onClick={onLogOut} /> */}
            {
                <MModal visible={Boolean(modifiedStream)}
                    footer={null} width="fit-content"
                    closable={false}
                    onCancel={hideModifyValueStreamModal}
                >
                    {
                        modifiedStream &&
                        <ModifyValueStream
                            valueStream={modifiedStream}
                            onSave={onSaveValueStream}
                        />
                    }
                </MModal>
            }
        </AppSideBarWrapper >
    )
})

const StyledMenuItem = styled(MenuItem)`
    display: flex;

    > i {
        margin-right: 10px;
    }
`


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
        flex: 1;
        text-align: right;

        > i {
            font-size: 20px;
            cursor: pointer;
            margin-left: 15px;
            height: 32px;
            line-height: 32px;
            transition: color .3s ease-out;

            &:hover {
                color: #2196f3;
            }
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