import './App.scss';
import Navigation from './general/Navigation';
import Pages from './general/Pages';

import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react'

import { addMessage } from './store/messagesSlice'
import { setConnectedUsers } from './store/userSlice'; 


import { signInRedux } from './store/userSlice'

const baseURL = process.env.REACT_APP_API_URL;

function App() {

  const dispatch = useDispatch();
  const socket = useRef();

  //проверка и взятие имени пользователя из локалСтордж
  //если есть - диспатчим в стор

  //в дальнейшем, будем определять по токену: если токен есть ищем в базе пользователя с таким токеном
  //и фетчим его данные, затем диспатчим в стор
  const userName = localStorage.getItem('userName');
  
  if (userName) {
    dispatch(signInRedux({userName}));
  } else {
    console.log('nothing')
  }

  const us = useSelector(state => state.users.users[0]?.name);
    
  function connect () {
      socket.current = new WebSocket(`ws://88.212.253.186:35228/chat`);
      
      socket.current.onopen = async () => {
        let idUs = await localStorage.getItem('id');
        let date = new Date();
  
        const message = {
          event: 'connection',
          //имя берётся из стора
          text: `Пользователь ${us} подключён`,
          userName: us,
          date: date.toLocaleTimeString(),
          _id: idUs
        }

        socket.current.send(JSON.stringify(message));
      }
  
      socket.current.onmessage = async (e) => {
        const mess = JSON.parse(e.data)

        //диспатчим соощение в стор
        dispatch(addMessage(mess));

        //заливаем массив подключённых ползователей в стор
        if (mess.event === 'connection') {
          dispatch(setConnectedUsers(mess.connectedUsers));
        }
        if (mess.event === 'close') {
          dispatch(setConnectedUsers(mess.connectedUsers));
        }
      }
    }

    
    //эта функция будет принимать в себя сообщение или инпут, и сокет
    const sendText = async (input) => {
      let idUs = await localStorage.getItem('id');
      let date = new Date();
      
      if (input === "") {
        console.log('сообщение не может быть пустым')
      } else {
        const message = {
          text: input,
          event: 'message',
          userName: us,
          date: date.toLocaleTimeString(),
          _id: idUs
        }
          
        socket.current.send(JSON.stringify(message));

      }
    }

    //эта функци должна передават им ползовател
    const close = async () => {
      let idUs = await localStorage.getItem('id');
      let date = new Date();
  
        const message = {
          event: 'close',
          //имя берётся из стора
          text: `Пользователь ${us} вышел`,
          userName: us,
          date: date.toLocaleTimeString(),
          _id: idUs
        }

        socket.current.send(JSON.stringify(message));
        socket.current.close();
    }

  
return (
  <div id='app' className="app">
      <Navigation close={close}/>
      <Pages connect={connect} sendText={sendText}/>
  </div>
  );
}

export default App;
