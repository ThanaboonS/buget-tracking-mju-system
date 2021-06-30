import ProjectManager from "src/service/ProjectManager";

export default class ListAllMyProjectController{
    private projectManager = new ProjectManager({});
    public async getAllMyProject(){        
        var arr= await this.projectManager.listMyProject()        
        return await arr
    }
    public async getAllMyProjectQuery(nameProject:string){        
        var arr= await this.projectManager.listMyProjectQuery(nameProject)        
        return await arr
    }
}