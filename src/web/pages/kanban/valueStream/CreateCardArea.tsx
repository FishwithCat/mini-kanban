import React from 'react';
import styled from 'styled-components';
import { MTextArea } from '@/web/components/MTextArea';
import { CardInfo } from '@/model/card';
import { UserBaseInfo } from '@/model/user';
import { useValueStreamMembers } from '@/web/hooks/useValueStreamMembers';
import { EmptyArray } from '@/model/empty';
import { MemberTag } from '@/web/components/MemberTag';


interface CreateCardAreaProps {
    streamId: string,
    stepId: string,
    showCreateBox: boolean,
    onSave(card: CardInfo): void,
    onCancel(): void
}
export const CreateCardArea: React.FC<CreateCardAreaProps> = React.memo(props => {
    const { streamId, stepId, showCreateBox, onSave, onCancel } = props
    const members = useValueStreamMembers(streamId)


    const onCreateCard = React.useCallback(
        (title: string, participants: UserBaseInfo[]) => {
            onSave({
                title,
                stepId,
                participants,
                position: new Date().valueOf()
            })
        },
        [stepId, onSave]
    )

    return showCreateBox ?
        <CreateCardBox members={members ?? EmptyArray}
            onCancel={onCancel}
            onSave={onCreateCard}
        />
        :
        null
})



interface CreateCardBoxProps {
    members: UserBaseInfo[]
    onCancel(): void,
    onSave(title: string, participants: UserBaseInfo[]): void
}
const CreateCardBox: React.FC<CreateCardBoxProps> = React.memo(props => {
    const { members } = props
    const [title, setTitle] = React.useState('')
    const [participants, setParticipants] = React.useState<UserBaseInfo[]>([])


    const onTitleChange = React.useCallback(
        e => {
            setTitle(e.target.value)
        },
        []
    )

    const onSaveCard = React.useCallback(
        () => {
            props.onSave(title, participants)
        },
        [title, participants, props.onSave]
    )

    const isSavedAble = () => {
        return title !== '' && title != null
    }

    return (
        <CreateCardBoxWrapper className="create-card-box">
            <div className="title">
                标题
            </div>
            <FreezedTextArea
                value={title}
                onChange={onTitleChange}
                autoSize={{
                    minRows: 1,
                    maxRows: 2
                }}
                autoFocus
            />
            <div className="title" style={{ marginTop: '10px' }}>
                负责人
            </div>
            <MemberTag members={members}
                participants={participants}
                onChange={setParticipants}
            />
            <div className="actions">
                <div className={`button save ${isSavedAble() ? '' : 'disabled'}`} onClick={onSaveCard}>保 存</div>
                <div className="button cancel" onClick={props.onCancel}>取 消</div>
            </div>
        </CreateCardBoxWrapper>
    )
})

const FreezedTextArea = styled(MTextArea)`
    resize: none
`

const CreateCardBoxWrapper = styled.div`
    padding: 10px;
    background-color: #fff;
    margin: 7px 7px 0;
    border-radius: 4px;
    box-shadow: 0 1px 2px 0px rgba(0, 0, 0, .1);

    .title {
        margin-bottom: 5px;
    }

    > .actions {
        margin-top: 6px;

        &:after {
            content: '';
            clear: both;
            visibility: hidden;
            display: block;
        }

        > .button {
            float: left;
            margin-right: 10px;
            line-height: 28px;
            height: 28px;
            padding: 0 10px;
            cursor: pointer;

            &.save {
                background-color: #2196f3;
                color: #fff;
                border-radius: 2px;
                transition: all .2s ease-out;

                &.disabled {
                    background-color: #e0e0e0;
                    color: rgba(0, 0, 0, 0.26);
                }

                &:not(.disabled):hover {
                    background-color: #1769AA;
                }
            }

            &.cancel {
                color: #8091a5;
                padding: 0 2px;
            }
        }
    }
`