export async function fetchData(){
  try{
    const res = await fetch(`/api/data`)
    if(!res.ok){
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return {experiences: data.experiences || [], projects: data.projects};
  }catch (err){
    console.error('Error fetching data:', err);
    return {experiences:[], projects:[]};
  }
}
