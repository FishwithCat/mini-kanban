import React from 'react';
import styled from 'styled-components';
// import Button from '@material-ui/core/Button';
import logo from '@/web/images/logo.png';
import { useDispatch } from 'react-redux';
import { login } from '@/web/redux/user/userActions';
import { useHistory } from 'react-router-dom';
import { useCurrentUser } from '@/web/hooks/useCurrentUser';
import { MButton } from '@/web/components/MButton';

interface LoginProps {

}
export const Login: React.FC<LoginProps> = React.memo(props => {
    const [name, setName] = React.useState<string>('')

    const dispatch = useDispatch()
    const history = useHistory()

    const currentUser = useCurrentUser()

    const onNameInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, [setName])

    const onLogin = React.useCallback(() => {
        if (!name || name === '') return
        dispatch(login(name))
    }, [name, dispatch])

    const onPressEnter = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            onLogin()
        }
    }, [onLogin])

    React.useEffect(() => {
        if (currentUser) history.replace('/')
    }, [currentUser])

    return (
        <LoginWrapper>
            <LoginBox>
                <img className="logo" src={logo} />

                <div className="login-form">
                    <div className="input-box">
                        <StyledInput
                            value={name}
                            placeholder="用户名"
                            onChange={onNameInputChange}
                            onKeyUp={onPressEnter}
                        />
                    </div>

                    <div className="btn-box">
                        <LoginBtn type="primary" onClick={onLogin} >
                            开始使用
                        </LoginBtn>
                    </div>
                </div>
            </LoginBox>
        </LoginWrapper>
    )
})

const LoginWrapper = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items:center;
    justify-content:center;
`

const LoginBox = styled.div`
    width: 400px;
    margin: 0px auto;
    transform: translateY(-60px);
    
    .logo {
        display: block;
        width: 120px;
        margin: 0 auto 30px;
    }

    .login-form {
        background-color: #fff;
        display: flex;
        border-radius: 2px;
        box-shadow: 2px 2px 2px rgba(26, 26, 26, .1);
    }
    
    .input-box {
        width: 300px;
        flex-shrink: 0;
    }

    .btn-box {
        flex: 1;
    }
`

const StyledInput = styled.input`
    width: 100%;
    padding: 10px 14px;
    border: none;
    outline: 0;
    font-size: 16px;
`

const LoginBtn = styled(MButton)`
    border-radius: 0;
    width: 100%;
    height: 100%;
`