import mysql from 'mysql2/promise';

export async function GET(){
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'royallove_2019',
        database: 'myWebsiteDB',
    });

    try {
        const [results] = await connection.query('SELECT * FROM skills');
        return new Response(JSON.stringify(results), {status: 200});
    }catch (err){
        console.error('Database query error: ', err);
        return new Response(JSON.stringify({ error: 'Failed to fetch skills'}), {status: 500});
    } finally {
        await connection.end();
    }
}