import { Routes, Route, Navigate} from 'react-router-dom';

import Auth from '../pages/Auth/Auth';
import Reg from '../pages/Reg/Reg';
import Chat from '../pages/Chat/Chat';


const Pages = ({connect, sendText}) => {
    return (
            <div className="pages">
                <Routes>
                    <Route path="/auth" element={<Auth/>}/>
                    <Route path="/reg/" element={<Reg/>}/>
                    <Route path="/" element={
                       <Chat connect={connect} sendText={sendText}/> 
                    }/>
                    <Route path="*" element={<Navigate to="/" replace />}/>
                </Routes>
            </div>
        )
}

export default Pages;