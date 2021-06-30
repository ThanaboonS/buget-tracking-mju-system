import FileItemManager from "src/service/FileItemManager";


export default class ListFileItemController{
    public async listFileItem(idItem:string){
        var fileItemManager = new FileItemManager()
        var result = await fileItemManager.queryFileItem(idItem)
        return result
    }
}