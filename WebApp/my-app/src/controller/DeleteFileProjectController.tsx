import FileProjectManager from "src/service/FileProjectManager";

export default class DeleteFileProjectController{

    public async deleteFileProject(nameFileProject:string){
        let fileProjectManager = new FileProjectManager()
        var result = await fileProjectManager.deleteFileInProject(nameFileProject)
        return result;
    }
}