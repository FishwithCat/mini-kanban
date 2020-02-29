import React from 'react';
import styled from 'styled-components';
import { GithubPicker } from 'react-color';


interface ColorPickerProps {
    value: string | undefined,
    colors?: string[]
    width?: number,
    height?: number,
    onChange(value: string): void
}
export const ColorPicker: React.FC<ColorPickerProps> = React.memo(props => {
    const [showPalette, setShowPalette] = React.useState(false)

    const blocWidth = React.useMemo(() => {
        if (!props.width || props.width < 0) return '16px'
        return props.width + 'px'
    }, [props.width])

    const blocHeight = React.useMemo(() => {
        if (!props.height || props.height < 0) return '16px'
        return props.height + 'px'
    }, [props.height])

    return (
        <Wrapper>
            <ColorBlock className="color-block"
                style={{ width: blocWidth, height: blocHeight, backgroundColor: props.value }}
                onClick={() => setShowPalette(true)}
            />
            {
                showPalette &&
                <>
                    <Mask onClick={() => setShowPalette(false)} />

                    <StyledGithubPicker color={props.value}
                        colors={props.colors}
                        onChangeComplete={color => {
                            setShowPalette(false)
                            props.onChange(color.hex)
                        }} />
                </>
            }
        </Wrapper>
    )
})

const Wrapper = styled.div`
    display: inline-block;
    box-sizing: border-box;
`

const ColorBlock = styled.div`
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 2px;
`
const Mask = styled.div`
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: transparent;
`
const StyledGithubPicker = styled(GithubPicker)`
    z-index: 2;
    position: absolute !important;
    transform: translate(-10px, 0px);
`