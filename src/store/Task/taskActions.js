import tasksTypes from './taskTypes'
import axios from 'axios';
import { url } from '../../configUrls';
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

export const deleteTaskAsync = (taskId,token) => async (dispatch)=>{
    try{
        var config = {
            method: 'delete',
            url: url+'/api/deleteTask/'+taskId,
            headers: {
              Authorization: token
             }
          };
          const response = await axios(config)
          if(response){
            dispatch(fetchTasksAsync(token))
          }
    }
      catch(error){
          console.log(error);
      }
}

export const deleteDoneTasksAsync = (token)=>async (dispatch)=>{
    var data = '';

    var config = {
      method: 'delete',
      url: url+'/api/deleteDoneTasks',
      headers: { 
        Authorization: token
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
        dispatch(fetchTasksAsync(token))
    })
    .catch(function (error) {
      console.log(error);
    });
}
export const deleteAllTasksAsync = (token)=>async (dispatch)=>{
    var config = {
        method: 'delete',
        url: url+'/api/deleteAllTasks',
        headers: { 
          Authorization: token
        }
      };
      
      axios(config)
      .then(function (response) {
        dispatch(fetchTasksAsync(token))
      })
      .catch(function (error) {
        console.log(error);
      });
}


export const fetchTasksAsync = (token)=> async (dispatch) =>{
    var config = {
        method: 'get',
        url: url+'/api/tasks',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: token
        }
      };
      
      axios(config)
      .then(response=>{
        return dispatch(fetchTasksSuccess(response.data.tasks))
        
      }) 
      .catch(error=> {
        console.log(error);
      })
}

export const taskStatusDone = (task, token)=>async (dispatch)=>{
    var data = JSON.stringify({...task, status: 'done'});
    
    var config = {
      method: 'put',
      url: url+'/api/updateTask/'+task._id,
      headers: { 
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      dispatch(fetchTasksAsync(token))
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const taskStatusPending = (task, token)=>async (dispatch)=>{
    var data = JSON.stringify({...task, status: 'pending'});
    
    var config = {
      method: 'put',
      url: url+'/api/updateTask/'+task._id,
      headers: { 
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      dispatch(fetchTasksAsync(token))
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const updateTaskAsync = (task,token,formData)=>async (dispatch)=>{
    var data = JSON.stringify(formData);
    
    var config = {
      method: 'put',
      url: url+'/api/updateTask/'+task._id,
      headers: { 
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
    //   setisEditing(false);
    //   setFormValues(Initial_Values)
      dispatch(fetchTasksAsync(token))
    //   setSelectedDate(null)
    //   setShowForm(false)
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const createNewTaskAsync = (formData,token)=>async (dispatch)=>{
        var data = JSON.stringify(formData);
        var config = {
        method: 'post',
        url: url+'/api/task',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data : data
      };
  
      axios(config)
      .then(function (response) {
        dispatch(fetchTasksAsync(token))
      })
      .catch(function (error) {
        console.log(error);
      });
}

export const getDoneTasksAsync = (token)=> async (dispatch)=>{
    var config = {
        method: 'get',
        url: url+'/api/doneTasks',
        headers: { 
            'Authorization': token, 
            'Content-Type': 'application/json'
        },
        };
    
    axios(config)
    .then(function (response) {
        return dispatch(fetchTasksSuccess(response.data))
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const getPendingTasksAsync = (token)=>async (dispatch)=>{
    var config = {
    method: 'get',
    url: url+'/api/pendingTasks',
    headers: { 
        'Authorization': token, 
        'Content-Type': 'application/json'
    },
    };

axios(config)
.then(function (response) {
    return dispatch(fetchTasksSuccess(response.data))
})
.catch(function (error) {
  console.log(error);
});

}

export const getTodayTasksAsync = (token)=>async (dispatch)=>{
    var config = {
        method: 'get',
        url: url+'/api/getTodayTasks',
        headers: { 
          'Authorization': token,
          'Content-Type': 'application/json'
        },
      };
      
      axios(config)
      .then(function (response) {
        return dispatch(fetchTasksSuccess(response.data))
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}