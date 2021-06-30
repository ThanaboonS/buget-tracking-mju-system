import ResearcherProjectManager from "src/service/ResearcherProjectManager";


export default class AddResearcherInProjectController{
    public async addResearcherInProject(idProject:number, username:any){
        var researcherProjectManager = new ResearcherProjectManager()
        console.log(idProject)
        console.log(username)
        var result = await researcherProjectManager.addResearcherInProject(idProject,username)
        return result
    }
}