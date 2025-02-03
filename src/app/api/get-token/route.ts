import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("auth")?.value;
    return NextResponse.json({ accessToken });
};