import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import { store } from '@/web/redux/create-store';
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch, Link, Route } from 'react-router-dom'
import { Login } from '@/web/pages/login';
import { Kanban } from '@/web/pages/kanban';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import { PrivateRouter } from '@/web/components/PrivateRouter';
import '@/web/fonts/iconfont.css'


export const Layout = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <CssBaseline />
                <React.Fragment>
                    <Router>
                        <Switch>
                            <PrivateRouter exact path='/' component={Kanban} />
                            <Route exact path='/login' component={Login} />
                        </Switch>
                    </Router>
                </React.Fragment>
            </Provider>
        </MuiThemeProvider>
    )
}
