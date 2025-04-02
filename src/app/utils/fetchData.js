export async function fetchData(){
  try{
    const res = await fetch(`/api/data`)
    if(!res.ok){
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return {programmingLanguages: data.programmingLanguages || [], frontend: data.frontend || [], design: data.design || [], versionControl: data.versionControl || [], architecture: data.architecture || [], experiences: data.experiences || [], projects: data.projects};
  }catch (err){
    console.error('Error fetching data:', err);
    return {programmingLanguages:[], frontend:[], design:[], versionControl:[], architecture:[], experiences:[], projects:[]};
  }
}
