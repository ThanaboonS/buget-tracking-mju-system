import TypeProject from "src/class/TypeProject";

// import TypeProject from "src/class/TypeProject";


export default class TypeProjectManager {

    public async listTypeProject() {
        var array = [{}]      
        var model
        array.pop()
        await fetch("http://localhost:8080/listTypeProject/listTypeProject",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "post"
            })
            .then((response) => {
                //   console.log(response)
                return response.json()
            }).then((json) => {                
                for(let i=0; i<json.length; i++){
                    //console.log('typeProject:'+json[i].nameTypeProject)
                    model = new TypeProject()
                    model.setNameTypProject(json[i].nameTypeProject)
                    array.push(model.getNameTypProject())
                }
            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
        return array
    }
}

//------------------------------------------------------------------------
// import TypeProject from "src/class/TypeProject";

// // import TypeProject from "src/class/TypeProject";


// export default class TypeProjectManager {

//     public async listTypeProject() {
//         var array = [{}]      
//         var model
//         array.pop()
//         await fetch("http://localhost:8080/BudgetTrackingSystem/listTypeProject/listTypeProject",
//             {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 method: "post"
//             })
//             .then((response) => {
//                 //   console.log(response)
//                 return response.json()
//             }).then((json) => {                
//                 for(let i=0; i<json.length; i++){
//                     //console.log('typeProject:'+json[i].nameTypeProject)
//                     model = new TypeProject()
//                     model.setNameTypProject(json[i].nameTypeProject)
//                     array.push(model.getNameTypProject())
//                 }
//             })
//             .catch((error) => {
//                 console.error('parsing failed', error);
//             });
//         return array
//     }
// }