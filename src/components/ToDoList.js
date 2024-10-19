import { useState } from 'react';
import './ToDoList.css'

function ToDoList(){

    // The input for entering tasks
    const [task,setTask] = useState("");

    // Storing a tasks
    const [tasks,setTasks] = useState([]);

    // For entering New tasks
    const newTask = (event)=>{
        setTask(event.target.value)
    };

    // Handiling auto submiton of form and when click enter add
    const handleSubmit = (event) => {
        event.preventDefault(); 
        addTask(); 
    };


    // Checking if any task is already there or the new task is empty
    const addTask = ()=>{
        if(task.trim() !== "" && !tasks.some(tasks => tasks.text === task)){
            setTasks(tasks => [...tasks, {text:task,checkedValue:false,flag:true}]);
            setTask("")
        }
    };


    // To mark completed task and don't allow any fetures on it after allowing
    const checkMarkCheck = (index) => {
        const update = tasks.map((task, i) =>
            i === index ? { ...task, checkedValue: !task.checkedValue } : task
          );
        const sorted = checkedTasks(update);
        setTasks(sorted)
      };

      const checkedTasks = (tasks) => {
        const checkedTasks = tasks.filter(task => task.checkedValue === true);
        const uncheckedTasks = tasks.filter(task => task.checkedValue === false);
        return [...checkedTasks, ...uncheckedTasks];
      };
      


    // To edit a Task which is already submited
    const editTask = (index) => {
        setTasks(tasks =>
            tasks.map((task, i) =>
                i === index ? { ...task, flag: !task.flag } : task
            )
        );
    };
    // giving input tab for editing
    const changeTask = (event,index) =>{
       const update = event.target.value;
        setTasks(tasks => 
            tasks.map((task,i)=>
            i === index? {...task,text:update} : task
            ))
    };

    const handleKeyDown = (event,index) =>{
        if(event.key === "Enter"){
            editTask(index);
        } 
    }


    // Moving Up and Down
    const moveUp = (index) =>{
        if(index>0){
             const update = [...tasks];
            [update[index],update[index-1]] = [update[index-1],update[index]]
            setTasks(update);
        }
    }
    const moveDown = (index) =>{
        if(index<tasks.length-1){
             const update = [...tasks];
            [update[index],update[index+1]] = [update[index+1] , update[index]]
            setTasks(update);
        }
    }

    // Deleting a Task
    const deleteTask = (index) =>{
        const update = (tasks => tasks.filter((_,i) => i !== index))
        setTasks(update)
    }
    
    

    return(
        <div className='body-todo'>
            <h1>To-Do List</h1>
            <form onSubmit={handleSubmit}>
                <input  type="text" placeholder='Enter New Task To Do' value={task} onChange={newTask}/>
                <button className='add-button' type='submit' onClick={addTask}>Add</button>
            </form>
            <div>
                <ol>
                    {tasks.map((task,index) =>(

                        <li key={index}>
                            <input type="checkbox" checked={task.checkedValue}  onChange={()=>checkMarkCheck(index)}/>
                            {task.flag === true ? (<p>{task.text}</p>) : <input type="text" value={task.text} onChange={(event)=>changeTask(event,index)} onKeyDown={(event)=>handleKeyDown(event,index)}/>}
                            

                            <div className='li-buttons'>
                                {!task.checkedValue ? (
                                    <>
                                    {task.flag === true ? <button className='edit-button' onClick={()=>editTask(index)}>EDIT</button> : <button className='edit-button' onClick={()=>editTask(index)}>SAVE</button> }
                                        
                                        <button className='up-button' onClick={()=>moveUp(index)}>UP</button>
                                        <button className='down-button' onClick={()=>moveDown(index)}>DOWN</button>
                                        <button className='delete-button' onClick={()=>deleteTask(index)}>DELETE</button>
                                    </>
                                ):"completed"}
                            </div>
                        </li>  

                    ))}
                </ol>
            </div>
        </div>
    )
}

export default ToDoList;