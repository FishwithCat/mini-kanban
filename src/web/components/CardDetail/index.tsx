import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useCardDetail } from '@/web/hooks/useCardDetail';
import { useDispatch } from 'react-redux';
import { fetchCardDetail, updateCard, setModifiedCard } from '@/web/redux/cards/cardsActions';
import { EmptyArray } from '@/model/empty';
import { MemberTag } from '@/web/components/MemberTag';
import { useValueStreamMembers } from '@/web/hooks/useValueStreamMembers';
import { Card, Priority } from '@/model/card';
import { MEditor } from '../MEditor';
import { UserBaseInfo } from '@/model/user';
import { MButton } from '../MButton';
import { MDropDown } from '../MDropdown';
import { MMenu, MenuItem } from '../MMenu';


const priorityChoices = [
    { name: '默认', value: Priority.default, color: '#2196f3' },
    { name: '低', value: Priority.low, color: '#8c8c8c' },
    { name: '高', value: Priority.high, color: '#ff9800' },
    { name: '紧急', value: Priority.urgent, color: '#f44336' },
]


const quillModules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link'],
    ],
}

interface CardDetailProps {
    streamId: string,
    cardId: string
}
export const CardDetail: React.FC<CardDetailProps> = React.memo(props => {

    const { streamId, cardId } = props
    const dispatch = useDispatch()
    const cardDetail = useCardDetail(cardId)
    const members = useValueStreamMembers(streamId)

    const [cardToEdit, setCardToEdit] = React.useState<Card | null>(null)

    React.useEffect(() => {
        dispatch(fetchCardDetail(streamId, cardId))
        setCardToEdit(null)
    }, [streamId, cardId])

    React.useEffect(() => {
        if (!cardDetail) return
        setCardToEdit(cardDetail)
    }, [cardDetail])

    const getPriorityName = (priority: Priority): string => {
        const match = priorityChoices.find(item => item.value === priority)
        return match?.name ?? '默认'
    }

    const getPriorityColor = (priority: Priority): string => {
        const match = priorityChoices.find(item => item.value === priority)
        return match?.color ?? priorityChoices[0].color
    }

    const getPriorityBoxStyle = (priority: Priority): React.CSSProperties => {
        const color = getPriorityColor(priority)
        return {
            color,
            border: `1px solid ${color}`
        }
    }

    const onPriorityChange = (newPriority: Priority) => {
        if (!cardToEdit) return
        setCardToEdit({ ...cardToEdit, priority: newPriority })
    }

    const onMemberTagChange = (newParticipants: UserBaseInfo[]) => {
        if (!cardToEdit) return
        setCardToEdit({ ...cardToEdit, participants: newParticipants })
    }

    const onDescribeChange = (newDescribe: any) => {
        if (!cardToEdit) return
        setCardToEdit({ ...cardToEdit, describe: newDescribe })
    }

    const onUpdateCard = () => {
        if (!cardToEdit) return
        dispatch(updateCard(streamId, cardToEdit))
    }

    const onClose = () => {
        dispatch(setModifiedCard(streamId, null))
    }

    const priorityMenu = () => {
        return <MMenu>
            {
                priorityChoices.map(choice => (
                    <StyledMenuItem key={choice.value} onClick={() => onPriorityChange(choice.value)}>
                        <span className="name">{choice.name}</span>
                    </StyledMenuItem>
                ))
            }
        </MMenu>
    }

    return cardToEdit ? (
        <Wrapper className="card-detail">
            <div className="header">
                <h1 className="title">{cardToEdit.title}</h1>
                {
                    cardDetail?.timeLine && cardDetail?.timeLine.length > 0 &&
                    <TimeStamp>
                        {dayjs(cardDetail.timeLine[0].timeStamp).format('YYYY/MM/DD hh:mm')}
                    </TimeStamp>

                }
            </div>
            <div className="card-content">

                <MemberTag members={members}
                    participants={cardToEdit.participants ?? EmptyArray}
                    onChange={onMemberTagChange}
                />
                <div className="base-info">
                    <FormItem className="priority">
                        <div className="form-head">
                            <i className="iconfont icon-thunderbolt-fill" style={{ color: getPriorityColor(cardToEdit.priority ?? Priority.default) }} />
                            <div>优先级</div>
                        </div>
                        <div className="form-content">
                            <MDropDown overlay={priorityMenu}>
                                <span className="priority-box" style={getPriorityBoxStyle(cardToEdit.priority ?? Priority.default)}>
                                    {getPriorityName(cardToEdit.priority ?? Priority.default)}
                                </span>
                            </MDropDown>
                        </div>
                    </FormItem>

                    <FormItem className="describe">
                        <div className="form-head">
                            <i className="iconfont icon-edit-square" />
                            <div>备注</div>
                        </div>

                    </FormItem>
                    <MEditor
                        defaultValue={cardToEdit.describe}
                        modules={quillModules}
                        onChange={onDescribeChange}
                    />
                </div>
            </div>

            <div className="footer">
                <MButton type="primary" onClick={onUpdateCard}> 保 存 </MButton>
                <MButton onClick={onClose}> 取 消 </MButton>
            </div>

        </Wrapper >
    ) : null
})

const Wrapper = styled.div`
    background-color: #fafafa;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .header {
        padding: 20px 20px 0;

        .title {
            font-size: 20px;
            margin: 0;
        }
    }
    
    .card-content {
        flex: 1;
        padding: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
       
        .base-info {
            margin-top: 7px;
            display: flex;
            flex-direction: column;
            flex: 1;

            .quill {
                flex: 1;
                margin-top: 5px;
                display: flex;
                flex-direction: column;

                .ql-toolbar {
                    flex-shrink: 0;
                }

                .ql-container {
                    flex: 1;
                }
            }
        }
    }

    .footer {
        padding: 10px 20px;
        flex-shrink: 0;
        text-align: right;

        > button {
            margin-left: 10px;
        }
    }
`

const TimeStamp = styled.div`
    color: #8c8c8c;
    font-size: 12px;
    text-align: right;
`

const FormItem = styled.div`
    display: flex;
    height: 32px;
    line-height: 32px;

    .priority-box {
        line-height: 22px;
        display: inline-block;
        padding: 0 6px;
        border-radius: 4px;
        cursor: pointer;
    }

    .form-head{
        width: 100px;
        flex-shrink: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #8c8c8c;
        display: flex;

        > i {
            margin-right: 10px;
            font-size: 20px;
        }
    }

    .form-content {
        flex: 1;
    }
`

const StyledMenuItem = styled(MenuItem)`
    padding: 5px 20px;
    /* display: flex; */

    /* > i {
        margin-right: 10px;
    } */
`