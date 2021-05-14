import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App.jsx';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './app/store';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#00ccbc',
            contrastText: "#fff"
        },
        secondary: {
            main: '#fff',
        },
    },
    overrides: {
        MuiButton: {
            raisedPrimary: {
                color: '#fff',
            },
        },
    }
});

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline />
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();