import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const initialState = {
  songName: null,
  songsData: [],
  error: null,
  homeContainer: {}
};

export const {
  Types: homeContainerTypes,
  Creators: homeContainerCreators
} = createActions({
  requestGetSongs: ['songName'],
  successGetSongs: ['songsData'],
  failureGetSongs: ['error'],
  clearSongsPlaylist: []
});

/* eslint-disable default-case, no-param-reassign */
export const homeContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    // eslint-disable-next-line no-console
    console.log('state', state);
    // eslint-disable-next-line no-console
    console.log('Actions', action);
    switch (action.type) {
      case homeContainerTypes.REQUEST_GET_SONGS:
        draft.songName = action.songName;
        break;
      case homeContainerTypes.SUCCESS_GET_SONGS:
        draft.songsData = action.songsData;
        break;
      case homeContainerTypes.FAILURE_GET_SONGS:
        draft.error = get(action.error, 'message', 'something_went_wrong');
        break;
      case homeContainerTypes.CLEAR_SONGS_PLAYLIST:
        return initialState;
      default:
        return state;
    }
  });

export default homeContainerReducer;
