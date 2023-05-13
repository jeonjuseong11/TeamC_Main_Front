import { combineReducers } from "redux";

import user from "./user";
import school from "./school";

// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
  user,
  school,
});

export default rootReducer;
