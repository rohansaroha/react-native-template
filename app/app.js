import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import LanguageProvider from '@atoms/LanguageProvider';
import createStore from 'app/rootReducer';
import { translationMessages } from './i18n';
import HomeScreen from './scenes/HomeScreen';

const { store, persistor } = createStore();

const App = () => (
  <Provider store={store}>
    <LanguageProvider messages={translationMessages}>
      <PersistGate loading={null} persistor={persistor}>
        <HomeScreen />
      </PersistGate>
    </LanguageProvider>
  </Provider>
);

export default App;
