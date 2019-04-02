import { createStore } from 'redux'
import todoApp from './../reducer/reducer';

const store = createStore(todoApp)