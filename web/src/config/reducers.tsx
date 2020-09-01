import { combineReducers } from "redux";
import todo from "../containers/Todo/reducer";

const combinedReducers = combineReducers({
  todo,
});

export default combinedReducers;
