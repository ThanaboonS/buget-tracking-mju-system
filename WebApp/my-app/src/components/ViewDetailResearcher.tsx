import * as React from "react";

import 'antd/dist/antd.css'
import ViewResearcherDetailController from "src/controller/ViewResearcherDetailController";

export default class ViewDetailResearcher extends React.Component<any, any>{

    modelProject: any;
    state = {
        username: this.props.username,
        name: null,
        address: null,
        tel: null,
        email: null,
        idCard: null,
        idLine: null,
        faculty: null,
        major: null,
        password:null,
        usernamer:null
    }
    componentDidMount = async () => {
        var viewResearcherDetailController = new ViewResearcherDetailController()
        //console.log(this.props.username)
        var model = JSON.parse(JSON.stringify(await viewResearcherDetailController.queryResearcherName(this.props.username)))
        this.setState({
            name: model.name,
            address: model.address,
            tel: model.tel,
            email: model.email,
            idCard: model.idCard,
            idLine: model.idLine,
            faculty: model.faculty,
            major: model.major,
            password: model.password,
            usernamer:model.username
        })
        // console.log(model.name)
    }
    render() {
        return <div>

            <label><h1>{this.state.username}</h1></label>
            <div style={{ paddingLeft: '2%' }}>
              
                <p><b>รหัสบัตรประชาชน </b>{this.state.idCard}</p>
                <p><b>คณะ </b>{this.state.faculty}</p>
                <p><b>สาขา </b>{this.state.major}</p>
                <p><b>ที่อยู่ </b>{this.state.address}</p>
                <p><b>เบอร์โทรศัพท์ </b>{this.state.tel}</p>
                <p><b>ชื่อผู้ใช้ </b>{this.state.usernamer}</p>
                <p><b>รหัสผ่าน </b>{this.state.password}</p>
                <p><b>อีเมลล์ </b>{this.state.email}</p>
                <p><b>ไอดีไลน์ </b>{this.state.idLine}</p>
            </div>

        </div>
    }



}