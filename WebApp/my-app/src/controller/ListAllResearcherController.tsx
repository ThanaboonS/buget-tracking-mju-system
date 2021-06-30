import ResearcherManager from '../service/ResearcherManager'
export default class ListAllResearcherController{
    

    
    public async listAllResearcher() {
        var researcherManager = new ResearcherManager();
        var arrayRe = await researcherManager.listAllResearcher();
        
        return arrayRe;
    }
}