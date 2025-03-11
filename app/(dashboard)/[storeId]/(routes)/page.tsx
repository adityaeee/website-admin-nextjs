import db from "@/lib/db";

interface DashboardPageProps {
    params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
    const store = await db.store.findFirst({ where: { id: params.storeId } });

    return (
        <>
            <h1>Dashboard</h1>
            <h2>Active Store = {store?.name}</h2>
        </>
    );
};

export default DashboardPage;
