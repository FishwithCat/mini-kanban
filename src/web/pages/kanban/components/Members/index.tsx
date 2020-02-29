import React from 'react';
import styled from 'styled-components';
import { useValueStreamMembers } from '@/web/hooks/useValueStreamMembers';
import { Separator } from '@/web/components/Separator';
import { UserBaseInfo } from '@/model/user';
import { useCurrentUser } from '@/web/hooks/useCurrentUser';
import { useDispatch } from 'react-redux';
import { inviteMember } from '@/web/redux/valueStream/valueStreamActions';

const COLORS = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']

interface MembersProps {
    open: boolean,
    streamId: string,
    closeMembers(): void
}
export const Members: React.FC<MembersProps> = React.memo(props => {
    const { open, streamId, closeMembers } = props
    const [filter, setFilter] = React.useState('')

    const members = useValueStreamMembers(streamId)
    const currentUser = useCurrentUser()
    const dispatch = useDispatch()

    const filterResultIsNull = React.useMemo(() => {
        return (members ?? []).filter(member => member.name.indexOf(filter) >= 0).length === 0
    }, [filter, members])

    const isCreator = React.useMemo(() => {
        return members && currentUser?.id == members[0].id
    }, [members, currentUser?.id])

    const onInviteMember = () => {
        if (!isCreator || filter === '' || filter == undefined) return
        dispatch(inviteMember(streamId, filter))
    }

    const membersModalStyle = React.useMemo(() => {
        if (!open) {
            return {
                transform: `translateX(250px)`
            }
        }
    }, [open])

    return (
        <MembersWrapper className="members" style={membersModalStyle}>
            <div className="head">
                <div className="title">看板成员</div>
                <div className="icons">
                    <i className="iconfont icon-close" onClick={closeMembers} />
                </div>
            </div>
            <Separator />
            <div className="search-box">
                <input className="search-input" value={filter} onChange={e => setFilter(e.target.value)} />
                {
                    isCreator &&
                    <i className={filterResultIsNull ? "iconfont icon-adduser" : "disabled iconfont icon-adduser"}
                        onClick={onInviteMember}
                    />
                }
            </div>
            <div className="member-list">
                {
                    (members ?? []).filter(member => member.name.indexOf(filter) >= 0)
                        .map((member, index) => {
                            return (
                                <MemberInfo key={member.id} member={member}
                                    color={COLORS[index % COLORS.length]}
                                />
                            )
                        })
                }
            </div>
        </MembersWrapper>
    )
})

interface MemberInfoProps {
    member: UserBaseInfo,
    color: string
}
const MemberInfo: React.FC<MemberInfoProps> = React.memo(props => {
    const { member, color } = props
    const name = member.name

    return (
        <MemberInfoWrapper className="member-info">
            <div className="avatar" style={{ backgroundColor: color }}>
                {name.slice(0, 1).toUpperCase() + name.slice(1, 2)}
            </div>
            <div className="full">
                {member.name}
            </div>
        </MemberInfoWrapper>
    )
})

const MemberInfoWrapper = styled.div`
    display: flex;
    height: 42px;
    padding: 5px 10px;

    &:hover {
        background-color: #f0f0f0;
    }

    .avatar {
        line-height: 32px;
        width: 32px;
        border-radius: 50%;
        text-align: center;
        color: #fff;
    }

    .full {
        line-height: 30px;
        flex: 1;
        padding: 0 10px;
    }

`

const MembersWrapper = styled.div`
    width: 250px;
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    box-shadow: -3px 0 3px rgba(0, 0, 0, .1);
    background: #fafafa;
    z-index: 9;
    transition: transform .2s ease-out;

    .head {
        font-size: 16px;
        padding: 10px 15px 8px;
        display: flex;
        
        .title {
            letter-spacing: 1px;
            flex-shrink: 0;
        }

        > .icons {
            flex: 1;
            text-align: right;
            
            > i {
                transition: color .2s ease-out;
            }

            > .icon-close {
                cursor: pointer;

                &:hover {
                    color: #f44336;
                }
            }
        }
    }

    .search-box {
        display: flex;
        padding: 5px 10px;

        .search-input {
            outline: none;
            height: 32px;
            flex: 1;
            border-radius: 2px;
            border: 1px solid #ddd;
            padding: 0 5px;
            font-size: 16px;
        }

        > i {
            font-size: 18px;
            width: 32px;
            line-height: 32px;
            flex-shrink: 0;
            text-align: center;
            cursor: pointer;
            transition: color .3s ease-out;
            margin-left: 5px;

            &.disabled {
                color: #ddd;
            }

            &:not(.disabled):hover {
                color: #2196f3;
            }
        }
    }
`