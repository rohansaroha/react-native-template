import languageProviderReducer from '../reducer';
import { CHANGE_LOCALE } from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('Tests for LanguageProvider actions', () => {
  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {})).toEqual({
      locale: 'en'
    });
  });

  it('changes the locale', () => {
    expect(
      languageProviderReducer(undefined, {
        type: CHANGE_LOCALE,
        locale: 'de'
      })
    ).toEqual({
      locale: 'de'
    });
  });
});
