import ProjectManager from "src/service/ProjectManager";
import PeriodManager from "src/service/PeriodManager";
import ItemManager from "src/service/ItemManager";


export default class ViewProjectController {
    public async getProjectDetail(idProject: number) {
        var projectManager = new ProjectManager({});
        var modelProject = await projectManager.getProjectDetail(idProject);

       
        return modelProject
    }
    public async getNameProjectDetail(nameProject: string) {
        var projectManager = new ProjectManager({});
        var modelProject = await projectManager.getNameProjectDetail(nameProject);

        var periodModel = new PeriodManager();
        var arrPeriod = await periodModel.listPeriod(modelProject.getIdProject())

        for(var i=0; i<arrPeriod.length; i++){
            // console.log('arrPeriod:',arrPeriod[i].period.idPeriod)
            var itemModel = new ItemManager()
            //console.log('item:',await itemModel.listItem(arrPeriod[i].period.idPeriod))
            arrPeriod[i].period.items.push(await itemModel.listItem(arrPeriod[i].period.idPeriod))
        }
        modelProject.setPeriods(arrPeriod)        
        return await modelProject
    }

}