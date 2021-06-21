import React from 'react';
import { View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { colors, fonts } from '../../../themes';
import AudioController from '../../atoms/Controller';

const CustomCard = styled(View)`
  margin: 10px;
  text-align: center;
  align-items: center;
`;
const SongPrimary = styled(Text)`
  ${fonts.size.large}
  color: ${colors.textPrimary};
`;
const AudioImg = styled(Image)`
  width: 300px;
  height: 250px;
  margin: 10px 0;
  border-radius: 6px;
`;
const SongSecondary = styled(Text)`
  ${fonts.size.regular};
  color: ${colors.textSecondary};
`;
function SoundCard({ song, goNext, goPrevious }) {
  return (
    <CustomCard testID="sound-card">
      <AudioImg source={{ uri: song.artworkUrl100 }} />
      <SongPrimary>{song.trackName}</SongPrimary>
      <SongSecondary>{song.artistName}</SongSecondary>
      <AudioController goNext={goNext} goPrevious={goPrevious} song={song} />
    </CustomCard>
  );
}
SoundCard.propTypes = {
  song: PropTypes.object,
  goNext: PropTypes.func,
  goPrevious: PropTypes.func
};

export default compose(injectIntl)(SoundCard);
