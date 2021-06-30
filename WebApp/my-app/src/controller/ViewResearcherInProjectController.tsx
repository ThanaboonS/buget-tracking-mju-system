import ResearcherManager from "src/service/ResearcherManager";

export default class ViewResearcherInProjectController{
    public async queryDetailResearcherInProject(username:string){
        var researcherManager = new ResearcherManager()
        
        return await researcherManager.queryResearcherInProject(username)
    }
}