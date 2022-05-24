import MessageService from "../services/MessageService.js";

class MessageController {
    async create(req, res) {
        try {
            const message = await MessageService.create(req.body)
            res.json(message)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    
    async getMessages(req, res) {
        try {
            const messages = await MessageService.getAll()
            res.json(messages)
            
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new MessageController();