// REDUX STORE - HOLDS STATE
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import YTSearch from 'youtube-api-search';

import App from './components/App';
// REDUCERS
import reducers from './reducers';

// YOUTUBE API KEY
const API_KEY = 'AIzaSyB9pwMqxJohEB7sn6igdChSjU_hgg-CkjU';

YTSearch({ key: API_KEY, term: 'Bible Project' }, data => {
  console.log(data);
});

// First argument is all the diff reducers in our application
// Second argument is server side state
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
