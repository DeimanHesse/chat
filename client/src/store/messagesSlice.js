import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
    },
    reducers: {
        //функция добавить пользователя
        addMessages(state, action) {
            state.messages = action.payload;
        },

        addMessage(state, action) {
            state.messages.push(action.payload);
        },
    },
});

export const {addMessages, addMessage} = messagesSlice.actions;

export default messagesSlice.reducer;