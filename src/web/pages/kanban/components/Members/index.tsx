import React from 'react';
import styled from 'styled-components';
import { useValueStreamMembers } from '@/web/hooks/useValueStreamMembers';
import { Separator } from '@/web/components/Separator';
import { UserBaseInfo } from '@/model/user';
import { useCurrentUser } from '@/web/hooks/useCurrentUser';
import { useDispatch } from 'react-redux';
import { inviteMember, deleteMember } from '@/web/redux/valueStream/valueStreamActions';

// const COLORS = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']

interface MembersProps {
    streamId: string,
    // closeMembers(): void
}
export const Members: React.FC<MembersProps> = React.memo(props => {
    const { streamId } = props
    const [filter, setFilter] = React.useState('')

    const members = useValueStreamMembers(streamId)
    const currentUser = useCurrentUser()
    const dispatch = useDispatch()

    const filterResultIsNull = React.useMemo(() => {
        return (members ?? []).filter(member => member.name.indexOf(filter) >= 0).length === 0
    }, [filter, members])

    const isCreator = React.useMemo(() => {
        return members && members.length > 0 && currentUser?.id == members[0].id
    }, [members, currentUser?.id])

    const onInviteMember = () => {
        if (!isCreator || filter === '' || filter == undefined) return
        dispatch(inviteMember(streamId, filter))
    }

    const onDeleteMember = (memberId: string) => {
        dispatch(deleteMember(streamId, memberId))
    }

    return (
        <MembersWrapper className="members">
            <div className="head">
                <div className="title">看板成员</div>
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
                                    color={member.color ?? '#0693E3'}
                                    canDelete={member.id !== members![0].id}
                                    onDelete={onDeleteMember}
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
    color: string,
    canDelete: boolean,
    onDelete(memberId: string): void
}
const MemberInfo: React.FC<MemberInfoProps> = React.memo(props => {
    const { member, color, canDelete, onDelete } = props
    const name = member.name

    return (
        <MemberInfoWrapper className="member-info">
            <div className="avatar" style={{ backgroundColor: color }}>
                {name.slice(0, 1).toUpperCase() + name.slice(1, 2)}
            </div>
            <div className="full">
                {member.name}
            </div>
            {
                canDelete &&
                <i className="delete-member iconfont icon-delete"
                    onClick={() => onDelete(member.id)}
                />
            }
        </MemberInfoWrapper>
    )
})

const MemberInfoWrapper = styled.div`
    display: flex;
    height: 42px;
    padding: 5px 10px;

    .delete-member {
        display: none;
    }

    &:hover {
        background-color: #f0f0f0;
        
        .delete-member {
            display: inline-block;
        }
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

    .delete-member {
        line-height: 32px;
        width: 32px;
        margin-left: 10px;
        text-align: center;
        cursor: pointer;
        color: #f44336;
    }
`

const MembersWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

    .head {
        font-size: 16px;
        padding: 10px 15px 8px;
        display: flex;
        height: 41px;
        
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
            border: none;
            padding: 0 5px;
            font-size: 16px;
            background-color: transparent;
            border-bottom: 1px solid #ddd;
            transition: all .2s ease-out;

            &:focus {
                border-bottom: 1px solid #2196f3;
            }
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

    .member-list {
        flex: 1;
        overflow-y: auto;
    }
`