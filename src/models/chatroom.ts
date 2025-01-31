import mongoose, {models, Schema} from "mongoose"

const chatroomSchema = new Schema({
    id: Number,
    roomId:Number,
    participants: [String, String],
    messages: [{
        senderId: String,
        receiverId: String,
        timestamp: String,
        message: String,
    }]
})

export const Chatroom = models.Chatroom || mongoose.model('Chatroom', chatroomSchema)