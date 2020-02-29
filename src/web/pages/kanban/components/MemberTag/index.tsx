import React from 'react';
import { UserBaseInfo } from '@/model/user';
import Chip from '@material-ui/core/Chip';
import styled from 'styled-components';
import withStyles from '@material-ui/core/styles/withStyles';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import { immutableUpdateList, immutableDeleteFromList, immutableDeleteObjFromList, immutableUpdateObjList } from '@/model/utils';


interface MemberTagProps {
    members: UserBaseInfo[],
    participants: UserBaseInfo[],
    onChange(participants: UserBaseInfo[]): void
}
export const MemberTag: React.FC<MemberTagProps> = React.memo(props => {
    const { members, participants, onChange } = props
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menuAnchorEl)

    const getMemberName = (memberId: string | undefined) => {
        if (!memberId) return null
        const memberInfo = members.find(member => member.id === memberId)
        return memberInfo ? memberInfo.name : '已离队'
    }

    const onCloseMenu = () => {
        setMenuAnchorEl(null)
    }

    const onChoseMember = (newMember: UserBaseInfo) => {
        const newParticipants = immutableUpdateObjList(participants, newMember, 'id')
        onChange(newParticipants)
        setMenuAnchorEl(null)
    }

    const handleDelete = (member: UserBaseInfo) => {
        const newParticipants = immutableDeleteObjFromList(participants, member, "id")
        onChange(newParticipants)
    }

    return (
        <MemberTagWrapper>
            <i className="iconfont icon-adduser"
                onClick={(event: React.MouseEvent<HTMLElement>) => setMenuAnchorEl(event.currentTarget)}
            />
            <div>
                {
                    participants.map(members => (
                        <StyledChip key={members.id}
                            size="small"
                            label={members.name}
                            onDelete={() => handleDelete(members)}
                        />
                    ))
                }
            </div>

            <StyledMenu
                anchorEl={menuAnchorEl}
                keepMounted
                open={open}
                onClose={onCloseMenu}
                TransitionComponent={Fade}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                {
                    members.map(member => (
                        <MenuItem key={member.id} onClick={() => onChoseMember(member)}>
                            <i className="iconfont icon-edit" />
                            <div className="name">{member.name}</div>
                        </MenuItem>
                    ))
                }
            </StyledMenu>
        </MemberTagWrapper>
    )
})

const StyledMenu = withStyles(() => ({
    paper: {
        border: 'none',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)'
    },
    list: {
        padding: '5px 0'
    }
}))(Menu)

const StyledChip = withStyles(() => ({
    root: {
        height: '20px',
        marginBottom: '2px'
    },
    label: {
        paddingLeft: '6px',
        paddingRight: '6px'
    }
}))(Chip)

const MemberTagWrapper = styled.div`
    &:after {
        content: '';
        display: block;
        clear: both;
        visibility: hidden;
    }

    .icon-adduser {
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background-color: #2196f3;
        color: #fff;
        border-radius: 50%;
        float: left;
        margin-right: 5px;
        margin-bottom: 2px;
        cursor: pointer;
    }

    .MuiChip-root {
        margin-right: 5px;
    }
`

const MenuItem = styled.li`
    display: flex;
    cursor: pointer;
    outline: none;
    line-height: 32px;
    height: 32px;
    padding: 0 16px;

    &.danger {
        color: #f44336;
    }

    > i { 
        font-size: 14px;
        margin-right: 8px;
        transition: color .2s ease-out;
    }

    &:hover {
        background-color: #f7f7f7;

        &:not(.danger) i {
            color: #2196f3;
        }
    }
`