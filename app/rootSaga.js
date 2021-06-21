import { fork } from 'redux-saga/effects';
import homeContainerSaga from './scenes/HomeScreen/saga';

export default function* root() {
  yield fork(homeContainerSaga);
}
