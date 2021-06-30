import * as React from 'react';
import Project from '../class/Project';
import { message } from 'antd';
export default class ProjectManager extends React.Component {
  public async listMyProject() {
    var array = new Array();
    var project
    const data = {
      'username': localStorage.getItem('username')
    }
    await fetch("http://localhost:8080/vlistProject/listMyProject",
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
          project = new Project()
          project.setIdProject(json[i].idProject)
          project.setNameProject(json[i].nameProject)
          project.setDateStartProject(json[i].dateStartProject)
          project.setBudget(json[i].budget)
          project.setTypeProject(json[i].typeProject)
          project.setStatusProject(json[i].statusProject),
          project.setDurationYear(json[i].durationYear)
          array.push({
            project
          })

        }

      })
      .catch((error) => {
        console.error('parsing failed', error);
      });
    return array
  }
  public async listMyProjectQuery(nameProject: string) {
    var array = new Array();
    var project
    const data = {
      'username': localStorage.getItem('username'),
      'nameProject': nameProject
    }
    await fetch("http://localhost:8080/vlistProject/searcherProject",
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
          project = new Project()
          project.setIdProject(json[i].idProject)
          project.setNameProject(json[i].nameProject)
          project.setDateStartProject(json[i].dateStartProject)
          project.setBudget(json[i].budget)
          project.setTypeProject(json[i].typeProject)
          project.setStatusProject(json[i].statusProject)
          project.setDurationYear(json[i].durationYear)
          array.push({
            project
          })
        }
      })
      .catch((error) => {
        console.error('parsing failed', error);
      });
    return array
  }
  /** 
   * createProject
   */
  public async createProject(project: Project, reader: string) {
    const data = {
      'username': localStorage.getItem('username'),
      'nameProject': project.getNameProject(),
      'idTypeProject': project.getTypeProject(),
      'budget': project.getBudget(),
      'durationYear': project.getDurationYear(),
      'statusProject': project.getStatusProject(),
      'reader': reader,
      'startProject': project.getDateStartProject(),
      'periodArray': project.getPeriods()
    }
    var result = false
    await fetch("http://localhost:8080/vproject/addProject",
      {

        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(data)
      })
      .then((json) => {
        console.log(json)
        if(json.status===500){
          message.error('การสร้างโครงการวิจัยไม่สำเร็จ กรุณาตรวจสอบข้อมูล', 2);
          return
         }
        message.success('สร้างโครงการวิจัยสำเร็จ', 2);
        result = true
        // localStorage.setItem('idProject', json.idProject);
      })
      .catch((error) => {
        message.error('การสร้างโครงการวิจัยไม่สำเร็จ กรุณาตรวจสอบข้อมูล', 2);
        console.error('parsing failed', error);
      });
    return result
  }


  public async getProjectDetail(id: number) {
    var project = new Project();
    await fetch("http://localhost:8080/viewProject/queryProject",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify({ idProject: id })
      })
      .then((response) => {
        //   console.log(response)
        return response.json()
      }).then((json) => {
        project.setIdProject(json.idProject)
        project.setNameProject(json.nameProject)
        project.setTypeProject(json.typeProject)
        project.setDurationYear(json.durationYear)
        project.setDateStartProject(json.dateStartProject)
        project.setBudget(json.budget)
        project.setStatusProject(json.statusProject)


      })
      .catch((error) => {
        console.error('parsing failed', error);
      });
    return project
  }
  public async getNameProjectDetail(name: string) {
    var project = new Project();
    await fetch("http://localhost:8080/viewProject/queryNameProject",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify({ nameProject: name })
      })
      .then((response) => {
        //   console.log(response)
        return response.json()
      }).then((json) => {
        project.setIdProject(json.idProject)
        project.setNameProject(json.nameProject)
        project.setTypeProject(json.typeProject)
        project.setDurationYear(json.durationYear)
        project.setDateStartProject(json.dateStartProject)
        project.setBudget(json.budget)
        project.setStatusProject(json.statusProject)
        // console.log(json)

      })
      .catch((error) => {
        // console.error('parsing failed', error);
      });
    return project
  }

  public async updateStatusProject(idProject: number, statusProject: string) {
    const data = {
      'idProject': idProject,
      'statusProject': statusProject
    }
    var result = false
    await fetch("http://localhost:8080/updateStatusProject/updateStatusProject",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(data)
      })
      .then((json) => {
        result = true
        // localStorage.setItem('idProject', json.idProject);
      })
      .catch((error) => {
        console.error('parsing failed', error);
      });
    return result
  }
  public async updateProject(idProject: number, durationYear: number, typeProject: string, nameProject: string, dateStartProject: string, budget: number) {
    const data = {
      'idProject': idProject,
      "durationYear": durationYear,
      "typeProject": typeProject,
      "nameProject": nameProject,
      "dateStartProject": dateStartProject,
      "budget": budget
    }
    console.log(idProject, '-', durationYear, '-', typeProject, '-', nameProject, '-', dateStartProject, '-', budget)
    var result = false
    await fetch("http://localhost:8080/editProject/updateProject",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(data)
      })
      .then((json) => {
        if(json.status===500){
          message.error('การอัพเดตโครงการวิจัยไม่สำเร็จ กรุณาตรวจสอบข้อมูล', 2);
          return
        }
        result = true
        // localStorage.setItem('idProject', json.idProject);
      })
      .catch((error) => {
        console.error('parsing failed', error);
      });
    return result
  }
  public async queryDuration() {
    let arrayDuration = new Array()
    await fetch("http://localhost:8080/listDuration/listDurationYear",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify({})
      })
      .then((response) => {
        //   console.log(response)
        return response.json()
      }).then((json) => {        
        arrayDuration=json       
      })
      .catch((error) => {
        console.error('parsing failed', error);
      });
    return arrayDuration
  }
}

//----------------------------------------------------------------------------------------
// import * as React from 'react';
// import Project from '../class/Project';
// import { message } from 'antd';
// export default class ProjectManager extends React.Component {
//   public async listMyProject() {
//     var array = new Array();
//     var project
//     const data = {
//       'username': localStorage.getItem('username')
//     }
//     await fetch("http://localhost:8080/BudgetTrackingSystem/vlistProject/listMyProject",
//       {
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         method: "post",
//         body: JSON.stringify(data)
//       })
//       .then((response) => {
//         //   console.log(response) 
//         return response.json()
//       }).then((json) => {
//         for (var i = 0; i < json.length; i++) {
//           project = new Project()
//           project.setIdProject(json[i].idProject)
//           project.setNameProject(json[i].nameProject)
//           project.setDateStartProject(json[i].dateStartProject)
//           project.setBudget(json[i].budget)
//           project.setTypeProject(json[i].typeProject)
//           project.setStatusProject(json[i].statusProject),
//           project.setDurationYear(json[i].durationYear)
//           array.push({
//             project
//           })

//         }

//       })
//       .catch((error) => {
//         console.error('parsing failed', error);
//       });
//     return array
//   }
//   public async listMyProjectQuery(nameProject: string) {
//     var array = new Array();
//     var project
//     const data = {
//       'username': localStorage.getItem('username'),
//       'nameProject': nameProject
//     }
//     await fetch("http://localhost:8080/BudgetTrackingSystem/vlistProject/searcherProject",
//       {
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         method: "post",
//         body: JSON.stringify(data)
//       })
//       .then((response) => {
//         //   console.log(response) 
//         return response.json()
//       }).then((json) => {
//         for (var i = 0; i < json.length; i++) {
//           project = new Project()
//           project.setIdProject(json[i].idProject)
//           project.setNameProject(json[i].nameProject)
//           project.setDateStartProject(json[i].dateStartProject)
//           project.setBudget(json[i].budget)
//           project.setTypeProject(json[i].typeProject)
//           project.setStatusProject(json[i].statusProject)
//           project.setDurationYear(json[i].durationYear)
//           array.push({
//             project
//           })
//         }
//       })
//       .catch((error) => {
//         console.error('parsing failed', error);
//       });
//     return array
//   }
//   /** 
//    * createProject
//    */
//   public async createProject(project: Project, reader: string) {
//     const data = {
//       'username': localStorage.getItem('username'),
//       'nameProject': project.getNameProject(),
//       'idTypeProject': project.getTypeProject(),
//       'budget': project.getBudget(),
//       'durationYear': project.getDurationYear(),
//       'statusProject': project.getStatusProject(),
//       'reader': reader,
//       'startProject': project.getDateStartProject(),
//       'periodArray': project.getPeriods()
//     }
//     var result = false
//     await fetch("http://localhost:8080/BudgetTrackingSystem/vproject/addProject",
//       {

//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         method: "post",
//         body: JSON.stringify(data)
//       })
//       .then((json) => {
//         console.log(json)
//         message.success('สร้างโครงการวิจัยสำเร็จ', 2);
//         result = true
//         // localStorage.setItem('idProject', json.idProject);
//       })
//       .catch((error) => {
//         message.error('การสร้างโครงการวิจัยไม่สำเร็จ กรุณาตรวจสอบข้อมูล', 2);
//         console.error('parsing failed', error);
//       });
//     return result
//   }


//   public async getProjectDetail(id: number) {
//     var project = new Project();
//     await fetch("http://localhost:8080/BudgetTrackingSystem/viewProject/queryProject",
//       {
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         method: "post",
//         body: JSON.stringify({ idProject: id })
//       })
//       .then((response) => {
//         //   console.log(response)
//         return response.json()
//       }).then((json) => {
//         project.setIdProject(json.idProject)
//         project.setNameProject(json.nameProject)
//         project.setTypeProject(json.typeProject)
//         project.setDurationYear(json.durationYear)
//         project.setDateStartProject(json.dateStartProject)
//         project.setBudget(json.budget)
//         project.setStatusProject(json.statusProject)


//       })
//       .catch((error) => {
//         console.error('parsing failed', error);
//       });
//     return project
//   }
//   public async getNameProjectDetail(name: string) {
//     var project = new Project();
//     await fetch("http://localhost:8080/BudgetTrackingSystem/viewProject/queryNameProject",
//       {
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         method: "post",
//         body: JSON.stringify({ nameProject: name })
//       })
//       .then((response) => {
//         //   console.log(response)
//         return response.json()
//       }).then((json) => {
//         project.setIdProject(json.idProject)
//         project.setNameProject(json.nameProject)
//         project.setTypeProject(json.typeProject)
//         project.setDurationYear(json.durationYear)
//         project.setDateStartProject(json.dateStartProject)
//         project.setBudget(json.budget)
//         project.setStatusProject(json.statusProject)
//         // console.log(json)

//       })
//       .catch((error) => {
//         // console.error('parsing failed', error);
//       });
//     return project
//   }

//   public async updateStatusProject(idProject: number, statusProject: string) {
//     const data = {
//       'idProject': idProject,
//       'statusProject': statusProject
//     }
//     var result = false
//     await fetch("http://localhost:8080/BudgetTrackingSystem/updateStatusProject/updateStatusProject",
//       {
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         method: "post",
//         body: JSON.stringify(data)
//       })
//       .then((json) => {
//         result = true
//         // localStorage.setItem('idProject', json.idProject);
//       })
//       .catch((error) => {
//         console.error('parsing failed', error);
//       });
//     return result
//   }
//   public async updateProject(idProject: number, durationYear: number, typeProject: string, nameProject: string, dateStartProject: string, budget: number) {
//     const data = {
//       'idProject': idProject,
//       "durationYear": durationYear,
//       "typeProject": typeProject,
//       "nameProject": nameProject,
//       "dateStartProject": dateStartProject,
//       "budget": budget
//     }
//     console.log(idProject, '-', durationYear, '-', typeProject, '-', nameProject, '-', dateStartProject, '-', budget)
//     var result = false
//     await fetch("http://localhost:8080/BudgetTrackingSystem/editProject/updateProject",
//       {
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         method: "post",
//         body: JSON.stringify(data)
//       })
//       .then((json) => {
//         result = true
//         // localStorage.setItem('idProject', json.idProject);
//       })
//       .catch((error) => {
//         console.error('parsing failed', error);
//       });
//     return result
//   }
//   public async queryDuration() {
//     let arrayDuration = new Array()
//     await fetch("http://localhost:8080/BudgetTrackingSystem/listDuration/listDurationYear",
//       {
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         method: "post",
//         body: JSON.stringify({})
//       })
//       .then((response) => {
//         //   console.log(response)
//         return response.json()
//       }).then((json) => {        
//         arrayDuration=json       
//       })
//       .catch((error) => {
//         console.error('parsing failed', error);
//       });
//     return arrayDuration
//   }
// }