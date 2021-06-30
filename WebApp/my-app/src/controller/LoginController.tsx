import MemberManager from "src/service/MemberManager";


export default class LoginController{
    private memberManager = new MemberManager();
    public getLogin(userName:string,password:string){
        this.memberManager.verifyUser(userName,password)
        
    }
}