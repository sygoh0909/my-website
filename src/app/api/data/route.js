export async function GET(){
    try {
        const URL = "http://sy-website.infinityfreeapp.com/db-api.php";
        const res = await fetch(URL);
        if (!res.ok){
            throw new Error("Failed to fetch data from API...");
        }
        const data = await res.json();
        const {skills, experiences} = data;
        return new Response (JSON.stringify({skills, experiences}), {status:200});
    }
    catch(err){
        console.error("Database query error: ", err);
        return new Response (JSON.stringify({error: "Failed to fetch data"}), {status:500});
    }
}