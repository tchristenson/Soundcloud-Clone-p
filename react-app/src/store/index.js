import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import userReducer from './users';
import songReducer from './songs';
import albumReducer from './albums';
import styleReducer from './styles';
// import playlistReducer from './playlists';

const rootReducer = combineReducers({
  session,
  users: userReducer,
  songs: songReducer,
  albums: albumReducer,
  styles: styleReducer
  // playlists: playlistReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
