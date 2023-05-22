import { useState } from "react";


function Inpt({putAllMsg}) {
const [user, setUser] = useState("");
const [msg, setMsg] = useState("");

function send() {
    if (msg.length>0 && user.length>0) {
        putAllMsg(user,msg)
    }
}
    return (
        <div>
            <input value={user} onChange={(e)=>{setUser(e.target.value)}}/>
            <input value={msg} onChange={(e)=>{setMsg(e.target.value)}}/>
            <button onClick={send}>send</button>
            
        </div>
    )
}

function MsgBubbles({allMsg}) {
    let mex= allMsg.map((e)=>(
        <li>
            <span>{e.user}: </span>
            <span>{e.msg}</span>
        </li>
    ))
    return (
        <div>
        <ol>{mex} </ol>
        </div>
    )
}
export function Chat() {
    const [allMsg, setAllMsg]=useState([])
    function putAllMsg(user, msg) {
        let newMessages = [...allMsg];
        newMessages.push({ user, msg });
        setAllMsg(newMessages);
      }
    return(
        <div>
            <MsgBubbles allMsg={allMsg}/>
            <Inpt putAllMsg={putAllMsg}/>
        </div>
    )
}