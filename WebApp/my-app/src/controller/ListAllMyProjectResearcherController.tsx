import ResearcherProjectManager from "src/service/ResearcherProjectManager";

export default class ListAllMyProjectResearcherController{
    public async listProjectInResearcher(){
        var researcherProjectManager = new ResearcherProjectManager()
        return await researcherProjectManager.queryProjectInResearcher(localStorage.getItem('username')+'')
    }
}