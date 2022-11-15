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
import { fetchTasksFailed,
        fetchTasksSuccess,
        fetchTasksAsync,
        deleteDoneTasksAsync,deleteAllTasksAsync,deleteTaskAsync,
         taskStatusPending,taskStatusDone,
         createNewTaskAsync,updateTaskAsync,
         getPendingTasksAsync,getDoneTasksAsync,
         getTodayTasksAsync} from '../../store/Task/taskActions'

const Tasks = () => {
  const dispatch = useDispatch()
  const tasksData = useSelector(state=>state.task.tasks)
  
  console.log('clone array global', tasksData)
  const [selectedDate, setSelectedDate] = useState(null)
  const [tasks, setTasks] = useState(tasksData)
  const [ren, setRen] = useState('')
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
         dispatch(taskStatusDone(task,token))
        }
        else{
       dispatch(taskStatusPending(task,token))
        
  }
}
  // Change Handler Function
  const changeHandler = (e)=>{
    const {name, value} = e.target;
    setFormValues({...Initial_Values, [name]: value})
  }  

// Creating and Updating task Function
  const submitHandler =(e, )=>{
    e.preventDefault();
    const formData = {...formValues, date: selectedDate}
    //to update task
    if(isEditing){
      dispatch(updateTaskAsync(updateTask,token,formData))
      setTasks(tasksData)
      setisEditing(false);
      setFormValues(Initial_Values)
      setSelectedDate(null)
      setShowForm(false)
    }
    // to add new task
    else{
        dispatch(createNewTaskAsync(formData,token))
        setShowForm(false)
        setFormValues(Initial_Values)
        setSelectedDate(null)
        fetchTasksAsync(token)
        fetchTasksSuccess(tasksData)
        setTasks(tasksData)
        setRen('ren')
    }
  }

  
  // delete All tasks
  const deleteAll = ()=>{
    if(tasksData.length <=0){
      return alert('There are no tasks to delete')
    }
    alert('Are you want to delete all tasks?')
    dispatch(deleteAllTasksAsync(token))
  }
  
  //update a Task
  const updateTaskHandler = (task)=>{
    setisEditing(true);
    setShowForm(true)
    setFormValues({...Initial_Values, title: task.title})
    setUpdateTask(task)
  }
  
  // Function to get all data after calling each api
  const GetAllTasks=()=>{
    dispatch(fetchTasksAsync(token))
  }


  //delete One Task
const deleteTask = (taskId)=>{
  alert('Are you sure to delete this task?')
  setRen('ren')
  dispatch(deleteTaskAsync(taskId,token))
  setRen('render')

  // setTasks(tasksData)
  // console.log('set', tasks)
  }

const deleteDoneTasks = ()=>{
  dispatch(deleteDoneTasksAsync(token))
}

const getDoneTasks = ()=>{
  dispatch(getDoneTasksAsync(token))
  // const filteredArr = tasksData.filter(task => task.status === 'done');
  // cloneArr = [...filteredArr]
  // console.log('clone array',cloneArr)
  // setTasks(filteredArr)
}

const getTodoTasks = ()=>{
  dispatch(getPendingTasksAsync(token))
  // const filteredArr = tasksData.filter(task => task.status === 'pending');
  // // cloneArr = filteredArr;
  // setTasks(filteredArr)
 
}
const getAllTasks = ()=>{
  dispatch(fetchTasksAsync(token))
}
const getTodayTasks = ()=>{
  dispatch(getTodayTasksAsync(token))
  // const todayDate = moment().format("MM-DD-YYYY");
  // const filteredArr = tasksData.filter(task=>moment(task.todoDate).format("MM-DD-YYYY")   === todayDate)
  // setTasks(filteredArr)
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
          <button className='sideBarBtns' onClick={()=>getAllTasks()}> <i className="fa fa-circle"></i>   All</button>
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
            tasksData.map((task,ind)=>{
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
