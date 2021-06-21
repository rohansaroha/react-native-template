import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  Dimensions,
  TextInput,
  View,
  Animated,
  Text
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
import If from '../../components/molecules/If';
import SoundCard from '../../components/organisms/SoundCard';
const { width } = Dimensions.get('window');

const SearchBox = styled(TextInput)`
  margin: 14px 16px 10px;
  border-width: 0.5px;
  border-color: #c4c3c3;
  padding: 16px;
`;
const CustomCard = styled(View)`
  border-width: 0.5px;
  padding: 32px 16px;
  margin: 16px;
  border-color: #c4c3c3;
  text-align: center;
  border-radius: 6px;
`;
const TextPrimary = styled(Text)`
  color: #7f7f7f;
`;

function HomeScreen({
  songName,
  songsData,
  dispatchSongs,
  dispatchClearSongsPlaylist,
  intl
}) {
  const [loading, setLoading] = useState(false);
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
    return () => {
      scrollX.removeListener();
    };
  }, []);

  const handleOnChange = sName => {
    if (!isEmpty(sName)) {
      dispatchSongs(sName);
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
  const renderEmptyPlaylist = () => (
    <CustomCard>
      <TextPrimary>
        {intl.formatMessage({ id: 'empty_songs_text' })}
      </TextPrimary>
    </CustomCard>
  );

  return (
    <SafeAreaView>
      <Logo />
      <SearchBox
        value={songName}
        onChangeText={e => debouncedHandleOnChange(e)}
        placeholder={intl.formatMessage({ id: 'search_song' })}
      />
      <If condition={songsData.length > 0} otherwise={renderEmptyPlaylist()}>
        <FlatList
          ref={slider}
          data={songsData}
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

export const HomeScreenTest = compose(injectIntl)(HomeScreen);
