import * as React from "react";
import { Breadcrumb, Layout, Input, Button, Modal,message } from 'antd';
import 'antd/dist/antd.css'
import ViewMyProfileController from "src/controller/ViewMyProfileController";
import EditMyProfileController from "src/controller/EditMyProfileController";



const { Content } = Layout;
function error(arr: any[]) {
    var text = ''
    for (let i = 0; i < arr.length; i++) {
        text += ' --' + arr[i]
    }
    Modal.error({
        title: 'กรูณากรอกข้อมูล',
        content: '' + text,

    });
}
export default class ViewMyProfilePage extends React.Component<any, any> {
    state = {
        startValue: null,
        endValue: null,
        endOpen: false,

        name: '',
        address: '',
        tel: '',
        email: '',
        idCard: '',
        idLine: '',
        faculty: '',
        major: '',
        position: '',
        password: '',
        passwordConfirm: '',
        typeUser: localStorage.getItem('typeUser'),

        statusEditProfile: true
    };
    setName = (e: any) => { this.setState({ name: e.target.value }) }
    setAddress = (e: any) => { this.setState({ address: e.target.value }) }
    setTel = (e: any) => { this.setState({ tel: e.target.value }) }
    setEmail = (e: any) => { this.setState({ email: e.target.value }) }
    setIdCard = (e: any) => { this.setState({ idCard: e.target.value }) }
    setIdLine = (e: any) => { this.setState({ idLine: e.target.value }) }
    setFaculty = (e: any) => { this.setState({ faculty: e.target.value }) }
    setMajor = (e: any) => { this.setState({ major: e.target.value }) }
    setPositionn = (e: any) => { this.setState({ position: e.target.value }) }
    setPassword = (e: any) => { this.setState({ password: e.target.value }) }
    setPasswordConfirm = (e: any) => { this.setState({ passwordConfirm: e.target.value }) }
    handleCancel = async () => {
        var viewMyProfile = new ViewMyProfileController()
        var model = JSON.parse(JSON.stringify(await viewMyProfile.getDataProfile()))
        this.setState({
            name: model.name,
            address: model.address,
            tel: model.tel,
            email: model.email,
            idCard: model.idCard,
            idLine: model.idLine,
            password: model.password
        })
    }
    handleSubmit = async () => {
        var err = []
        if (this.state.name.trim() === '') {
            err.push('กรุณากรอกชื่อ นามสกุล')
        } else if (this.state.name.trim().length < 6 || this.state.name.trim().length > 30) {
            err.push('ชื่อต้องมีความยาวมากกว่า 6 และน้อยกว่า 30 ตัวอักษร')
        }
        if (this.state.address.trim() === '') {
            err.push('กรุณากรอกที่อยู่')
        } else if (this.state.address.trim().length < 10 || this.state.address.trim().length > 200) {
            err.push('ที่อยู่ต้องมีความยาวไม่น้อยกว่า 10 และไม่มากกว่า 200 ตัวอักษร')
        } else if (!/[A-z0-9ก-์\.\-\/\s+]/.test(this.state.address.trim())) {
            err.push('อนุญาติให้ใช้แค่ A-z , ก- ์ และสัญลักษณ์ "." , "/"')
        }
        if (this.state.tel.trim() === '') {
            err.push('เบอร์โทรศัพท์')
        } else if (!/[0-9]/.test(this.state.tel.trim())) {
            err.push('กรุณากรอกข้อมูลเบอร์โทรศัพท์ให้ถูกต้อง **0-9')
        } else if (this.state.tel.trim().length < 9) {
            err.push('กรุณากรอกข้อมูลเบอร์โทรศัพท์ให้ครบถ้วน')
        }
        if (this.state.email.trim() === '') {
            err.push('กรุณากรอกอีเมลล์')
        } else if (!/^[\w\.\-\_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.state.email.trim())) {
            err.push('กรุณากรอกอีเมลล์ให้ถูกต้อง')
        }
        if (this.state.idCard.trim() === '') {
            err.push('รหัสบัตรประชาชน')
        }
        if (this.state.password.trim() === '') {
            err.push('รหัสผ่าน')
        }
        if (this.state.password.trim() !== this.state.passwordConfirm) {
            err.push('กรุณากรอกรหัสผ่านให้ตรงกัน')
        } else if (this.state.password.trim().length < 4 || this.state.password.trim().length > 24) {
            err.push('กรุณากรอกรหัสผ่านให้มีความยาวอยู่ระหว่าง 4 - 24 ตัวอักษร')
        }
        if (this.state.idLine.trim() === '') {
            err.push('ไอดีไลน์')
        } else if (!/[\w\-\.]/.test(this.state.idLine.trim())) {
            err.push('อนุญาติให้ใช้แค่ A-z , 0-9 และสัญลักษณ์ "." , "-", "_"')
        }
        if (this.state.typeUser === 'researcher') {
            if (this.state.faculty.trim() === '') {
                err.push('กรุณากรอกคณะ')
            }
            if (this.state.major.trim() === '') {
                err.push('กรุณากรอกสาขา')
            }
        } else if (this.state.typeUser === 'officer') {
            if (this.state.position.trim() === '') {
                err.push('กรุณากรอกตำแหน่ง')
            }
        }

        if (err.length !== 0) {
            error(err)
            return
        }

        var editMyProfileController = new EditMyProfileController()
        var result = await editMyProfileController.updateProfile(this.state.name, this.state.address, this.state.tel, this.state.email, this.state.idCard, this.state.idLine, this.state.faculty, this.state.major, this.state.position, this.state.password)
        console.log('updateing: ' + result)
        if(result){
            message.success('การอัพเดตสำเร็จ', 2);
        }else{
            message.error('การอัพเดตไม่สำเร็จ', 2);
        }
        // var viewMyProfile = new ViewMyProfileController()
        // var model = JSON.parse(JSON.stringify(await viewMyProfile.getDataProfile()))
        // this.setState({
        //     name: model.name,
        //     address: model.address,
        //     tel: model.tel,
        //     email: model.email,
        //     idCard: model.idCard,
        //     idLine: model.idLine,
        //     statusEditProfile: false,
        //     password: model.password
        // })
    }
    componentDidMount = async () => {
        var viewMyProfile = new ViewMyProfileController()
        var model = JSON.parse(JSON.stringify(await viewMyProfile.getDataProfile()))
        console.log(model.address)
        this.setState({
            name: model.name,
            address: model.address,
            tel: model.tel,
            email: model.email,
            idCard: model.idCard,
            idLine: model.idLine,
            password: model.password,
            passwordConfirm: model.password
        })
        if (localStorage.getItem('typeUser') === 'officer') {
            this.setState({
                position: model.position
            })
        } else if (localStorage.getItem('typeUser') === 'researcher') {
            this.setState({
                faculty: model.faculty,
                major: model.major
            })
        }
    }

    setPosition = () => {
        var element = null
        if (this.state.typeUser === 'officer') {
            if (this.state.statusEditProfile) {
                element = <div><p><b>ตำแหน่ง </b><Input minLength={4} disabled defaultValue={this.state.position + ''} onChange={this.setPositionn} /></p></div>
            } else {
                element = <div><p><b>ตำแหน่ง </b>{this.state.position}</p></div>
            }
            return element
        } else if (this.state.typeUser === 'researcher') {
            if (this.state.statusEditProfile) {
                element = <div><p><b>คณะ </b><Input minLength={4} disabled defaultValue={this.state.faculty + ''} onChange={this.setFaculty} /></p><p><b>สาขา </b><Input minLength={4} disabled defaultValue={this.state.major + ''} onChange={this.setMajor} /></p></div>
            } else {
                element = <div><p><b>คณะ </b>{this.state.faculty}</p><p><b>สาขา </b>{this.state.major + ''}</p></div>
            }
            return element
        } return ''
    }
    setLinkEdit = () => {
        if (this.state.statusEditProfile) {
            return ''
        } else {
            return <a style={{ position: 'absolute', right: '7%' }} onClick={() => { this.setState({ statusEditProfile: true }) }}>แก้ไขข้อมูลส่วนตัว</a>
        }
    }
    // setPage = () => {
    //     if (this.state.statusEditProfile) {
    //         return <div style={{ paddingLeft: '40%',paddingRight:'40%',position: 'relative'  }}>
    //             <p><b>ชื่อ </b><Input defaultValue={this.state.name + ''} onChange={this.setName} />{this.setLinkEdit()}</p>
    //             {this.setPosition()}
    //             <p><b>รหัสบัตรประชาชน </b><Input disabled minLength={13} maxLength={13} defaultValue={this.state.idCard + ''} onChange={this.setIdCard} /></p>
    //             <p><b>เบอร์โทรศัพท์  </b><Input minLength={9} maxLength={9} defaultValue={this.state.tel} onChange={this.setTel} /></p>
    //             <p><b>ที่อยู่ </b><Input.TextArea minLength={10} maxLength={200} rows={4} defaultValue={this.state.address + ''} onChange={this.setAddress} /></p>
    //             <p><b>อีเมลล์ </b><Input type="email" defaultValue={this.state.email + ''} onChange={this.setEmail} /></p>
    //             <p><b>ไลน์ไอดี </b><Input minLength={4} maxLength={12} defaultValue={this.state.idLine + ''} onChange={this.setIdLine} /></p>
    //             <p><b>รหัสผ่าน </b><Input minLength={4} maxLength={24} type='password' defaultValue={this.state.password + ''} onChange={this.setPassword} /></p>
    //             <p><b>ยืนยันรหัสผ่าน </b><Input minLength={4} maxLength={24} type='password' defaultValue={this.state.passwordConfirm + ''} onChange={this.setPasswordConfirm} /></p>
    //             <Button type="primary" onClick={() => { this.handleSubmit() }}>Edit</Button> <Button style={{ paddingLeft: '5' }} onClick={() => {
    //                 this.handleCancel();
    //                 this.setState({ statusEditProfile: false })
    //             }}>Cancel</Button>
    //         </div>
    //     } else {
    //         return <div style={{ paddingLeft: '40%',paddingRight:'40%',position: 'relative'  }}>
    //             <p><b>ชื่อ </b>{this.state.name}{this.setLinkEdit()}</p>
    //             {this.setPosition()}
    //             <p><b>รหัสบัตรประชาชน </b>{this.state.idCard}</p>
    //             <p><b>เบอร์โทรศัพท์  </b>{this.state.tel}</p>
    //             <p><b>ที่อยู่ </b>{this.state.address}</p>
    //             <p><b>อีเมลล์ </b>{this.state.email}</p>
    //             <p><b>ไลน์ไอดี </b>{this.state.idLine}</p>
    //         </div>
    //     }
    // }
    render() {
        return <div>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><h1><b>ข้อมูลส่วนตัว</b></h1></Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 600 }}>
                    {/* {this.setPage()}                     */}
                    <div style={{ paddingLeft: '30%', paddingRight: '40%', position: 'relative' }}>
                        <p><b>ชื่อ </b><Input minLength={6} maxLength={100} defaultValue={this.state.name + ''} onChange={this.setName} />{this.setLinkEdit()}</p>
                        {this.setPosition()}
                        <p><b>รหัสบัตรประชาชน </b><Input disabled minLength={13} maxLength={13} defaultValue={this.state.idCard + ''} onChange={this.setIdCard} /></p>
                        <p><b>เบอร์โทรศัพท์  </b><Input minLength={10} maxLength={10} defaultValue={this.state.tel} onChange={this.setTel} /></p>
                        <p><b>ที่อยู่ </b><Input minLength={10} maxLength={255} defaultValue={this.state.address + ''} onChange={this.setAddress} /></p>
                        <p><b>อีเมลล์ </b><Input type="email" defaultValue={this.state.email + ''} onChange={this.setEmail} /></p>
                        <p><b>ไลน์ไอดี </b><Input minLength={4} maxLength={24} defaultValue={this.state.idLine + ''} onChange={this.setIdLine} /></p>
                        <p><b>ชื่อผู้ใช้ </b><Input disabled type="username" defaultValue={localStorage.getItem('username')+''} /></p>
                        <p><b>รหัสผ่าน </b><Input minLength={4} maxLength={24} type='password' defaultValue={this.state.password + ''} onChange={this.setPassword} /></p>
                        <p><b>ยืนยันรหัสผ่าน </b><Input minLength={4} maxLength={24} type='password' defaultValue={this.state.passwordConfirm + ''} onChange={this.setPasswordConfirm} /></p>
                        <Button type="primary" onClick={() => { this.handleSubmit() }}>อัพเดต</Button>
                    </div>
                    {/* <TestDatePickerMonth /> */}
                </div>
            </Content>
        </div>
    }
}
