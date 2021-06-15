import React from 'react';
import { View, TextInput, Image, Button, Text } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { colors, fonts } from '../../../themes';
import If from '../../molecules/If';

const CustomCard = styled(View)`
  padding: 0;
  min-height: ${props => (props.complete ? '22em' : '16em')};
  position: relative;
  box-sizing: border-box;
  border-radius: 0.6em;
  margin: ${props => (props.complete ? '2em auto' : '0.6em auto')};
  flex-basis: ${props => (props.complete ? '45%' : '30%')};
`;
const HeaderBox = styled(View)`
  margin: 0 auto;
  display: flex;
  gap: 1em;
`;
const SongPrimary = styled(Text)`
  max-height: 3em;
  overflow: hidden;
  margin: 0.6em 0 0.3em 0;
  ${props => (props.complete ? fonts.size.small : fonts.size.regular)}
  color: ${colors.textPrimary};
`;
const AudioImg = styled(Image)`
  max-height: ${props => (props.complete ? '12em' : '8em')};
  flex: ${props => (props.complete ? '2' : '1')};
  border-radius: 0.4em;
`;
const SongSecondary = styled(Text)`
  overflow: hidden;
  margin-bottom: 1em;
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
  const history = useHistory();
  const buttonHandler = () => {
    window.location.href = song.trackViewUrl;
  };
  return (
    <CustomCard complete={complete} data-testid="sound-card">
      <View data-testid="link-track">
        <HeaderBox>
          <AudioImg
            src={song.artworkUrl100}
            alt={song.trackName}
            complete={complete}
          />
          <View>
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
