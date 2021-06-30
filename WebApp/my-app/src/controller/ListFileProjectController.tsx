import FileProjectManager from "src/service/FileProjectManager";

export default class ListFileProjectController{

    

    public async listFileProject(nameProject:string){
        var fileProjectManager = new FileProjectManager()
        var arrFileProject = await fileProjectManager.queryFileInProject(nameProject)        
        return arrFileProject
        
    }
}