import { useState } from 'react';

const MessageForm = ({sendText}) => {
    const [input, setInput] = useState('');

    const inputHandler = (e) => {
        setInput(e.target.value)
    }

    return (
        <div className="messageForm">
            <textarea type="text" onChange={(e) => inputHandler(e)} value={input} className="messageForm__input" />
            <button className="messageForm__button" onClick={() => sendText(input, setInput(''))}>Send</button>
        </div>
    )
}

export default MessageForm;