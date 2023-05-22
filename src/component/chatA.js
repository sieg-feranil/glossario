import { useState } from "react";

function Messages({ messages }) {
  let messagesEls = messages.map((m) => (
    <li>
      <span>{m.from}</span>: {m.text}
    </li>
  ));
  return (
    <div className="messages">
      {messages.length === 0 ? (
        <span>No messages</span>
      ) : (
        <ol>{messagesEls}</ol>
      )}
    </div>
  );
}

function Inputs({ onNewMessage }) {
  const [user, setUser] = useState("");
  const [msg, setMsg] = useState("");

  const [userError, setUserError] = useState(false);
  const [msgError, setMsgError] = useState(false);

  function sendNewMessage() {
    setUserError(!user);
    setMsgError(!msg);

    if (!(userError && msgError)) {
      onNewMessage(user, msg);
    }
  }

  return (
    <div className="inputs">
      <input
        className={userError && "error"}
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="username"
      />
      <input
        className={msgError && "error"}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="message"
      />
      <button onClick={sendNewMessage}>Send</button>
    </div>
  );
}

function Chat() {
  const [messages, setMessages] = useState([
  ]);

  function onNewMessage(from, text) {
    let newMessages = [...messages];
    newMessages.push({ from, text });
    setMessages(newMessages);
  }
  return (
    <div className="chat">
      <Messages messages={messages} />
      <Inputs onNewMessage={onNewMessage} />
    </div>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Chat</h1>
      <Chat />
    </div>
  );
}