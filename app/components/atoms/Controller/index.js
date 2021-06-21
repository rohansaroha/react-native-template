import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Audio } from 'expo-av';

const AudioRow = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  margin: 10px 0;
`;
function AudioController({ goNext, goPrevious, song }) {
  const [playbackObj, setPlaybackObj] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [soundObj, setSoundObj] = useState(null);
  const [currentAudio, setCurrentAudio] = useState({});

  useEffect(() => (playbackObj ? () => playbackObj.unloadAsync() : undefined), [
    playbackObj
  ]);

  async function playSound() {
    // playing audio for the first time
    if (!soundObj) {
      const playback = new Audio.Sound();
      const status = await playback.loadAsync(
        { uri: song.previewUrl },
        { shouldPlay: true }
      );
      setPlaying(true);
      setPlaybackObj(playback);
      setSoundObj(status);
      setCurrentAudio(song);
      return;
    }
    // pause audio
    if (soundObj.isLoaded && playing) {
      const status = await playbackObj.setStatusAsync({ shouldPlay: false });
      setPlaying(false);
      setPlaybackObj(playbackObj);
      setSoundObj(status);
      return;
    }

    // resume audio
    if (
      soundObj.isLoaded &&
      !playing &&
      currentAudio.trackId === song.trackId
    ) {
      const status = await playbackObj.playAsync();
      setPlaying(true);
      setSoundObj(status);
    }
  }

  return (
    <AudioRow testID="controller">
      <TouchableOpacity testId="prevButton" onPress={goPrevious}>
        <MaterialIcons name="skip-previous" size={45} />
      </TouchableOpacity>

      <TouchableOpacity testId="playButton" onPress={playSound}>
        <MaterialIcons name={playing ? 'pause' : 'play-arrow'} size={45} />
      </TouchableOpacity>

      <TouchableOpacity testId="nextButton" onPress={goNext}>
        <MaterialIcons name="skip-next" size={45} />
      </TouchableOpacity>
    </AudioRow>
  );
}

AudioController.propTypes = {
  goNext: PropTypes.func,
  goPrevious: PropTypes.func,
  song: PropTypes.object
};
export default AudioController;
