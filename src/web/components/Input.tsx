import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

export const Input = styled(TextField)`
    .MuiOutlinedInput-input {
        padding: 10px 14px;
    }

    .MuiInputLabel-outlined {
        transform: translate(14px, 13px) scale(1);

        &.MuiInputLabel-shrink {
            transform: translate(14px, -6px) scale(.75);
        }
    }
`
