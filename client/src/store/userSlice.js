import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        connectedUsers: [
            {name: 'Rey'}
        ],
        menuActive: false
    },
    reducers: {
        signInRedux(state, action, newUser, callBack) {
            //добавление нового юзера
            console.log('actionPayload',action.payload)
            state.users.push({
                name: action.payload.userName,
                completed: false,
              });
            //   console.log('stateTodos',res)
            
            //переадресация
            // callBack();
        }, 
        logOutRedux(state, action, newUser, callBack) {
            //добавление нового юзера
            state.users = state.users.filter(user => user.id !== action.payload.id);
            
        }, 
        setConnectedUsers(state, action) {
            state.connectedUsers = action.payload;
        },
        removeConnectedUser(state, action) {
            console.log(action.payload)
            state.connectedUsers = state.connectedUsers.filter(user => user.user !== action.payload);

        },
        toggleMenu(state, action) {
            state.menuActive = !state.menuActive;
            console.log(state.menuActive)
        },
    },
});

export const {signInRedux, logOutRedux, setConnectedUsers, removeConnectedUser, 
    toggleMenu, 
    
   
} = userSlice.actions;

export default userSlice.reducer;