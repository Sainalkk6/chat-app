import { db } from "@/utils/firebaseConfig";
import firebase from "firebase/compat/app";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);
        const usersData = querySnapshot.docs.map((doc) => doc.data());

        return NextResponse.json(usersData);
    } catch (err) {
        return NextResponse.json({ message: "Something went wrong while fetching the users ", error: err });
    }
};