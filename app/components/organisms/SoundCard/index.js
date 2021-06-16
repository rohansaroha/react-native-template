import React from 'react';
import { View, TextInput, Image, Button, Text } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { colors, fonts } from '../../../themes';
import If from '../../molecules/If';

const CustomCard = styled(View)`
  margin: 10px;
`;
const HeaderBox = styled(View)`
  flex-direction: row;
`;
const SongPrimary = styled(Text)`
  ${props => (props.complete ? fonts.size.regular : fonts.size.small)}
  color: ${colors.textPrimary};
`;
const AudioImg = styled(Image)`
  max-height: ${props => (props.complete ? '100px' : '100px')};
  flex: ${props => (props.complete ? '2' : '1')};
  border-radius: 6px;
`;
const SongSecondary = styled(Text)`
  overflow: hidden;
  margin-bottom: 10px;
  ${fonts.size.small};
  color: ${colors.textSecondary};
`;
// const AudioBox = styled.audio`
// width: 90%;
// position: absolute;
// bottom: 1em;
// `;
const ButtonSong = styled(Button)`
  margin: 2rem auto;
`;
function SoundCard({ song, complete, intl }) {
  const buttonHandler = () => {
    window.location.href = song.trackViewUrl;
  };
  return (
    <CustomCard complete={complete} data-testid="sound-card">
      <View data-testid="link-track">
        <HeaderBox>
          <View style={{ flex: 1 }}>
            <AudioImg source={{ uri: song.artworkUrl100 }} />
          </View>
          <View style={{ flex: 2 }}>
            <SongPrimary complete={complete}>{song.trackName}</SongPrimary>
            <SongSecondary>{song.artistName}</SongSecondary>
            <If condition={complete}>
              <ButtonSong
                data-testid="play-button"
                danger
                onClick={buttonHandler}
              >
                {intl.formatMessage({ id: 'play_song' })}
              </ButtonSong>
            </If>
          </View>
        </HeaderBox>
      </View>
    </CustomCard>
  );
}
SoundCard.propTypes = {
  intl: PropTypes.object,
  song: PropTypes.object,
  complete: PropTypes.bool
};

export default compose(injectIntl)(SoundCard);
