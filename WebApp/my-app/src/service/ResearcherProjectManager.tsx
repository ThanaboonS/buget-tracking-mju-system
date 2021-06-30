
import ResearcherInProjectBean from "src/classBean/ResearcherInProjectBean";
import Project from "src/class/Project";
// import TypeProject from "src/class/TypeProject";


export default class ResearcherProjectManager{


    public async queryResearcherInProject(idProject:number){
        var arrayRe = new Array();
        await fetch("http://localhost:8080/vlistresearcherInProject/listResearcher",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "post",
                body: JSON.stringify({"idProject":idProject})
            })
            .then((response) => {
                //console.log(response)
                return response.json()
            }).then((json) => {
                for (var i = 0; i < json.length; i++) {
                    var researcher = new ResearcherInProjectBean();
                    researcher.setUsername(json[i].researcherProjectPK.researcher.username);     
                    researcher.setName(json[i].researcherProjectPK.researcher.name);
                    researcher.setFaculty(json[i].researcherProjectPK.researcher.faculty);
                    researcher.setMajor(json[i].researcherProjectPK.researcher.major);
                    researcher.setAddress(json[i].researcherProjectPK.researcher.address);
                    researcher.setTel(json[i].researcherProjectPK.researcher.tel);
                    researcher.setEmail(json[i].researcherProjectPK.researcher.email);
                    researcher.setIdCard(json[i].researcherProjectPK.researcher.idCard);
                    researcher.setIdLine(json[i].researcherProjectPK.researcher.idLine);
                    researcher.setStatusInProject(json[i].statusResearch)
                    arrayRe.push(researcher)
                    // console.log(json[i])
                }

                // console.log('researcherProject: ',json)

            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
        return arrayRe;
    }
    public async queryProjectInResearcher(username:string){
        var arrayPr = new Array();
        await fetch("http://localhost:8080/vlistProjectInResearcher/listProject",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "post",
                body: JSON.stringify({"username":username})
            })
            .then((response) => {
                //console.log(response)
                return response.json()
            }).then((json) => {
                for (var i = 0; i < json.length; i++) {
                    var project = new Project();
                    project.setIdProject(json[i].idProject)
                    project.setNameProject(json[i].nameProject)
                    
                    project.setTypeProject(json[i].typeProject)
                    project.setDateStartProject(json[i].dateStartProject)
                    project.setBudget(json[i].budget)
                    project.setDurationYear(json[i].durationYear)
                    project.setStatusProject(json[i].statusProject)
                    project.setTypeProject(json[i].typeProject.nameTypeProject)
                    arrayPr.push(project)
                    // console.log(project)
                }

                // console.log('researcherProject: ',json)

            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
        return arrayPr;
    }

    public async addResearcherInProject(idProject:number,username:any){ 
        var result = false
        await fetch("http://localhost:8080/addResearcherInProject/addResearcher",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "post",
                body: JSON.stringify({"idProject":idProject,"username":username})
            })
            .then((response) => {
                //console.log(response)
                return response.json()
            }).then((json) => {
                if(json!=null){
                    result = true
                }                
            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
        return result;
    }
    public async deleteResearcherProject(idProject:number,username:string){       
        var result = false
        await fetch("http://localhost:8080/vDeleteResearcherProject/deleteResearcherProject",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "post",
                body: JSON.stringify({"idProject":idProject,"username":username})
            })
            .then((response) => {
                //console.log(response)
                
            }).then((json) => {
                if(json!=null){
                    result = true
                }                
            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
        return result;
    }
}

//--------------------------------------------------------------------------------------------------------

// import ResearcherInProjectBean from "src/classBean/ResearcherInProjectBean";
// import Project from "src/class/Project";
// // import TypeProject from "src/class/TypeProject";


// export default class ResearcherProjectManager{


//     public async queryResearcherInProject(idProject:number){
//         var arrayRe = new Array();
//         await fetch("http://localhost:8080/BudgetTrackingSystem/vlistresearcherInProject/listResearcher",
//             {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 method: "post",
//                 body: JSON.stringify({"idProject":idProject})
//             })
//             .then((response) => {
//                 //console.log(response)
//                 return response.json()
//             }).then((json) => {
//                 for (var i = 0; i < json.length; i++) {
//                     var researcher = new ResearcherInProjectBean();
//                     researcher.setUsername(json[i].researcherProjectPK.researcher.username);     
//                     researcher.setName(json[i].researcherProjectPK.researcher.name);
//                     researcher.setFaculty(json[i].researcherProjectPK.researcher.faculty);
//                     researcher.setMajor(json[i].researcherProjectPK.researcher.major);
//                     researcher.setAddress(json[i].researcherProjectPK.researcher.address);
//                     researcher.setTel(json[i].researcherProjectPK.researcher.tel);
//                     researcher.setEmail(json[i].researcherProjectPK.researcher.email);
//                     researcher.setIdCard(json[i].researcherProjectPK.researcher.idCard);
//                     researcher.setIdLine(json[i].researcherProjectPK.researcher.idLine);
//                     researcher.setStatusInProject(json[i].statusResearch)
//                     arrayRe.push(researcher)
//                     // console.log(json[i])
//                 }

//                 // console.log('researcherProject: ',json)

//             })
//             .catch((error) => {
//                 console.error('parsing failed', error);
//             });
//         return arrayRe;
//     }
//     public async queryProjectInResearcher(username:string){
//         var arrayPr = new Array();
//         await fetch("http://localhost:8080/BudgetTrackingSystem/vlistProjectInResearcher/listProject",
//             {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 method: "post",
//                 body: JSON.stringify({"username":username})
//             })
//             .then((response) => {
//                 //console.log(response)
//                 return response.json()
//             }).then((json) => {
//                 for (var i = 0; i < json.length; i++) {
//                     var project = new Project();
//                     project.setIdProject(json[i].idProject)
//                     project.setNameProject(json[i].nameProject)
                    
//                     project.setTypeProject(json[i].typeProject)
//                     project.setDateStartProject(json[i].dateStartProject)
//                     project.setBudget(json[i].budget)
//                     project.setDurationYear(json[i].durationYear)
//                     project.setStatusProject(json[i].statusProject)
//                     project.setTypeProject(json[i].typeProject.nameTypeProject)
//                     arrayPr.push(project)
//                     // console.log(project)
//                 }

//                 // console.log('researcherProject: ',json)

//             })
//             .catch((error) => {
//                 console.error('parsing failed', error);
//             });
//         return arrayPr;
//     }

//     public async addResearcherInProject(idProject:number,username:any){ 
//         var result = false
//         await fetch("http://localhost:8080/BudgetTrackingSystem/addResearcherInProject/addResearcher",
//             {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 method: "post",
//                 body: JSON.stringify({"idProject":idProject,"username":username})
//             })
//             .then((response) => {
//                 //console.log(response)
//                 return response.json()
//             }).then((json) => {
//                 if(json!=null){
//                     result = true
//                 }                
//             })
//             .catch((error) => {
//                 console.error('parsing failed', error);
//             });
//         return result;
//     }
//     public async deleteResearcherProject(idProject:number,username:string){       
//         var result = false
//         await fetch("http://localhost:8080/BudgetTrackingSystem/vDeleteResearcherProject/deleteResearcherProject",
//             {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 method: "post",
//                 body: JSON.stringify({"idProject":idProject,"username":username})
//             })
//             .then((response) => {
//                 //console.log(response)
                
//             }).then((json) => {
//                 if(json!=null){
//                     result = true
//                 }                
//             })
//             .catch((error) => {
//                 console.error('parsing failed', error);
//             });
//         return result;
//     }
// }