import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  videoData: {},
  sentimentResults: {},
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_VIDEO_START':
      return { ...state, loading: true };
    case 'FETCH_VIDEO_SUCCESS':
      return { ...state, loading: false, videoData: action.payload };
    case 'FETCH_VIDEO_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const store = createStore(reducer, applyMiddleware(thunk));
