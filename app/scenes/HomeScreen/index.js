import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
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
import { getSongs } from '../../services/iTunesApi';
import If from '../../components/molecules/If';
import SoundCard from '../../components/organisms/SoundCard';

const MusicBoxContainer = styled(View)`
  margin: 40px;
`;
function HomeScreen({
  songName,
  songsData,
  dispatchSongs,
  dispatchClearSongsPlaylist,
  intl,
  navigation
}) {
  const [loading, setLoading] = useState(false);
  const [songsPlaylist, setSongsPlaylist] = useState([]);

  useEffect(() => {
    if (songsData && loading) {
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
    if (!isEmpty(sName)) {
      dispatchSongs(sName);
      getSongs(sName).then(res => {
        setSongsPlaylist(res.data.results);
      });
      setLoading(true);
    } else {
      dispatchClearSongsPlaylist();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const buttonHandler = () => {
    navigation.navigate('Profile');
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
      <Button onPress={buttonHandler} title="Search" />
      <If condition={songsPlaylist.length > 0}>
        <ScrollView>
          {songsPlaylist.map((song, index) => (
            <SoundCard key={index} song={song} />
          ))}
        </ScrollView>
      </If>
    </SafeAreaView>
  );
}
HomeScreen.propTypes = {
  intl: PropTypes.object,
  dispatchSongs: PropTypes.func,
  songsData: PropTypes.array,
  songName: PropTypes.string,
  dispatchClearSongsPlaylist: PropTypes.func,
  navigation: PropTypes.any
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
