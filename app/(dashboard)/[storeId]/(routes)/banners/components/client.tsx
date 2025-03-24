"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const BannerClient = () => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex item-center justify-between">
                <Heading
                    title="Banner"
                    description="Atur baner untuk toko anda"
                />
                <Button onClick={() => router.push(`/${params.storeId}/banners/new`)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
        </>
    );
};

export default BannerClient;
