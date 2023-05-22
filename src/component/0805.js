import { useState, useEffect } from "react";
export function EightMay() {
    const[rndm,setRndm]=useState(0)
    useEffect(()=>{
        console.log(rndm);
    },[rndm])
    return (
        <>
        <h2>asdasd-</h2>
        <input></input>
        <button onClick={()=>{setRndm(rndm+1)}}>send</button>
        <span>{rndm}</span>
        </>
    )
}