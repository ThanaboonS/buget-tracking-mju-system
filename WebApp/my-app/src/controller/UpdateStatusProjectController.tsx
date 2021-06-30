import ProjectManager from "src/service/ProjectManager";


export default class UpdateStatusProjectController{
    
    public async updateStatusProject(idProject:number,statusProject:string){
        var projectManager = new ProjectManager({})
        var result = await projectManager.updateStatusProject(idProject,statusProject)
        return result
    }
}