import tasksTypes from './taskTypes'
const {fetch_tasks_success,fetch_tasks_failed, fetch_tasks_start} = tasksTypes;
const Initial_State = {
    tasks: [],
    error: null

}
export const taskReducer = (state= Initial_State, action)=>{
    const {type, payload} = action;
    switch(type){
        case fetch_tasks_success:
            return{
                ...state,
                tasks: payload
            }
            case fetch_tasks_failed:
                return{
                    ...state,
                    error: payload
                }
            default:
                return state
    }
}