import ResearcherManager from "src/service/ResearcherManager";


export default class ViewResearcherDetailController {
    public async queryResearcherName(name: string) {
        var researcherManager = new ResearcherManager()
       // console.log(name)
        var model = await researcherManager.queryResearcherName(name)
        return model
    }
}