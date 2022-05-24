import { NavLink } from "react-router-dom";
import { logOutRedux, toggleMenu } from "../store/userSlice";
import { useDispatch, useSelector } from 'react-redux';


const Navigation = ({close}) => {

    const dispatch = useDispatch();
    const userReduxId = useSelector(state => state.users.users[0]?._id);
    const userRedux = useSelector(state => state.users.users[0]?.name);

    const logOutHandler = () => {
        dispatch(logOutRedux({userReduxId}));
        localStorage.removeItem('userName');
        close();
    }


    const onlineHandler = () => {
        dispatch(toggleMenu());
    }

    if (userRedux) {
        return (
            <div className="navigation">
                <div className="navigation__inner _container">
                    <div onClick={onlineHandler} className="navigation__online">Онлайн</div>
                    <div onClick={logOutHandler} className="navigation__logout">Выход</div>
                </div>
            </div>
        )
    }

    return (
        <div className="navigation ">
            <div className="navigation__inner _container">
               
                <div className="navigation__links">
                    <NavLink 
                    style={{paddingLeft: 13, textDecoration: 'none'}} 
                    to="/auth">Авторизация</NavLink>
                <NavLink 
                style={{paddingLeft: 13, textDecoration: 'none'}} 
                to="/reg">Регистрация</NavLink>
                </div>
            </div>
            
            
        </div>
    )
}

export default Navigation;