import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware, CombinedState, Reducer } from 'redux';
import { userReducer, UserState } from './user/userReducer';
import { valueStreamReducer, ValueStreamState } from './valueStream/valueStreamReducer';
import { cardsReducer, CardsState } from './cards/cardsReducer';
import { statisticReducer, StatisticState } from './statistic/statisticReducer';
import rootSaga from './saga';

const initialState = {}

const rootReducer = combineReducers({
    userReducer,
    valueStreamReducer,
    cardsReducer,
    statisticReducer
})

const sagaMiddleware = createSagaMiddleware()
const wrappedCreateStore = applyMiddleware(sagaMiddleware)(createStore)

export const store = wrappedCreateStore(rootReducer, initialState)

sagaMiddleware.run(rootSaga);

export interface RootState {
    userReducer: UserState,
    valueStreamReducer: ValueStreamState,
    cardsReducer: CardsState,
    statisticReducer: StatisticState
}
