import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import {UserReducer} from './reducers/user.reducer'

const initialState = {
  userData:{
      isUserRegister:false,
      isUserLoggedIn:{},
      isPasswordUpdate:false,
      isLeadAdded:false,
      isLeadDelete:false,
      isLeadUpdated:false,
      isProfileUpdated:false
  }
};

const reducer = combineReducers({
   userData:UserReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;