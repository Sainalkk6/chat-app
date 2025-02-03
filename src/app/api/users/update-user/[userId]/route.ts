import { db } from "@/utils/firebaseConfig";
import { pinata } from "@/utils/pinataConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: any) => {
    const { userId } = await params;
    const data = await req.json();
    let url;

    if (data.photoURL) {
        if (data.photoURL.startsWith("data:image")) {
            const base64Image = data.photoURL.split(",")[1];
            const buffer = Buffer.from(base64Image, "base64");

            const file = new File([buffer], "user-profile.jpg", {
                type: "image/jpeg",
                lastModified: Date.now()
            });

            const uploadData = await pinata.upload.file(file);
            url = await pinata.gateways.createSignedURL({
                cid: uploadData.cid,
                expires: 324646734687675
            });
        }
    } else {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        const firstLetter = data.displayName?.charAt(0).toUpperCase() || "@";

        const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="${randomColor}" />
            <text x="50%" y="50%" text-anchor="middle" font-size="45" font-weight="bold" fill="#FFF" font-family="Arial, sans-serif" dy=".3em">${firstLetter}</text>
        </svg>
    `;

        url = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
    }

    try {
        const userDoc = doc(db, "users", userId);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
            // Document exists, update it
            await updateDoc(userDoc, {
                displayName: data.displayName,
                phoneNumber: data.phoneNumber,
                photoURL: url,
                uid: data.uid
            });
        } else {
            // Document doesn't exist, create it
            await setDoc(userDoc, {
                displayName: data.displayName,
                phoneNumber: data.phoneNumber,
                photoURL: url,
                uid: data.uid
            });
        }
        return NextResponse.json({ message: "User data has been updated successfully" });
    } catch (err: any) {
        return NextResponse.json({
            message: "Something went wrong while updating the user info", error: {
                message: err.message, stack: err.stack
            }
        });
    }
};
