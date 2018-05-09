import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { userLoggedIn } from './actions/auth';
import { userFetched, fetchCurrentUser } from './actions/users';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
// import decode from 'jwt-decode';
import { localeSet } from './actions/locale';
import setAuthorizationHeader from './utils/setAuthorizationHeader';

import 'semantic-ui-css/semantic.min.css';

addLocaleData(en);
addLocaleData(ru);

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.bookwormJWT) {
    // const payload = decode(localStorage.bookwormJWT);
    // const user = {
    //     token: localStorage.bookwormJWT,
    //     email: payload.email,
    //     confirmed: payload.confirmed
    // };
    setAuthorizationHeader(localStorage.bookwormJWT);
    // store.dispatch(userLoggedIn(user));
    store.dispatch(fetchCurrentUser());
}
else {
    store.dispatch(userFetched({}));
}

if(localStorage.alhubLang) {
    store.dispatch(localeSet(localStorage.alhubLang));
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store} >
            <Route component={App} />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
