import FileProjectManager from "src/service/FileProjectManager";


export default class AddFileProjectController{
    public async addFileProject(files:any,idProject:number){
        
        var fileProjectManager = new FileProjectManager();
        var result = await fileProjectManager.saveFileProject(files,idProject)        
        //console.log('result:',result)
        return result
    }
}