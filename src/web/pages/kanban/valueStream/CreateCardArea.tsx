import React from 'react';
import styled from 'styled-components';
import { Textarea } from '@/web/components/TextArea';
import { CardInfo } from '@/model/card';


interface CreateCardAreaProps {
    stepId: string,
    showCreateBox: boolean,
    onSave(card: CardInfo): void,
    onCancel(): void
}
export const CreateCardArea: React.FC<CreateCardAreaProps> = React.memo(props => {
    const { stepId, showCreateBox, onSave, onCancel } = props


    const onCreateCard = React.useCallback(
        (title: string) => {
            onSave({
                title,
                stepId,
                position: new Date().valueOf()
            })
        },
        [stepId, onSave]
    )

    return showCreateBox ?
        <CreateCardBox onCancel={onCancel} onSave={onCreateCard} />
        :
        null
})



interface CreateCardBoxProps {
    onCancel(): void,
    onSave(title: string): void
}
const CreateCardBox: React.FC<CreateCardBoxProps> = React.memo(props => {
    const [title, setTitle] = React.useState('')

    const onTitleChange = React.useCallback(
        e => {
            setTitle(e.target.value)
        },
        []
    )

    const onSaveCard = React.useCallback(
        () => {
            props.onSave(title)
        },
        [title, props.onSave]
    )


    return (
        <CreateCardBoxWrapper className="create-card-box">
            <Textarea
                value={title}
                onChange={onTitleChange}
                rowsMin={1}
                rowsMax={2}
                aria-label="maximum height"
                autoFocus
            />
            <div className="actions">
                <div className="button save" onClick={onSaveCard}>保存</div>
                <div className="button cancel" onClick={props.onCancel}>取消</div>
            </div>
        </CreateCardBoxWrapper>
    )
})


const CreateCardBoxWrapper = styled.div`
    padding: 15px 10px 6px;
    background-color: #fff;
    margin: 7px 7px 0;
    border-radius: 4px;
    box-shadow: 0 1px 2px 0px rgba(0, 0, 0, .1);


    > .actions {
        margin-top: 4px;

        &:after {
            content: '';
            clear: both;
            visibility: hidden;
            display: block;
        }

        > .button {
            float: left;
            margin-right: 10px;
            line-height: 22px;
            height: 22px;
            padding: 0 10px;
            cursor: pointer;

            &.save {
                background-color: #2196f3;
                color: #fff;
                border-radius: 2px;
                transition: background-color .2s ease-out;

                &:hover {
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