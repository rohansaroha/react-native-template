import React from 'react';
import { renderWithIntl } from 'app/utils/testUtils';
import { fireEvent } from '@testing-library/react-native';
import AudioController from '../index';

describe('AudiController tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  const mockData = {
    previewUrl: ''
  };
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<AudioController />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 container', () => {
    const { getAllByTestId } = renderWithIntl(<AudioController />);
    expect(getAllByTestId('controller').length).toBe(1);
  });

  it('should check previous button is being called', () => {
    const { getAllByTestId } = renderWithIntl(
      <AudioController goPrevious={submitSpy} />
    );
    fireEvent.press(getAllByTestId('prevButton'));
    expect(submitSpy).toBeCalled();
  });

  it('should check next button is being called', () => {
    const { getAllByTestId } = renderWithIntl(
      <AudioController goNext={submitSpy} />
    );
    fireEvent.press(getAllByTestId('nextButton'));
    expect(submitSpy).toBeCalled();
  });

  it('should ensure that it plays the song', () => {
    const { getAllByTestId } = renderWithIntl(
      <AudioController song={mockData} />
    );
    fireEvent.press(getAllByTestId('playButton'));
  });
  it('should ensure that it pause the song', () => {
    const { getAllByTestId } = renderWithIntl(
      <AudioController song={mockData} />
    );
    fireEvent.press(getAllByTestId('playButton'));
  });
});
