import { NextRequest, NextResponse } from "next/server";

export default function middleware (req: NextRequest) {
    let cookies = req.cookies.get("ecom_token");
    if(!cookies) return NextResponse.redirect(new URL("/", req.url))

}

export const config = {
    matcher: ["/minerva/:path*"]
}