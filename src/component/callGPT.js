import { useState } from "react";


export default function Home() {
    const [animalInput, setAnimalInput] = useState("");
    const [result, setResult] = useState();
  
    async function onSubmit(event) {
      event.preventDefault();
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ animal: animalInput }),
        });
  
        const data = await response.json();
        if (response.status !== 200) {
          throw data.error || new Error(`Request failed with status ${response.status}`);
        }
  
        setResult(data.result);
        setAnimalInput("");
      } catch(error) {
        console.error(error);
        alert(error.message);
      }
    }
}


function InputBar(params) {
    return (
        <>
        <input onChange={(e)=>setRequest(e.target.value)}/>
        <button onClick={send}>send</button>
        </>
    )
}

export function CallGpt() {
    return (
        <>
        <InputBar/>
        </>
    )
}