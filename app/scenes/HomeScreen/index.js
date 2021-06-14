import React, { useEffect } from 'react';
import { Button, Platform, SafeAreaView, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import styled from 'styled-components/native';
import LogoWithInstructions from '../../components/molecules/LogoWithInstructions';
import { selectSongName, selectSongsData, selectSongsError } from './selectors';
import { homeContainerCreators } from './reducer';

const StyledBox = styled(Text)`
  margin: 30px auto;
`;
function HomeScreen({
  songName,
  songsData,
  dispatchSongs,
  dispatchClearSongsPlaylist
}) {
  const instructions = Platform.select({
    ios: 'Press Cmd+R to reload',
    android: 'Double tap R on your keyboard to reload'
  });
  const buttonHandler = () => {
    dispatchSongs('eminem');
  };
  return (
    <SafeAreaView>
      <LogoWithInstructions instructions={instructions} />
      <TextInput
        underlineColorAndroid="transparent"
        placeholder="Email"
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
      />
      <Text>{songName}</Text>
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
