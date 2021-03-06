import React from 'react';
import { Step } from '@/model/ValueStream';
import styled from 'styled-components';
import { ColorPicker } from '@/web/components/ColorPicker';
import { MButton } from '@/web/components/MButton';
import { MInput } from '@/web/components/MInput';


interface ModifyStepProps {
    defaultStep: Step,
    onSave(step: Step): void,
    style?: React.CSSProperties
}
export const ModifyStep: React.FC<ModifyStepProps> = React.memo(props => {
    const { defaultStep, style } = props
    const [step, setStep] = React.useState(defaultStep)

    return (
        <Wrapper className="modify-step" style={style}>
            <MInput placeholder="名称" value={step.name}
                onChange={e => setStep({ ...step, name: e.target.value })}
                autoFocus
            />
            <div className="modify-color">
                <span className="form-title">颜色</span>
                <ColorPicker value={step?.color}
                    colors={[
                        '#81c784', '#64b5f6', '#ffb74d', '#e57373',
                        '#004DCF', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6',
                    ]}
                    onChange={color => setStep({ ...step, color })} />
            </div>

            <div className="bottom">
                <MButton
                    type="primary"
                    disabled={step.name === '' || step.name == null}
                    onClick={() => {
                        if (!step.id) return
                        return props.onSave(step)
                    }}
                >
                    应用
                </MButton>
            </div>
        </Wrapper>
    )
})

const Wrapper = styled.div`
    outline: none;
    background-color: white;
    width: 250px;
    
    .form-title {
        margin-right: 8px;
    }

    .modify-color {
        margin-top: 15px;
        display: flex;
        color: rgba(0, 0, 0, 0.54);
        line-height: 16px;
    }

    .bottom {
        margin-top: 15px;
        
        > button {
            width: 100%;
        }
    }
`