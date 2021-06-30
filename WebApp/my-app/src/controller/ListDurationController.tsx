import ProjectManager from "src/service/ProjectManager";


export default class ListDurationController{

    public async listDuration(){
        let projectManager = new ProjectManager({})
        return await projectManager.queryDuration()
    }
}