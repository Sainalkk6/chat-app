import { connect } from "@/lib/connectDB";
import { Chatroom } from "@/models/chatroom";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        await connect();

        const data: { senderId: string; receiverId: string; message: string; roomId:string } = await req.json();

        const existingChatRoom = await Chatroom.findOne({
            participants: {
                $all: [data.senderId, data.receiverId],
            },
        });

        if (existingChatRoom) {
            try {
                existingChatRoom.messages.push({
                    message: data.message,
                    senderId: data.senderId,
                    receiverId: data.receiverId,
                    timestamp: new Date().toISOString(),
                });

                await existingChatRoom.save();

                return NextResponse.json({ message: "Successfully updated the existing message" });
            } catch (error: any) {
                console.error("Error updating existing chat room:", error);
                return NextResponse.json({
                    message: "Something went wrong while updating the chat room",
                    error: {
                        message: error.message,
                        stack: error.stack,
                    },
                });
            }
        } else {
            try {
                await Chatroom.create({
                    participants: [data.senderId, data.receiverId],
                    roomId: data.roomId,
                    messages: [
                        {
                            message: data.message,
                            senderId: data.senderId,
                            receiverId: data.receiverId,
                            timestamp: new Date().toISOString(),
                        },
                    ],
                });

                return NextResponse.json({ message: "Successfully created a new chat room" });
            } catch (error: any) {
                console.error("Error creating a new chat room:", error);
                return NextResponse.json({
                    message: "Something went wrong while creating a new chat room",
                    error: {
                        message: error.message,
                        stack: error.stack,
                    },
                });
            }
        }
    } catch (error: any) {
        console.error("Error handling POST request:", error);
        return NextResponse.json({
            message: "Something went wrong while sending the message",
            error: {
                message: error.message,
                stack: error.stack,
            },
        });
    }
};
