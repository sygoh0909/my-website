export async function fetchData(){
  try{
    const res = await fetch(`/api/data`)
    if(!res.ok){
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return {skills: data.skills || [], experiences: data.experiences || []};
  }catch (err){
    console.error('Error fetching data:', err);
    return {skills:[], experiences:[]};
  }
}
