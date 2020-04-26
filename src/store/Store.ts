import { createStore } from 'redux'
import Reducers from './reducers/RootReducer';

const store = createStore(Reducers)

export default store