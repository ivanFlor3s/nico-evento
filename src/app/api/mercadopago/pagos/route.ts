export const POST = async (req: Request) => {
    console.log('Received payment notification', req);
    const body = await req.json();
    const { id } = body.data;
    console.log('Received payment notification for preference ID:', id);
    return new Response(JSON.stringify({ message: 'Notification received' }), { status: 200 });
}