import Member from "src/class/Member";

export default class MemberManager  {
    public verifyUser(userName: string, pass: string) {
        // var login = {
        //     username: userName,
        //     password: pass
        // }
        var member = new Member()
        member.setUsername(userName)
        member.setPassword(pass)
        var userTemp=''
        fetch("http://localhost:8080/vlog/login",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "post",
                body: JSON.stringify(member)
            })
            .then((response) => {
                //console.log(response)
                return response.json()
            }).then((json) => {                
                userTemp=json.username                
                localStorage.setItem('username', userTemp);
                localStorage.setItem('typeUser',json.typeUser)
                localStorage.removeItem('errText');
                window.location.reload();
            })
            .catch((error) => {
                localStorage.setItem('errText', 'ข้อมูลไม่ถูกต้อง');
                window.location.reload();
                console.error('parsing failed', error);    
            }); 
    }

    public async checkHaveMember(username: string) {        
        var result = true
        await fetch("http://localhost:8080/queryMember/getMember",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "post",
                body: JSON.stringify({"username":username})
            })
            .then((response) => {
                //console.log(response)
                return response.json()
            }).then((json) => {                
                result = false
            })
            .catch((error) => {                  
                
            }); 
            return result
    }
}