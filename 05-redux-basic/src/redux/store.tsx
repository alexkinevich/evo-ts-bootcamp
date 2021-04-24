import { createStore, compose  } from 'redux';
import DevTools from './DevTools';
import reducer from './reducer';

const enhancer = compose(
    DevTools.instrument()
);

export default createStore(reducer, enhancer);
