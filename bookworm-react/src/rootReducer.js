import { combineReducers } from 'redux';
import user from './reducers/user';
import books from './reducers/books';
import locale from './reducers/locale';

export default combineReducers({
    user,
    books,
    locale
});