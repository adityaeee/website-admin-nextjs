import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = await auth();
        const body = await req.json();

        const { name } = body;
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Harus mengisi nama toko", { status: 400 });
        }

        if (!params) {
            return new NextResponse("Store Id dibutuhkan", { status: 400 });
        }

        const store = await db.store.updateMany({
            where: { id: params.storeId, userId },
            data: { name },
        });

        return NextResponse.json(store);
    } catch (error) {
        console.log(`[STOTER_PATCH]`, error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params) {
            return new NextResponse("Store Id dibutuhkan", { status: 400 });
        }

        const store = await db.store.deleteMany({
            where: { id: params.storeId, userId },
        });

        return NextResponse.json(store);
    } catch (error) {
        console.log(`[STOTER_DELETE]`, error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
