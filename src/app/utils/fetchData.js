export async function fetchData(){
  try{
    const res = await fetch(`/api/data`)
    if(!res.ok){
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return {languages: data.languages || [], frameworks: data.frameworks || [], databases: data.databases || [], platforms: data.platforms || [], otherSkills: data.otherSkills || [], education: data.education || [], projects: data.projects};
  }catch (err){
    console.error('Error fetching data:', err);
    return {languages:[], frameworks:[], databases:[], platforms:[], otherSkills:[], education:[], projects:[]};
  }
}
