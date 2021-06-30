import Project from "../class/Project";
import ProjectManager from '../service/ProjectManager'
// import PeriodManager from "src/service/PeriodManager";
import Period from "src/class/Period";
export default class CreateProjectController {
    // public async createProject(durationYear: string, typeProject: any, nameProject: string, dateStartProject: any, periods: any, reader: string, budget: number) {


    //     let project: Project = new Project();
    //     let projectManager: ProjectManager = new ProjectManager({});

    //     let check = await projectManager.getNameProjectDetail(nameProject)

    //     if (JSON.parse(JSON.stringify(check)).nameProject === nameProject) {
    //         return true
    //     } else {
    //         project.setDurationYear(parseInt(durationYear))
    //         project.setTypeProject(typeProject)
    //         project.setNameProject(nameProject)
    //         project.setDateStartProject((parseInt(dateStartProject._d.getFullYear()) + 543) + '-' + parseInt(dateStartProject._d.getMonth()) + '-' + dateStartProject._d.getDate())
    //         project.setStatusProject('กำลังดำเนินการ')
    //         project.setBudget(budget)
    //         var result = await projectManager.createProject(project, reader)
    //         var idPro = await projectManager.getNameProjectDetail(nameProject)

    //         var periodManager = new PeriodManager()

    //         if (result) {
    //             for (let i = 0; i < periods.length; i++) {
    //                 await periodManager.addPeriod(idPro.getIdProject(), (i+1), periods[i][0], periods[i][1], periods[i][2])                   
    //             }
    //         }
    //         return false
    //     }
    // }
    public async createProject(durationYear: string, typeProject: any, nameProject: string, dateStartProject: any, periods: any, reader: string, budget: number) {


        let project: Project = new Project();
        let projectManager: ProjectManager = new ProjectManager({});

        let check = await projectManager.getNameProjectDetail(nameProject)

        if (JSON.parse(JSON.stringify(check)).nameProject === nameProject) {
            return true
        } else {
            project.setDurationYear(parseInt(durationYear))
            project.setTypeProject(typeProject)
            project.setNameProject(nameProject)
            project.setDateStartProject((parseInt(dateStartProject._d.getFullYear()) + 543) + '-' + parseInt(dateStartProject._d.getMonth()) + '-' + dateStartProject._d.getDate())
            project.setStatusProject('กำลังดำเนินการ')
            project.setBudget(budget)
            
            for(let i=0; i<periods.length; i++){
                let period:Period = new Period();
                period.setNoPeriod(i+1);
                period.setStartPeriod(periods[i][0]);
                period.setEndPeriod(periods[i][1]);
                period.setBudgetPeriod(periods[i][2]);
                // project.getPeriods().push(new Period())
                // console.log('Juiz:>>>> '+period)
                project.getPeriods().push(period)
                // console.log('project print==> '+project)
            }
            // for(let i=0; i<project.getPeriods().length; i++){
            //     console.log(i+'. '+project.getPeriods()[i].getStartPeriod());
            // }
            await projectManager.createProject(project, reader)
            // var idPro = await projectManager.getNameProjectDetail(nameProject)
            
            // var periodManager = new PeriodManager()

            // if (result) {
            //     for (let i = 0; i < periods.length; i++) {
            //         await periodManager.addPeriod(idPro.getIdProject(), (i+1), periods[i][0], periods[i][1], periods[i][2])                   
            //     }
            // }
            return false
        }
    }
}