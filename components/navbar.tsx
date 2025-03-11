import { SignedIn, UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { redirect } from "next/navigation";

const Navbar = async () => {
    const { userId } = await auth();
    if (!userId) {
        redirect("/sign-in");
    }

    const stores = await db.store.findMany({
        where: {
            userId,
        },
    });
    return (
        <div className="border-b-2">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores} />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
