import { all, takeLatest, takeEvery } from 'redux-saga/effects'
import userActionKeys from './user/userActionKeys';
import userSaga from './user/userSaga';
import valueStreamActionKeys from './valueStream/valueStreamActionKeys';
import valueStreamSaga from './valueStream/valueStreamSaga';
import cardsActionKeys from './cards/cardsActionKeys';
import cardsSaga from './cards/cardsSaga';

function* rootSaga() {
    yield all([
        takeLatest(userActionKeys.login, userSaga.login),

        takeLatest(valueStreamActionKeys.fetchValueStream, valueStreamSaga.fetchValueStream),
        takeLatest(valueStreamActionKeys.fetchValueStreamMembers, valueStreamSaga.fetchValueStreamMembers),
        takeLatest(valueStreamActionKeys.createValueStream, valueStreamSaga.createValueStream),
        takeLatest(valueStreamActionKeys.deleteValueStream, valueStreamSaga.deleteValueStream),
        takeLatest(valueStreamActionKeys.updateStep, valueStreamSaga.updateStep),
        takeLatest(valueStreamActionKeys.deleteStep, valueStreamSaga.deleteStep),
        takeLatest(valueStreamActionKeys.inviteMember, valueStreamSaga.inviteMember),
        takeLatest(valueStreamActionKeys.deleteMember, valueStreamSaga.deleteMember),

        takeLatest(cardsActionKeys.createCard, cardsSaga.createCard),
        takeEvery(cardsActionKeys.fetchCardsOfStep, cardsSaga.fetchCardsOfStep),
        takeEvery(cardsActionKeys.moveCard, cardsSaga.moveCard),

    ])
}

export default rootSaga;