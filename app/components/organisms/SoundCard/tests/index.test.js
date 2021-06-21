import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import SoundCard from '../index';

describe('<SoundCard />', () => {
  const mockData = {
    artworkUrl100: ''
  };
  it('Should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<SoundCard song={mockData} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 container', () => {
    const { getAllByTestId } = renderWithIntl(<SoundCard song={mockData} />);
    expect(getAllByTestId('controller').length).toBe(1);
  });
});
