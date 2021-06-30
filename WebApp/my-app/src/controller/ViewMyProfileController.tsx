import OfficerManager from "src/service/OfficerManager";
import ResearcherManager from "src/service/ResearcherManager";


export default class ViewMyProfileController {
    public async getDataProfile() {
        var model
        if (localStorage.getItem('typeUser') === 'officer') {
            var officerManager = new OfficerManager()
            model = await officerManager.searchProfile()
            return model
        } else if (localStorage.getItem('typeUser') == 'researcher') {
            var researcherManager = new ResearcherManager()
            model = await researcherManager.searchProfile()
            return model
        }
        return model
    }
}