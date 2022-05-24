import Message from "../models/Message.js";

class MessageService {
    async create(message) {
        const createMessage = await Message.create(message);
        return createMessage;
    }

    async getAll() {
        const messages = await Message.find();
        return messages;
    }
}

export default new MessageService();