import ProjectManager from "src/service/ProjectManager";
import PeriodManager from "src/service/PeriodManager";


export default class EditProjectController{
    public async updateProject(idProject:number,durationYear:number,typeProject:string,nameProject:string,dateStartProject:string,budget:number,periods:any,idPeriods:any){
        let projectManager = new ProjectManager({})
        let result = await projectManager.updateProject(idProject,durationYear,typeProject,nameProject,dateStartProject,budget)
        console.log(periods)
        
        let periodManager = new PeriodManager()
        for(let i=0; i<periods.length; i++){
            console.log(idPeriods[i])
            console.log(periods[i])
            await periodManager.updatePeriod(idPeriods[i], periods[i][2], periods[i][0], periods[i][1])
        }
        return result
    }
    
}