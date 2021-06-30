import Item from "src/class/Item";
import { message } from 'antd';

export default class ItemManager {
    public async checkHaveItem(idItem:string){
        
        let result = true
        await fetch("http://localhost:8080/viewItemDetail/getItemDetail",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "post",
                body: JSON.stringify({"idItem":idItem})
            })
            .then((response) => {
                //   console.log(response)
                return response.json()
            }).then((json) => {                           
                result = false
            })
            .catch((error) => {
                
            });
        return result
    }
    public async listItem(id: number) {
        var array = new Array();
        var item;
        const data = {
            'idPeriod': id
        }
        await fetch("http://localhost:8080/vlistItem/listMyItem",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "post",
                body: JSON.stringify(data)
            })
            .then((response) => {
                //   console.log(response)
                return response.json()
            }).then((json) => {
                for (var i = 0; i < json.length; i++) {
                    item = new Item();
                    item.setIdItem(json[i].idItem)                    
                    item.setDateBook(json[i].dateBook)
                    item.setTitleItem(json[i].titleItem)
                    item.setBudgetItem(json[i].budgetItem)
                    item.setStartItem(json[i].startItem)
                    item.setEndItem(json[i].endItem)                    
                    item.setDetail(json[i].detail)
                    item.setFileItem(json[i].fileItem)
                    array.push({ item })
                    
                }
            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
        return array
    }

    public async saveItem(itemModel:any,idPeriod:number) {
        let result = false
        const data = {
            "idPeriod":idPeriod,
            "idItem":itemModel.idItem,            
            "dateBook":itemModel.dateBook._d.getFullYear()+'-'+parseInt(itemModel.dateBook._d.getMonth()+1)+'-'+itemModel.dateBook._d.getDate(),
            "startItem":itemModel.startItem._d.getFullYear()+'-'+parseInt(itemModel.startItem._d.getMonth()+1)+'-'+itemModel.startItem._d.getDate(),
            "endItem":itemModel.endItem._d.getFullYear()+'-'+parseInt(itemModel.endItem._d.getMonth()+1)+'-'+itemModel.endItem._d.getDate(),
            "titleItem":itemModel.titleItem,
            "detail":itemModel.detail,            
            "budgetItem":itemModel.budgetItem
        }
        await fetch("http://localhost:8080/vaddItem/additem",
          {            
            headers: {          
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "post",
            body: JSON.stringify(data)        
          })
          .then((json) => {
            //console.log(json)
            message.success('เพิ่มกิจกรรมสำเร็จ', 2);
            result = true
          })
          .catch((error) => {
            message.error('ไม่สามารถเพิ่มกิจกรรมได้',2);
            console.error('parsing failed', error);
          });
          return result
      }

      public async deltetItem(idItem:string) {
        const data = {            
            "idItem":idItem
        }
        await fetch("http://localhost:8080/vDeleteItem/deleteITem",
          {            
            headers: {          
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "post",
            body: JSON.stringify(data)        
          })
          .then((json) => {
            //console.log(json)
            message.success('ลบกิจกรรมสำเร็จ!', 2);
          })
          .catch((error) => {
            message.error('ไม่สามารถลบกิจกรรมได้',2);
            console.error('parsing failed', error);
          });
      }
    
   
}

