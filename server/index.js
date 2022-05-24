import expressWs from 'express-ws'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';


import MessageService from './services/MessageService.js';
import UserService from './services/UserService.js';

import wsConnect from './wsContfoller.js';

import userRouter from './routes/user.routes.js';
import messageRouter from './routes/messages.routes.js';

const app = express();
const expressW = expressWs(app);

app.use(cors());
// app.use(express.json());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

app.use('/', userRouter);
app.use('/', messageRouter);

const PORT = 5000;
// const DB_URL = `mongodb+srv://Demian:q7777777@cluster0.fgsuo.mongodb.net/PayApp?retryWrites=true&w=majority`
const DB_URL = `mongodb+srv://demian:ytktpmdctnm@cluster0.cc7pl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


let connectedUsers = [];

// app.ws('/chat', wsConnect(ws, req));

//по чату будет отрабатывать функция
app.ws('/chat', function(ws, req) {

  ws.on('message', async function(msg) {

     let message = JSON.parse(msg);
     console.log(msg)
    
      switch (message.event) {
        case 'message':
          const messa = {
            text: message.text,
            date: message.date,
            event: message.event,
            userName: message.userName,
            user: message._id
            
          }
          
          const sendtext = await MessageService.create(messa)
          broadcastMessagee(message);
        break;

        case 'connection':
          //проверка существования имени (чтобы при обновлении страницы 
          //не добавлялись уже добавленные пользователи)
          let check = await connectedUsers.some(function(elem) {
            if (elem.user === message.userName) {
              return true;
            } else {
              return false;
            }
          });

          //если пользователя нет в массиве подключённых пользователях,
        // то добавляем и потом заносим сообщение о подключении в базу
        // и рассылаем подключение всем пользователям
         if (!check) {
            connectedUsers.push({user: message.userName});


            const messageConn = {
              text: message.text,
              date: message.date,
              event: message.event,
              connectedUsers: connectedUsers,
              userName: message.userName,
              user: message._id,
            }


            const sendtextConn = await MessageService.create(messageConn);
            broadcastMessagee(messageConn);
            } else {
              const messageConn = {
                event: message.event,
                connectedUsers: connectedUsers,
              }
              broadcastMessagee(messageConn);
            }
         
          
          
          
        console.log('81:',message)
        //найти из базы имя пользователя и пароль, сформировать
        //сообщение и только потом передать в функцию рассылки
        // connectedUsers.push({user: message.userName})
        console.log('connectedUsers 87:', connectedUsers);
        
        break;


        case 'close':
          // connectedUsers.push({user: message.userName})

          console.log('96:',message)
          connectedUsers = connectedUsers.filter(user => user.user !== message.userName);

          const messageClose = {
              text: message.text,
              date: message.date,
              event: message.event,
              connectedUsers: connectedUsers,
              userName: message.userName,
              user: message._id,
            }
            
            const sendtextClose = await MessageService.create(messageClose)
        
        console.log('connectedUsers 113:', connectedUsers);
        broadcastMessagee(messageClose);
        break;



        default:
          break;
      }
     
    });

    ws.on('close', function (msg) {
      // connectedUsers = connectedUsers.filter(user => todo.id !== action.payload.id);
      console.log('соединение закрыто')
    })
  
});


//функция, которая будет делать рассылку всем пользователям
function broadcastMessagee (message) {
  let wss = expressW.getWss();
  wss.clients.forEach(client => {
    client.send(JSON.stringify(message));
  });
}



async function startApp() {
  try {
      await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
      app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
  } catch (e) {
      console.log(e)
  }
}

startApp()