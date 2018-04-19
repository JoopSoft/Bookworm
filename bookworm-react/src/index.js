import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoggedIn } from './actions/auth';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import decode from 'jwt-decode';
import setAuthorizationHeader from './utils/setAuthorizationHeader';

import 'semantic-ui-css/semantic.min.css';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.bookwormJWT) {
    const payload = decode(localStorage.bookwormJWT);
    const user = {
        token: localStorage.bookwormJWT,
        email: payload.email,
        confirmed: payload.confirmed
    };
    setAuthorizationHeader(localStorage.bookwormJWT);
    store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store} >
            <Route component={App} />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
