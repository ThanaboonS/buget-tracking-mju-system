import ResearcherManager from "../service/ResearcherManager";
import MemberManager from "src/service/MemberManager";

export default class AddResearcherController{
    /**
     * createResearcher
     */
    public async createResearcher(model:any) {
        console.log('model:',model)
        var memberManager = new MemberManager()
        var result = await memberManager.checkHaveMember(model.username)
        if(result){
            var researcherManager = new ResearcherManager();
            return await researcherManager.createResearcher(model);
        }else{
            return result
        }  
    }
}  