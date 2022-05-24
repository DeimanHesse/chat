import MessageService from './services/MessageService.js'

let connectedUsers = [];   

 const wsConnect = (ws, req) => {

    ws.on('message', async function(msg) {
  
       let message = JSON.parse(msg);
      
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
    
  }

  //функция, которая будет делать рассылку всем пользователям
function broadcastMessagee (message) {
    let wss = expressW.getWss();
    wss.clients.forEach(client => {
      client.send(JSON.stringify(message));
    });
  }

  export default wsConnect;