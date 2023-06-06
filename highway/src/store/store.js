import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import rootSaga from "../sagas";
import rootReducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(sagaMiddleware))
    : composeWithDevTools(applyMiddleware(sagaMiddleware));
const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga); // 루트 사가를 실행해줍니다.

export default store;
