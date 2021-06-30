import ResearcherProjectManager from "src/service/ResearcherProjectManager";


export default class DeleteResearcherInProjectController{

    public async deleteResearcherProject(idProject:number,username:string){
        var researcherProjectManager = new ResearcherProjectManager()
        return await researcherProjectManager.deleteResearcherProject(idProject,username)        
    }
}