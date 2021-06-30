import OfficerManager from "src/service/OfficerManager";
import ResearcherManager from "src/service/ResearcherManager";


export default class EditMyProfileController{
    public async updateProfile(name:string,address:string,tel:string,email:string,idCard:string,idLine:string,faculty:string,major:string,position:string,password:string){
        // console.log(name+'-'+address+'-'+tel+'-'+email+'-'+idCard+'-'+idLine+'-'+faculty+'-'+major+'-'+position)
        var result = false
        if(localStorage.getItem('typeUser')==='officer'){
            var officerManager = new OfficerManager()
            result = await officerManager.updateOfficer(name,address,tel,email,idCard,idLine,position,password)
        }else if(localStorage.getItem('typeUser')==='researcher'){
            var researcherManaer = new ResearcherManager()
            result = await researcherManaer.updateResearcher(name,address,tel,email,idCard,idLine,faculty,major,password)
        }     
        return result   
    }
}