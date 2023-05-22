import { useState,useEffect } from "react";
 export function InRed() {
    const [clr, setClr] = useState("");
    const [inp, setInp] = useState("");
    function control(str,[...ctrl]) {
        let x=0
        for (let i = 0; i < str.length; i++) {
            if (ctrl.includes(str[i])) {
                x++
            }
        }
        if (str.length===x) {
            return true
        }else return false
    }

    useEffect(()=>{
        if(inp.length>0){let x=(!isNaN(inp))||control(inp,['.',','])?true:false
        setClr(x?'red':'')}

    }, [inp])
       return (
           <input style={{backgroundColor:clr}} onChange={(e) => setInp(e.target.value)}></input>
       )
 }