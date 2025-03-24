import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    res: Response,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = await auth();
        const body = await req.json();

        const { label, imageUrl } = body;
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!label) {
            return new NextResponse("Nama banner harus diisi", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("Image banner harus diisi", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store id URL dibutuhkan", { status: 400 });
        }

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const banner = await db.banner.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId,
            },
        });

        return NextResponse.json(banner);
    } catch (error) {
        console.log("[BANNERS_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    res: Response,
    { params }: { params: { storeId: string } }
) {
    try {
        if (!params.storeId) {
            return new NextResponse("Store id URL dibutuhkan", { status: 400 });
        }

        const banners = await db.banner.findMany({
            where: {
                storeId: params.storeId,
            },
        });

        return NextResponse.json(banners);
    } catch (error) {
        console.log("[BANNERS_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
