import ItemManager from "src/service/ItemManager";
import { message } from 'antd';

export default class AddItemController {


    public async addItem(itemModel: any, idPeriod: number) {
        // console.log('Value AddItem:',itemModel.dateBook)
        // console.log('idPeriod:',idPeriod)
        //this.itemManager.saveItem(itemModel,idPeriod)        
        var itemManager = new ItemManager();
        var checkItem = await itemManager.checkHaveItem(itemModel.idItem)        
        if (checkItem){
            return await itemManager.saveItem(itemModel, idPeriod)
        }else{
            message.error('มีรหัสกิจกรรมนี้แล้วในระบบ',2);
            return false
        }    
    }
}