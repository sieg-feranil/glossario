import { useState,useEffect } from "react";


export function ToDoJson() {
    const [task, setTask] = useState([])
    useEffect(() => {
        async function getTask() {
            let res = await fetch(`https://jsonplaceholder.typicode.com/todos`)
            let json = await res.json()
            setTask(json)
        }
        getTask()
    }, [])
    const incomplete=task.filter((task)=>!task.completed)
    const complete=task.filter((task)=>task.completed)
    const finale=incomplete.concat(complete)
    const handleChange = (id) => {
        setTask((prevTask) => {
          const updatedTask = prevTask.map((el) => {
            if (el.id === id) {
              return { ...el, completed: !el.completed };
            }
            return el;
          });
          return updatedTask.sort((a) => (a.completed ? 1 : -1));
        });
      };
    return (
        <ol>
            {finale.map((el) => (
                <li key={el.id} style={{ color: el.completed ? 'red' : '' }}>
                    <input type="checkbox" checked={el.completed}  onChange={() => handleChange(el.id)}/>
                    {el.title}
                </li>

            )
            )}

        </ol>


    )
}