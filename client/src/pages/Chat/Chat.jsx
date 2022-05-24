import { useEffect} from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import MessageField from './components/MessageField';
import MessageForm from './components/MessageForm';
import UserList from './components/UserList';

const Chat = ({connect, sendText}) => {
    const location = useLocation();
    const userRedux = useSelector(state => state.users.users[0]?.name);

    useEffect(() => {
        if (userRedux) {
            connect();
        }
    }, []);

    if (!userRedux) {
        //если не можем, то производим переадресацию на строницу логина, например
        //и пишем, откуда мы пришли (state), чтобы при авторизации, мы могли вернуться на эту страницу
        return <Navigate to='/auth' state={{from: location.pathname}}/>
    }

    return (
        <div className="chat _container">
            <UserList/>
            <div className="messaging">
                <MessageField/>
                <MessageForm sendText={sendText}/>
            </div>
        </div>
    )
}

export default Chat;