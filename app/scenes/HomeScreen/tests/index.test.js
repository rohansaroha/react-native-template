import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
import { fireEvent } from '@testing-library/react-native';
import { HomeScreenTest as HomeScreen } from '../index';

describe('<HomeScreen /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<HomeScreen />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should call dispatchSongs on change', async () => {
    const { getByTestId } = renderProvider(
      <HomeScreen dispatchSongs={submitSpy} />
    );
    fireEvent.change(getByTestId('search-box'), {
      target: { value: 'some song' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });

  it('should call dispatchClearSongPlaylist on empty change', async () => {
    const getSongsSpy = jest.fn();
    const clearSongsSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <HomeScreen
        dispatchClearSongsPlaylist={clearSongsSpy}
        dispatchSongs={getSongsSpy}
      />
    );
    fireEvent.change(getByTestId('search-box'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getSongsSpy).toBeCalled();
    fireEvent.change(getByTestId('search-box'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearSongsSpy).toBeCalled();
  });
});
