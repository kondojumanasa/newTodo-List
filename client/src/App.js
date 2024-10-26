import './App.css';
import React,{useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [tasks,setTasks]=useState([]);
  const [newTask,setNewTask]=useState('');


  useEffect(()=>{
    axios.get('http://localhost:4000/tasks').then(res=>setTasks(res.data));
  },[]);

  // new task 
  const addtask=()=>{
    axios.post('http://localhost:4000/tasks',{title:newTask})
    .then(res=>setTasks([...tasks,res.data]));
    setNewTask('');
  };

  // update task
  const updateTask=(id,completed)=>{
    axios.put(`http://localhost:4000/tasks/${id}`,{completed: !completed})
    .then(res=>setTasks(tasks.map(t => (t._id === id ? res.data : t))));
  }

  // delete task 
  const deleteTask = id =>{
    axios.delete(`http://localhost:4000/tasks/${id}`)
    .then(()=>setTasks(tasks.filter(t=>t._id !==id)));
  }

  return (
    <div className='container'>
      <h1>To-Do List</h1>
      <input value={newTask} 
      onChange={(e)=>setNewTask(e.target.value)} 
      placeholder='Add new Task'/>
      <button onClick={addtask} disabled={!newTask} >Add Task</button>
      <ul>{tasks.map(task=>(
        <li key={task.id} className={task.completed ? 'completed':''}>
          {task.title}
          <button className='complete-btn' 
            onClick={()=>updateTask(task._id,task.completed)}>
            {task.completed ? 'Incomplete':'Complete'}</button>
          <button className="delete-btn" 
          onClick={() => deleteTask(task._id)}>Delete</button>
        </li>
      ))}
      </ul>
    </div>
  );
};

export default App;
