import { combineReducers } from "redux";

import user from "./user";
import school from "./school";
import post from "./post";

// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
  user,
  school,
  post,
});

export default rootReducer;
