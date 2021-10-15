import { createStore } from 'redux'
import rootReducer from '../reducers'
import middleware from '../middlewares'

const Store = createStore(
    rootReducer,
    {},
    middleware
)

export default Store
