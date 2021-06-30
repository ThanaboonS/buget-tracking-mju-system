import Officer from "src/class/Officer";



export default class OfficerManager {
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
                model = new Officer()
                model.setName(json.name)
                model.setAddress(json.address)
                model.setTel(json.tel)
                model.setEmail(json.email)
                model.setIdCard(json.idCard)
                model.setIdLine(json.idLine)
                model.setPosition(json.position)
                model.setPassword(json.password)
            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
        return model
    }

    public async updateOfficer(name: string, address: string, tel: string, email: string, idCard: string, idLine: string,  position: string,password:string) {
        var officer = new Officer()
        officer.setUsername(localStorage.getItem('username')+'')
        officer.setName(name)
        officer.setAddress(address)
        officer.setTel(tel)
        officer.setEmail(email)
        officer.setIdCard(idCard)
        officer.setIdLine(idLine)
        officer.setPosition(position)
        officer.setPassword(password)
        officer.setTypeUser('officer')      
        var result = false
        await fetch("http://localhost:8080/officer/addOfficer",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "post",
                body: JSON.stringify(officer)
            })
            .then((response) => {
                //console.log(response)
                return response.json()
            }).then((json) => {
                // console.log(json)
                result = true
            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
        return result
    }



}