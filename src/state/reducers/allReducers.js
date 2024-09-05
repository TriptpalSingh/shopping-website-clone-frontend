import { combineReducers } from "redux";
const cartReducer = require('./cartReducer');

const reducers = combineReducers({
  cartReducer: cartReducer
})

export default reducers;












