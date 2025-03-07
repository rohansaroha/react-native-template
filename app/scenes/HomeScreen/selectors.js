import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the HomeScreen state domain
 */

const selectHomeContainerDomain = state => state.homeContainer || initialState;

export const selectHomeContainer = () =>
  createSelector(selectHomeContainerDomain, substate => substate);
export const selectSongsData = () =>
  createSelector(selectHomeContainerDomain, substate =>
    get(substate, 'songsData', null)
  );
export const selectSongName = () =>
  createSelector(selectHomeContainerDomain, substate =>
    get(substate, 'songName', null)
  );
export const selectSongsError = () =>
  createSelector(selectHomeContainerDomain, substate =>
    get(substate, 'songsError', null)
  );
