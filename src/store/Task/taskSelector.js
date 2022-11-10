import { createSelector } from "reselect"

const taskReducerSlice = state=> state?.task

export const tasksSelector = createSelector([taskReducerSlice],
    (reducer)=>{
        return reducer.tasks
    })
export const tasksFetchingErrorSelector = createSelector([taskReducerSlice],
    (reducer)=>{
        return reducer.error
    })