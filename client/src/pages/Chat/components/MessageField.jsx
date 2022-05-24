import Message from "./Message";
import axios from "axios";

import { addMessages } from '../../../store/messagesSlice'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const baseURL = process.env.REACT_APP_API_URL;

const MessageField = () => {

    const mes = useSelector(state => state.messages.messages);
    const currentUser = useSelector(state => state.users.users[0]?.name);
    const dispatch = useDispatch();

    const h2ref = useRef();
  
    useEffect(() => {
       getMessages();
    }, []);

    useEffect(() => {
        //а нахера я изменения скролла в юзэффект засунул? 
        const ff = h2ref.current;
        ff.scrollTo(0, ff.scrollHeight);
        //выесняем высоту блока
        //переводим позицию на эту дистанцию
        // ff.scrollToBottom();
    }, [mes]);

    const getMessages = async () => {
        const res = await axios.get(`${baseURL}/messages/`);
        dispatch(addMessages(res.data));
    }

    return (
        <div ref={h2ref} className="messageField">
           {mes.map((item, index) => {
                return (
                    <Message key={index} item={item} currentUser={currentUser}/>
                )
            })}
        </div>
    ) 
}

export default MessageField;