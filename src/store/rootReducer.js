import { combineReducers } from "redux";
import { taskReducer } from "./Task/taskReducer";
import { userReducer } from "./User/userReducers";

export const rootReducer = combineReducers({
    user: userReducer,
    task: taskReducer
})