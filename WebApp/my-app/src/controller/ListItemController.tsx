import ItemManager from "src/service/ItemManager";


export default class ListItemController {
    public async listItem(idPeriod:number){
        let listItemManager = new ItemManager()
        let result = await listItemManager.listItem(idPeriod)
        return result
    }
}