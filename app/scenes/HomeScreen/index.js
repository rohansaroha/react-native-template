import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  Dimensions,
  TextInput,
  View,
  Animated
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
const { width } = Dimensions.get('window');

const SearchBox = styled(TextInput)`
  margin: 14px 16px 10px;
  border-width: 0.5px;
  border-color: #c4c3c3;
  padding: 16px;
`;

function HomeScreen({
  songName,
  songsData,
  dispatchSongs,
  dispatchClearSongsPlaylist,
  intl
}) {
  const [loading, setLoading] = useState(false);
  const [songsPlaylist, setSongsPlaylist] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const slider = useRef(null);

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
    // to set the index of current card
    scrollX.addListener(({ value }) => {
      const rawIndex = Math.round(value / width);
      setIndex(rawIndex);
    });
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
  const goNext = () => {
    slider.current.scrollToOffset({
      offset: (index + 1) * width
    });
  };
  const goPrevious = () => {
    slider.current.scrollToOffset({
      offset: (index - 1) * width
    });
  };

  const renderSong = ({ item }) => (
    <If condition={item.trackId}>
      <View style={{ width, alignItems: 'center' }}>
        <SoundCard song={item} goNext={goNext} goPrevious={goPrevious} />
      </View>
    </If>
  );

  return (
    <SafeAreaView>
      <Logo />
      <SearchBox
        onChangeText={e => debouncedHandleOnChange(e)}
        placeholder={intl.formatMessage({ id: 'search_song' })}
      />
      <If condition={songsPlaylist.length > 0}>
        <FlatList
          ref={slider}
          data={songsPlaylist}
          renderItem={renderSong}
          keyExtractor={(item, i) => i.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />
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
