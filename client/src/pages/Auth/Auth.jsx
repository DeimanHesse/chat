import { useLocation, useNavigate, Navigate } from "react-router-dom";

import axios from 'axios';
import { useState } from "react";

//redux
import { signInRedux } from "../../store/userSlice";
import { useDispatch, useSelector } from 'react-redux';

const baseURL = process.env.REACT_APP_API_URL;

const Auth = () => {
    const userRedux = useSelector(state => state.users.users[0]?.name);
    const navigate = useNavigate();
    const location = useLocation();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    
    // console.log(location);
    //опционально проверяем, есть ли у location state и ключ from. Если нет, то это перенаправится на главную страницу
    const fromPage = location.state?.from || '/';
    

    const handleSubmit = async (event) => {
        const res = await axios.get(`${baseURL}/users/?name=${userName}&password=${password}`)
        console.log('Пользователи', res.data)
       

                const usN = await res.data.name;
                console.log('usN',usN)

                if (usN) {
                    localStorage.setItem('id', res.data._id);
                    localStorage.setItem('userName', res.data.name);
                    dispatch(signInRedux({userName:usN}));
                    // console.log('UserName in Auth', userName)
                    navigate(fromPage, {replace: true})
                }
                if (!usN) {
                    console.log(res.data);
                }
     

    }

    if (userRedux) {
        //если не можем, то производим переадресацию на строницу логина, например
        //и пишем, откуда мы пришли (state), чтобы при авторизации, мы могли вернуться на эту страницу
        return <Navigate to='/' state={{from: location.pathname}}/>
        
    }

    return (
        <div className="auth">
            <div className="auth__title">Авторизация</div>
            
            <input 
                type="text" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                placeholder='Введите имя' 
                className="auth__input"
                />
            <input 
                type="text" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder='Введите пароль' 
                className="auth__input"
                />
            <button className="auth__button" onClick={handleSubmit}>Войти</button>
        </div>
    )
}

export default Auth;