import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AudioRow = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  margin: 10px 0;
`;
function AudioController({ goNext, goPrevious }) {
  return (
    <AudioRow>
      <TouchableOpacity onPress={goPrevious}>
        <MaterialIcons name="skip-previous" size={45} />
      </TouchableOpacity>

      <TouchableOpacity>
        <MaterialIcons name="pause" size={45} />
      </TouchableOpacity>

      <TouchableOpacity onPress={goNext}>
        <MaterialIcons name="skip-next" size={45} />
      </TouchableOpacity>
    </AudioRow>
  );
}

AudioController.propTypes = {
  goNext: PropTypes.func,
  goPrevious: PropTypes.func
};
export default AudioController;
