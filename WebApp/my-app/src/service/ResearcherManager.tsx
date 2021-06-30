import Researcher from '../class/Researcher'
import { message } from 'antd';
export default class ResearcherManager {

    public async listAllResearcher() {

        var arrayRe = new Array();
        await fetch("http://localhost:8080/vlistresearcher/listResearch",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "get",
            })
            .then((response) => {
                //console.log(response)
                return response.json()
            }).then((json) => {
                for (var i = 0; i < json.length; i++) {
                    var researcher = new Researcher();
                    researcher.setUsername(json[i].username);
                    researcher.setPassword(json[i].password)
                    researcher.setTypeUser(json[i].typeUser);
                    researcher.setName(json[i].name);
                    researcher.setFaculty(json[i].faculty);
                    researcher.setMajor(json[i].major);
                    researcher.setAddress(json[i].address);
                    researcher.setTel(json[i].tel);
                    researcher.setEmail(json[i].email);
                    researcher.setIdCard(json[i].idCard);
                    researcher.setIdLine(json[i].idLine);
                    arrayRe.push(researcher)
                }
            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
        return arrayRe;
    }

    /**
     * createResearcher
     */
    public async createResearcher(model: any) {
        var researcher = new Researcher();
        researcher.setUsername(model.username)
        researcher.setPassword(model.password)
        researcher.setTypeUser('researcher')
        researcher.setIdCard(model.idCard)
        researcher.setIdLine(model.idLine)
        researcher.setName(model.name)
        researcher.setFaculty(model.faculty)
        researcher.setMajor(model.major)
        researcher.setAddress(model.address)
        researcher.setTel(model.phone)
        researcher.setEmail(model.email)
        await fetch("http://localhost:8080/researcher/addResearcher",
            {

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "post",
                body: JSON.stringify(researcher)
            })
            .then((json) => {
                console.log(json)
                if(json.status===500){
                    message.error('เพิ่มนักวิจัยไม่สำเร็จ', 2);
                    return
                }
                message.success('เพิ่มนักวิจัยสำเร็จ', 2);

            })
            
            .catch((error) => {
                researcher.setUsername('')
                researcher.setPassword('')
                researcher.setTypeUser('')
                researcher.setIdCard('')
                researcher.setIdLine('')
                researcher.setName('')
                researcher.setFaculty('')
                researcher.setMajor('')
                researcher.setAddress('')
                researcher.setTel('')
                researcher.setEmail('')
                message.error('เพิ่มนักวิจัยไม่สำเร็จ', 2);
                console.error('parsing failed', error);
            });
        return researcher
    }
    public async searchProfile() {
        var data = {
            username: localStorage.getItem('username')
        }
        var model;
        await fetch("http://localhost:8080/profile/queryProfile",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "post",
                body: JSON.stringify(data)
            })
            .then((response) => {
                //console.log(response)
                return response.json()
            }).then((json) => {
                model = new Researcher();
                model.setName(json.name)
                model.setAddress(json.address)
                model.setTel(json.tel)
                model.setEmail(json.email)
                model.setIdCard(json.idCard)
                model.setIdLine(json.idLine)
                model.setFaculty(json.faculty)
                model.setMajor(json.major)
                model.setPassword(json.password)
            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
        return model
    }
    public async queryResearcherName(name:string) {
        var data = {
            name: name
        }
        var model;
        await fetch("http://localhost:8080/researcherDetail/queryProfile",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "post",
                body: JSON.stringify(data)
            })
            .then((response) => {
                //console.log(response)
                return response.json()
            }).then((json) => {
                model = new Researcher();
                model.setUsername(json.username)
                model.setPassword(json.password)
                model.setName(json.name)
                model.setAddress(json.address)
                model.setTel(json.tel)
                model.setEmail(json.email)
                model.setIdCard(json.idCard)
                model.setIdLine(json.idLine)
                model.setFaculty(json.faculty)
                model.setMajor(json.major)
                // console.log('modelResearcher:',model)
            })
           
            .catch((error) => {
                console.error('parsing failed', error);
            });
        return model
    }
    public async queryResearcherInProject(username:string) {
        var data = {
            username: username
        }
        var model;
        await fetch("http://localhost:8080/profile/queryProfile",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "post",
                body: JSON.stringify(data)
            })
            .then((response) => {
                //console.log(response)
                return response.json()
            }).then((json) => {
                model = new Researcher();
                model.setName(json.name)
                model.setAddress(json.address)
                model.setTel(json.tel)
                model.setEmail(json.email)
                model.setIdCard(json.idCard)
                model.setIdLine(json.idLine)
                model.setFaculty(json.faculty)
                model.setMajor(json.major)
                model.setPassword(json.password)
                model.setUsername(json.username)
            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
        return model
    }
    public async updateResearcher(name: string, address: string, tel: string, email: string, idCard: string, idLine: string,  faculty: string,major:string,password:string) {
        var researcher = new Researcher()
        researcher.setUsername(localStorage.getItem('username')+'')
        researcher.setName(name)
        researcher.setAddress(address)
        researcher.setTel(tel)
        researcher.setEmail(email)
        researcher.setIdCard(idCard)
        researcher.setIdLine(idLine)
        researcher.setFaculty(faculty)
        researcher.setMajor(major)
        researcher.setPassword(password)
        researcher.setTypeUser("researcher")
        var result =false            
        await fetch("http://localhost:8080/researcher/addResearcher",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "post",
                body: JSON.stringify(researcher)
            })
            .then((response) => {
                //console.log(response)
                return response.json()
            }).then((json) => {
                // console.log(json)
                if(json.status===500){
                    message.error('อัพเดตนักวิจัยไม่สำเร็จ', 2);
                    return
                }
                result = true
            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
        return result
    }
}




//---------------------------------------------------------------------------------------------------------------

// import Researcher from '../class/Researcher'
// import { message } from 'antd';
// export default class ResearcherManager {

//     public async listAllResearcher() {

//         var arrayRe = new Array();
//         await fetch("http://localhost:8080/BudgetTrackingSystem/vlistresearcher/listResearch",
//             {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 method: "get",
//             })
//             .then((response) => {
//                 //console.log(response)
//                 return response.json()
//             }).then((json) => {
//                 for (var i = 0; i < json.length; i++) {
//                     var researcher = new Researcher();
//                     researcher.setUsername(json[i].username);
//                     researcher.setPassword(json[i].password)
//                     researcher.setTypeUser(json[i].typeUser);
//                     researcher.setName(json[i].name);
//                     researcher.setFaculty(json[i].faculty);
//                     researcher.setMajor(json[i].major);
//                     researcher.setAddress(json[i].address);
//                     researcher.setTel(json[i].tel);
//                     researcher.setEmail(json[i].email);
//                     researcher.setIdCard(json[i].idCard);
//                     researcher.setIdLine(json[i].idLine);
//                     arrayRe.push(researcher)
//                 }
//             })
//             .catch((error) => {
//                 console.error('parsing failed', error);
//             });
//         return arrayRe;
//     }

//     /**
//      * createResearcher
//      */
//     public async createResearcher(model: any) {
//         var researcher = new Researcher();
//         researcher.setUsername(model.username)
//         researcher.setPassword(model.password)
//         researcher.setTypeUser('researcher')
//         researcher.setIdCard(model.idCard)
//         researcher.setIdLine(model.idLine)
//         researcher.setName(model.name)
//         researcher.setFaculty(model.faculty)
//         researcher.setMajor(model.major)
//         researcher.setAddress(model.address)
//         researcher.setTel(model.phone)
//         researcher.setEmail(model.email)
//         await fetch("http://localhost:8080/BudgetTrackingSystem/researcher/addResearcher",
//             {

//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 method: "post",
//                 body: JSON.stringify(researcher)
//             })
//             .then((json) => {
//                 // console.log(json)
//                 message.success('เพิ่มนักวิจัยสำเร็จ', 2);

//             })
//             .catch((error) => {
//                 researcher.setUsername('')
//                 researcher.setPassword('')
//                 researcher.setTypeUser('')
//                 researcher.setIdCard('')
//                 researcher.setIdLine('')
//                 researcher.setName('')
//                 researcher.setFaculty('')
//                 researcher.setMajor('')
//                 researcher.setAddress('')
//                 researcher.setTel('')
//                 researcher.setEmail('')
//                 message.error('เพิ่มนักวิจัยไม่สำเร็จ', 2);
//                 console.error('parsing failed', error);
//             });
//         return researcher
//     }
//     public async searchProfile() {
//         var data = {
//             username: localStorage.getItem('username')
//         }
//         var model;
//         await fetch("http://localhost:8080/BudgetTrackingSystem/profile/queryProfile",
//             {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 method: "post",
//                 body: JSON.stringify(data)
//             })
//             .then((response) => {
//                 //console.log(response)
//                 return response.json()
//             }).then((json) => {
//                 model = new Researcher();
//                 model.setName(json.name)
//                 model.setAddress(json.address)
//                 model.setTel(json.tel)
//                 model.setEmail(json.email)
//                 model.setIdCard(json.idCard)
//                 model.setIdLine(json.idLine)
//                 model.setFaculty(json.faculty)
//                 model.setMajor(json.major)
//                 model.setPassword(json.password)
//             })
//             .catch((error) => {
//                 console.error('parsing failed', error);
//             });
//         return model
//     }
//     public async queryResearcherName(name:string) {
//         var data = {
//             name: name
//         }
//         var model;
//         await fetch("http://localhost:8080/BudgetTrackingSystem/researcherDetail/queryProfile",
//             {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 method: "post",
//                 body: JSON.stringify(data)
//             })
//             .then((response) => {
//                 //console.log(response)
//                 return response.json()
//             }).then((json) => {
//                 model = new Researcher();
//                 model.setName(json.name)
//                 model.setAddress(json.address)
//                 model.setTel(json.tel)
//                 model.setEmail(json.email)
//                 model.setIdCard(json.idCard)
//                 model.setIdLine(json.idLine)
//                 model.Faculty(json.faculty)
//                 model.setMajor(json.major)
//                 // console.log('modelResearcher:',model)
//             })
           
//             .catch((error) => {
//                 console.error('parsing failed', error);
//             });
//         return model
//     }
//     public async queryResearcherInProject(username:string) {
//         var data = {
//             username: username
//         }
//         var model;
//         await fetch("http://localhost:8080/BudgetTrackingSystem/profile/queryProfile",
//             {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 method: "post",
//                 body: JSON.stringify(data)
//             })
//             .then((response) => {
//                 //console.log(response)
//                 return response.json()
//             }).then((json) => {
//                 model = new Researcher();
//                 model.setName(json.name)
//                 model.setAddress(json.address)
//                 model.setTel(json.tel)
//                 model.setEmail(json.email)
//                 model.setIdCard(json.idCard)
//                 model.setIdLine(json.idLine)
//                 model.setFaculty(json.faculty)
//                 model.setMajor(json.major)
//                 model.setPassword(json.password)
//             })
//             .catch((error) => {
//                 console.error('parsing failed', error);
//             });
//         return model
//     }
//     public async updateResearcher(name: string, address: string, tel: string, email: string, idCard: string, idLine: string,  faculty: string,major:string,password:string) {
//         var researcher = new Researcher()
//         researcher.setUsername(localStorage.getItem('username')+'')
//         researcher.setName(name)
//         researcher.setAddress(address)
//         researcher.setTel(tel)
//         researcher.setEmail(email)
//         researcher.setIdCard(idCard)
//         researcher.setIdLine(idLine)
//         researcher.setFaculty(faculty)
//         researcher.setMajor(major)
//         researcher.setPassword(password)
//         researcher.setTypeUser("researcher")
//         var result =false            
//         await fetch("http://localhost:8080/BudgetTrackingSystem/researcher/addResearcher",
//             {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 method: "post",
//                 body: JSON.stringify(researcher)
//             })
//             .then((response) => {
//                 //console.log(response)
//                 return response.json()
//             }).then((json) => {
//                 // console.log(json)
//                 result = true
//             })
//             .catch((error) => {
//                 console.error('parsing failed', error);
//             });
//         return result
//     }
// }