import ItemManager from "src/service/ItemManager";


export default class DeleteItemController{
    public deleteItem(idItem:string){
        console.log('deleteItem:',idItem)
        var itemManager = new ItemManager()
        itemManager.deltetItem(idItem)
    }
}