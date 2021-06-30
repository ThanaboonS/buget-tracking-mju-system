import PeriodManager from "src/service/PeriodManager";


export class ListPeriodController{

    public async listPeriod(idProject:number){
        let periodManager = new PeriodManager()
        let result = await periodManager.listPeriod(idProject)
        // console.log(result)
        return result
    }
}