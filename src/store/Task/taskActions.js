import tasksTypes from './taskTypes'
const {fetch_tasks_success,fetch_tasks_failed, fetch_tasks_start} = tasksTypes;

export const fetchTasksSuccess = (tasks)=>{
    return{
        type: fetch_tasks_success,
        payload: tasks
    }
}

export const fetchTasksFailed = (error)=>{
    return{
        type: fetch_tasks_failed,
        payload: error
    }
}
export const fetchTasksStart = ()=>{
    return{
        type: fetch_tasks_start,
}
}