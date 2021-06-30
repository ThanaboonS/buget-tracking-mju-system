import TypeProjectManager from "src/service/TypeProjectManager";

export default class ListTypeProjectController{
    public async listTypeProject(){
        var typeProjectManager = new TypeProjectManager() 
        return await typeProjectManager.listTypeProject()
    }
}