import { connect } from "@/lib/connectDB";
import { Chatroom } from "@/models/chatroom";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const senderId = decodeURIComponent(searchParams.get("senderId") || "");
        const receiverId = decodeURIComponent(searchParams.get("receiverId") || "");
        await connect();
        const chatRoom = await Chatroom.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        });
        return NextResponse.json(chatRoom);
    } catch (error: any) {
        return NextResponse.json({
            message: "Something went wrong while getting the chats", error: {
                message: error.message,
                stack: error.stack
            }
        });
    }
};