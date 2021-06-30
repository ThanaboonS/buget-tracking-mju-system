
import axios from 'axios'
import FileItem from 'src/class/FileItem';

export default class FileItemManager{
    public async queryFileItem(idItem: string) {
        var array = new Array();
        var fileItem;
        const data = {
            'idItem': idItem
        }
        await fetch("http://localhost:8080/vListFileItem/listFile",
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
                    fileItem = new FileItem()
                    fileItem.setFileName(json[i].fileName)
                    array.push({ fileItem })
                }
            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
        return array
    }

    public async saveFileItem(idItem:string,fileList:any){
        var status = false;
        const formData = new FormData();
        for (var index = 0; index < fileList.length; index++) {
            formData.append("files", fileList[index]);
        }
        formData.append("idItem", idItem)
        console.log(idItem)
        console.log(formData)
        //console.log('data:', formData.getAll('files'))
        
        await axios({
            url: 'http://localhost:8080/fileItem/uploadMultipleFiles',
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formData
        }).then((response) => {
           // console.log('res:', response)
            
            status = true            
        }).catch((err) => {
            console.log('err:', err)
                       
        });
        return status
    }
}
