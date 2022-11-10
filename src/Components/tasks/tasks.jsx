import React from 'react'
import { useState } from 'react'
import './tasks_style.css'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tasksSelector } from '../../store/Task/taskSelector'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { url } from '../../configUrls'
//Own imports
import Navbar from '../navbar/navigation.component'
import { fetchTasksFailed, fetchTasksSuccess} from '../../store/Task/taskActions'
const Tasks = () => {
  const dispatch = useDispatch()
  const tasksData = useSelector(tasksSelector)
  const [selectedDate, setSelectedDate] = useState(null)
  const [tasks, setTasks] = useState(tasksData)
  const [showForm, setShowForm] = useState(false)
  const Initial_Values = {
    title: '',
    status: 'pending'
  }
  const token = useSelector(state=> state.user.token);
  const [formValues, setFormValues] = useState(Initial_Values)
  const [isEditing, setisEditing] = useState(false)
  const [updateTask , setUpdateTask] = useState(null)

  const checkBoxHandler = (task)=>{
        if(task.status !== "done"){
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
      console.log(JSON.stringify(response.data));
      GetAllTasks()
    })
    .catch(function (error) {
      console.log(error);
    });
        }
        else{
        data = JSON.stringify({...task, status: 'pending'});
    
      config = {
      method: 'put',
      url: url+'api/updateTask/'+task._id,
      headers: { 
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      GetAllTasks()
    })
    .catch(function (error) {
      console.log(error);
    });
        }
        
  }
  // Change Handler Function
  const changeHandler = (e)=>{
    const {name, value} = e.target;
    setFormValues({...Initial_Values, [name]: value})
  }
  console.log('selected date',selectedDate )
  
// Submit handler Function
  const submitHandler =(e, )=>{
    e.preventDefault();
    const formData = {...formValues, date: selectedDate}
    if(isEditing){
      var data = JSON.stringify(formData);
    
    var config = {
      method: 'put',
      url: url+'/api/updateTask/'+updateTask._id,
      headers: { 
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      setisEditing(false);
      setFormValues(Initial_Values)
      GetAllTasks()
      setSelectedDate(null)
      setShowForm(false)
    })
    .catch(function (error) {
      console.log(error);
    });
    }

    // to add new task
    else{
        data = JSON.stringify(formData);
        config = {
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
        // console.log(JSON.stringify(response.data));
        // const updatedArr = [...tasks, response.data.task];
        // dispatch(fetchTasksSuccess(updatedArr))
        setShowForm(false)
        setFormValues(Initial_Values)
        GetAllTasks()
        setSelectedDate(null)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  }

  //delete One Task
const deleteTask = (taskId)=>{
  alert('Are you sure to delete this task?')
    var config = {
      method: 'delete',
      url: url+'/api/deleteTask/'+taskId,
      headers: {
        Authorization: token
       }
    };
    
    axios(config)
    .then(function (response) {
      const updatedArr = [...tasks];
      const filteredArr = updatedArr.filter((item)=>{
        return item._id !== taskId
      })

      dispatch(fetchTasksSuccess(filteredArr))
      setTasks(filteredArr)
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  // delete All tasks
  const deleteAll = ()=>{
    if(tasks.length <=0){
      return alert('There are no tasks to delete')
    }
    alert('Are you want to delete all tasks?')
    var config = {
      method: 'delete',
      url: url+'/api/deleteAllTasks',
      headers: { 
        Authorization: token
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      GetAllTasks()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //update a Task
  const updateTaskHandler = (task)=>{
    setisEditing(true);
    setFormValues({...Initial_Values, title: task.title})
    setUpdateTask(task)
  }

  // Function that I'm used to get all data after calling each api
const GetAllTasks=()=>{
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
      dispatch(fetchTasksSuccess(response.data.tasks))
      setTasks(response.data.tasks)

}) 
.catch(error=> {
  console.log(error);
})
}

const deleteDoneTasks = ()=>{
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
  console.log(JSON.stringify(response.data));
  GetAllTasks()
})
.catch(function (error) {
  console.log(error);
});

}

const getDoneTasks = ()=>{
  const filteredArr = tasksData.filter(task => task.status === 'done');
  setTasks(filteredArr)
}
const getTodoTasks = ()=>{
  const filteredArr = tasksData.filter(task => task.status === 'pending');
  setTasks(filteredArr)
}
const getAllTasks = ()=>{
  setTasks(tasksData)
}
const getTodayTasks = ()=>{
  console.log(moment().format())
  console.log(moment().add(1, 'days').calendar())
 
}
useEffect(()=>{  
  GetAllTasks()
  },[])



  return (
    <>
    <Navbar/>
    <div className='Container'>

      {/* SideBar */}
        <div className='sideBar'>
          <button className='sideBarBtns' href="#home"> <i className="fa fa-inbox"></i>   Home</button>
          <button className='sideBarBtns' href="#news" onClick={()=>getTodayTasks()}><i className="fa fa-calendar-o"></i>   Today</button>
          <button className='sideBarBtns' href="#contact" onClick={()=>getTodoTasks()}><i className="fa fa-calendar" aria-hidden="true"></i>   Upcoming</button>
          <button className='sideBarBtns' onClick={()=>getAllTasks()} href="#contact"><i className="fa fa-circle"></i>   All</button>
          <button className='sideBarBtns' href="#about" onClick={()=>getDoneTasks()}><i className="fa fa-check"></i>   Done</button>
        </div>

        {/* Tasks */}
        <div className='tasksContainer'>
          {!showForm? ( <div onClick={()=>setShowForm(true)} className='addTask'>
          <i className="fa fa-plus"></i> <span>   Add Task</span>
          </div>): null}
         
          {showForm?(
        <div className='form' >
        <form className='todoForm' onSubmit={submitHandler}>
         <input name='title' id='title' type="text" placeholder='New Todo' onChange={changeHandler} value={formValues.title}/>
         {/* <Moment format=''></Moment> */}
         <DatePicker
         className='date'
         placeholderText='Enter Date'
         minDate={new Date()}
         selected={selectedDate}
         onChange={(date)=>{
          setSelectedDate(date)
         }} 
        />
        {/* <input type="date" onChange={(date)=>setSelectedDate(date)} value={moment().format("DD-MMM-YYYY")}/> */}
            <button className='btnTodo' type='submit'>{isEditing ? "Update task":  "Add new Task"}</button>
        </form>
    </div>):null}
        
        <div className='todoContainer'>
        <h2 className='txt-center'>
            TodoList
        </h2>
        <div className='todoBtns'>
        <button className='btnTodo' onClick={()=>getAllTasks()}>All</button>
        <button className='btnTodo' onClick={()=>getDoneTasks()}> Done</button>
        <button className='btnTodo' onClick={()=>getTodoTasks()}> Todo</button>
        </div>
        </div>
        <div className='tasks'>
          {
            tasks.map((task,ind)=>{
              return(<div className='task' key={ind}>
              <b>{task.title}</b>
              <div >
              <input type="checkbox" id="status" name="status" checked={task?.status === 'done' ? true:false} className='checkbox' onChange={()=>checkBoxHandler(task)}/>
              <button className='btn' onClick={()=>updateTaskHandler(task)}>
              <i className="fa fa-pencil"></i>
              </button>
              <button className='btn' onClick={()=>deleteTask(task._id)}>
              <i className="fa fa-trash"></i>
              </button>
              </div>
          </div>)
            })
          }
        
        <div className='todoBtns'>
        <button className='btnTodo endBtn' onClick={()=>deleteDoneTasks()}>Delete done tasks</button>
        <button className='btnTodo endBtn' onClick={()=>deleteAll()}> Delete all tasks</button>
        </div>
        </div>
        </div>
      </div> 
    </>
  )
}

export default Tasks
