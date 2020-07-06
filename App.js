import React from 'react';
import { StyleSheet, Button} from 'react-native';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

// Reducers
import authReducer from './src/store/reducers/auth';
import productReducer from './src/store/reducers/products';

import Navigation from "./src/navigation/navigation";

import * as firebase from "firebase";
import {firebaseConfig} from "./config";
firebase.initializeApp(firebaseConfig);


// Redux Store
const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,

});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

