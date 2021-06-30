import FileItemManager from "src/service/FileItemManager";


export default class AddFileItemController{

    public async addFileItem(idItem:string,fileList:any){
        console.log(idItem)
        console.log(fileList)
        var fileItemManager = new FileItemManager()
        var result = await fileItemManager.saveFileItem(idItem,fileList);
        console.log('resultFileItem:',result)
    }
}