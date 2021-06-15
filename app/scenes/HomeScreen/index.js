import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import styled from 'styled-components/native';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import Logo from '../../components/molecules/Logo';
import { selectSongName, selectSongsData, selectSongsError } from './selectors';
import { homeContainerCreators } from './reducer';

function HomeScreen({
  songName,
  songsData,
  dispatchSongs,
  dispatchClearSongsPlaylist,
  intl
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (songsData && loading) {
      // eslint-disable-next-line no-console
      console.log('coming');
      // eslint-disable-next-line no-console
      console.log(songsData, songName);
      setLoading(false);
    }
  }, [songsData]);

  useEffect(() => {
    if (songName && !songsData?.items?.length) {
      dispatchSongs(songName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = sName => {
    // eslint-disable-next-line no-console
    console.log('asds');
    // eslint-disable-next-line no-console
    console.log(songsData, songName, dispatchSongs);
    if (!isEmpty(sName)) {
      dispatchSongs(sName);
      setLoading(true);
    } else {
      dispatchClearSongsPlaylist();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const buttonHandler = () => {
    dispatchSongs('eminem');
  };
  return (
    <SafeAreaView>
      <Logo />
      <TextInput
        onChangeText={e => debouncedHandleOnChange(e)}
        underlineColorAndroid="transparent"
        placeholder={intl.formatMessage({ id: 'search_song' })}
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
      />
      <Button onPress={buttonHandler} title="learn" />
    </SafeAreaView>
  );
}
HomeScreen.propTypes = {
  intl: PropTypes.object,
  dispatchSongs: PropTypes.func,
  songsData: PropTypes.array,
  songName: PropTypes.string,
  dispatchClearSongsPlaylist: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  songsData: selectSongsData(),
  songName: selectSongName(),
  songsError: selectSongsError()
});

function mapDispatchToProps(dispatch) {
  const { requestGetSongs, clearSongsPlaylist } = homeContainerCreators;
  return {
    dispatchSongs: songName => {
      dispatch(requestGetSongs(songName));
    },
    dispatchClearSongsPlaylist: () => dispatch(clearSongsPlaylist())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(injectIntl, withConnect)(HomeScreen);

export const HomeContainerTest = compose(injectIntl)(HomeScreen);
