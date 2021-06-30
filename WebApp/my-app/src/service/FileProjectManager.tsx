import FileProject from "src/class/FileProject";
import axios from 'axios'

export default class FileProjectManager {

    public async queryFileInProject(nameProject: string) {
        var array = new Array();
        var fileProject;
        const data = {
            'nameProject': nameProject
        }
        await fetch("http://localhost:8080/vListFileProject/listFile",
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
                    fileProject = new FileProject()
                    fileProject.setFileName(json[i].nameFile)
                    array.push({ fileProject })
                }

            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
        return array
    }

    public async saveFileProject(fileList: any, idProject: number) {
        var status = false;
        const formData = new FormData();
        for (var index = 0; index < fileList.length; index++) {
            formData.append("files", fileList[index]);
        }
        formData.append("idProject", idProject + '')
        //console.log('data:', formData.getAll('files'))
        
        await axios({
            url: 'http://localhost:8080/fileProject/uploadMultipleFiles',
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
    public async deleteFileInProject(nameFileProject: string) {       
        var status = false;
        const data = {
            'nameFileProject': nameFileProject
        }
        await fetch("http://localhost:8080/deleteFileProject/deleteFile",
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
                //return response.json()
                
            }).then((json) => {
                status = true;
            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
       return status;
    }
}