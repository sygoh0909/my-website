import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function GET(){
    try{
        const filePath = path.join(process.cwd(), 'data', 'data.json');
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileData);

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {'Content-Type': 'application/json'},
        });
    }catch (err){
        console.error('Error reading JSON file:', err);
        return new Response(
            JSON.stringify({error: 'Failed to load data'}),
            {status: 500}
        );
    }
}