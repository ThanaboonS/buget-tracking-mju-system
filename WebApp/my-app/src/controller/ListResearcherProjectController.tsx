import ResearcherProjectManager from "src/service/ResearcherProjectManager";

export default class ListResearcherProjectController{
    public async queryResearcherInProject(idProject:number){
        var researcherProjectManager = new ResearcherProjectManager()
        var arrRe = await researcherProjectManager.queryResearcherInProject(idProject)
        return arrRe
    }
}