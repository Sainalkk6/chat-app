import { connect } from "@/lib/connectDB";
import { Chatroom } from "@/models/chatroom";
import { db } from "@/utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const userId = decodeURIComponent((searchParams.get("userId") || ""));
        await connect();

        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);
        const usersData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter((user) => user.id !== userId);
        const finalData = await Promise.all(usersData.map(async (item) => {
            const chatRoom = await Chatroom.findOne({
                participants: {
                    $all: [userId, item.id]
                }
            });
            if (chatRoom) {
                const finalIndex = chatRoom.messages[chatRoom.messages.length - 1];
                const yayy = { ...item, lastMessage: finalIndex.message, timestamp: finalIndex.timestamp };
                return yayy;
            }
            return item;
        }));
        return NextResponse.json(finalData);
    } catch (err) {
        return NextResponse.json({ message: "Something went wrong while fetching the users ", error: err });
    }
};