import { db } from "@/utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest, { params }: any) => {
    const { userId } = await params;
    try {
        const userDoc = await getDoc(doc(db, "users", userId));
        const user = userDoc.data();
        return NextResponse.json(user);
    } catch (err: any) {
        return NextResponse.json({
            message: "Something went wrong while fetching the user info",
            error: {
                message: err.message,
                stack: err.stack
            },
        });
    }
};
