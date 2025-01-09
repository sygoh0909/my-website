import { connectDB } from "@/app/connection/connection";

export async function GET(){
    try {
        const connection = await connectDB();
        const [skills] = await connection.query('SELECT * FROM skills');
        const [experiences] = await connection.query('SELECT * FROM experiences');
        return new Response(JSON.stringify({skills, experiences}), {status: 200});
    }catch (err){
        console.error('Database query error: ', err);
        return new Response(JSON.stringify({ error: 'Failed to fetch data'}), {status: 500});
    } finally {
        await connection.end();
    }
}