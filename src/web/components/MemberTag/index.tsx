import React from 'react';
import { UserBaseInfo } from '@/model/user';
import styled from 'styled-components';
import { immutableUpdateList, immutableDeleteFromList, immutableDeleteObjFromList, immutableUpdateObjList } from '@/model/utils';
import { MChip } from '@/web/components/MChip';
import { MDropDown } from '@/web/components/MDropdown';
import { MMenu, MenuItem } from '@/web/components/MMenu';


interface MemberTagProps {
    className?: string,
    members: UserBaseInfo[],
    participants: UserBaseInfo[],
    onChange(participants: UserBaseInfo[]): void
}
export const MemberTag: React.FC<MemberTagProps> = React.memo(props => {
    const { members, participants, onChange } = props

    const onChoseMember = (newMember: UserBaseInfo) => {
        const newParticipants = immutableUpdateObjList(participants, newMember, 'id')
        onChange(newParticipants)
    }

    const handleDelete = (member: UserBaseInfo) => {
        const newParticipants = immutableDeleteObjFromList(participants, member, "id")
        onChange(newParticipants)
    }

    const menu = (
        <MMenu className={props.className}>
            {
                members.map(member => (
                    <StyledMenuItem key={member.id} className="member-tags"
                        disabled={participants.findIndex(item => item.id === member.id) >= 0}
                        onClick={() => onChoseMember(member)}>
                        <i className="iconfont icon-user" />
                        <div className="name">{member.name}</div>
                    </StyledMenuItem>
                ))
            }
        </MMenu>
    )

    return (
        <MemberTagWrapper>
            <MDropDown overlay={menu} trigger={['click']}>
                <i className="iconfont icon-adduser" />
            </MDropDown>
            <div>
                {
                    participants.map(member => (
                        <StyledChip key={member.id} className="member-tag"
                            closable
                            onClose={() => handleDelete(member)}
                        >
                            {member.name}
                        </StyledChip>
                    ))
                }
            </div>
        </MemberTagWrapper>
    )
})

const StyledChip = styled(MChip)`
    background: transparent;
    margin-bottom: 2px;
    margin-right: 5px;
`

const MemberTagWrapper = styled.div`
    &:after {
        content: '';
        display: block;
        clear: both;
        visibility: hidden;
    }

    .icon-adduser {
        width: 22px;
        height: 22px;
        line-height: 22px;
        margin-bottom: 2px;
        text-align: center;
        background-color: #2196f3;
        color: #fff;
        border-radius: 50%;
        float: left;
        margin-right: 8px;
        cursor: pointer;
    }
`

const StyledMenuItem = styled(MenuItem)`
    display: flex;
    > i { 
         margin-right: 8px;
         transition: color .2s ease-out;
    }
`
