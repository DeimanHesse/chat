import axios from 'axios';
import { useState } from 'react';


import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { signInRedux } from '../../store/userSlice';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';

const baseURL = process.env.REACT_APP_API_URL;

const Reg = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();
    

    const fromPage = location.state?.from || '/';
    const userRedux = useSelector(state => state.users.users[0]?.name);
    
    const check = async () => {
        const res = await axios.get(`${baseURL}/users/?name=${userName}&password=${password}`)
        console.log('Пользователи', res.data)

       
        if (res.data.userExist) {
            console.log('works!!!')
            regUser();
        } else {

            console.log('это имя занято')
        }

        setUserName('');
        setPassword('');
    }

    async function regUser () {
        let user = {
            name: userName,
            password: password
        }

        const res = await axios.post(`${baseURL}/users`, user)
            localStorage.setItem('id', res.data._id);
            dispatch(signInRedux({userName: res.data.name}));
            navigate(fromPage, {replace: true});
            

    }

    if (userRedux) {
        //если не можем, то производим переадресацию на строницу логина, например
        //и пишем, откуда мы пришли (state), чтобы при авторизации, мы могли вернуться на эту страницу
        return <Navigate to='/' state={{from: location.pathname}}/>
        
    }


    return (
        <div className="auth">
            <div className="auth__title">Регистрация</div>
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
            <button className="auth__button" onClick={check}>Зарегистрироваться</button>
        </div>
    )
}

export default Reg;