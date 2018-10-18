import { combineReducers } from 'redux';
import paymentReducers from './paymentReducers';

export default combineReducers({
    payment: paymentReducers,
});