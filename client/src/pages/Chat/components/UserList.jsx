import { toggleMenu } from "../../../store/userSlice";
import { useDispatch, useSelector } from 'react-redux';

const UserList = () => {
    const connectedUsers = useSelector(state => state.users.connectedUsers);
    const menuActive = useSelector(state => state.users.menuActive);
    console.log('connectedUsers', connectedUsers)
    console.log('menuActive', menuActive)

    const dispatch = useDispatch();

    const onlineHandler = () => {
        dispatch(toggleMenu());
    }

    return (
        <div className={!menuActive ? 'userList' : 'userList active'}>
            <div onClick={onlineHandler} className="userList__close">X</div>
           {connectedUsers.map((user, index) => {
                return (
                    <div key={index} className="user">{user.user}</div>
                )
            })}
        </div>
    )
}

export default UserList;