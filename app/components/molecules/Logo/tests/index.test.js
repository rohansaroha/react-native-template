/**
 *
 * Tests for Logo
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import Logo from '../index';

describe('<Logo />', () => {
  it('Should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Logo />);
    expect(baseElement).toMatchSnapshot();
  });
});
