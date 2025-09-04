export default async function Compra({ params }: { params: Promise<{ offerId: string }> }) {
    const { offerId } = await params;
    return <div>My Post: {offerId}</div>;
}
