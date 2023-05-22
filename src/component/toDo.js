import { useState } from "react";


function TaskList({tasks}) {
    const [style, setStyle]=useState('')
    const [count,setCount]=useState(0)
    let x= tasks.map((e)=>(
        <li >
            <input onChange={()=> {setCount(count+1); setStyle(count%2==0?'red':'')}} type="checkbox"/>
            <span style={{color:style}}>{e} </span>
        </li>
    ))
    return (
        <ol>
            {x}
        </ol>
    )
}

function InputTask({sendTask}) {
    const [inTask,setInTasks]=useState('')
    function send() {
        sendTask(inTask)
        setInTasks('')
    }
    return (
        <div>
            <input value={inTask} onChange={(e)=>{setInTasks(e.target.value)}}/>
            <button onClick={send}>add</button>
        </div>
    )
}

export function ToDoList() {
    const [tasks,setTasks]=useState([])
   function handleClick(outTask) {
    let newTask=[...tasks]
    newTask.push(outTask)
    setTasks(newTask)
   }
    return (
        <div>
            <InputTask sendTask={handleClick}/>
            <TaskList tasks={tasks}/>
        </div>
    )
}