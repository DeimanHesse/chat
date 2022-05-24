import mongoose from 'mongoose';

const Message = new mongoose.Schema({
    text: {type: String, required: true},
    date: {type: String, required: true},
    userName: {type: String, required: true},
    event: {type: String, required: true},
    user: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId
    }
})

export default mongoose.model('messages', Message)