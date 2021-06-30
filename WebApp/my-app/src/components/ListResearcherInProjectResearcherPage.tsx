import * as React from "react";
import { List, Avatar, Modal, Select,  Spin } from 'antd';
import 'antd/dist/antd.css'
import ListResearcherProjectController from "src/controller/ListResearcherProjectController";
import ViewResearcherInProjectController from "src/controller/ViewResearcherInProjectController";
import ListAllResearcherController from "src/controller/ListAllResearcherController";



const Option = Select.Option;

export default class ListResearcherInProjectResearcherPage extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
    }
    state = {
        arrRe: [],
        visible: false,

        username: '',
        name: '',
        idCard: '',
        faculty: '',
        major: '',
        address: '',
        email: '',
        tel: '',
        idLine: '',

        arrAllRe: [],

        arrayAddResearcher: [],

        loading: false,        
    }
   
    
    public async setListResearcher() {
        this.setState({loading:true})
        var listResearcherProjectController = new ListResearcherProjectController()
        var dataRe = await listResearcherProjectController.queryResearcherInProject(this.props.idProject)

        for (var i = 0; i < dataRe.length; i++) {
            // console.log(dataRe[i].name)
            this.setState({
                arrRe: [...this.state.arrRe, {
                    title: dataRe[i].name,
                    description: dataRe[i].statusInProject,
                    username: dataRe[i].username
                }]
            })
        }
        var listIndexToDelete = []
        let listAllResearcherController = new ListAllResearcherController();
        let arrayAllRe = await listAllResearcherController.listAllResearcher();
        for (let i = 0; i < arrayAllRe.length; i++) {
            for (let j = 0; j < dataRe.length; j++) {
                if (arrayAllRe[i].username === dataRe[j].username) {
                    listIndexToDelete.push(i)
                }
            }
        }
        listIndexToDelete.reverse()
        for (let i = 0; i < listIndexToDelete.length; i++) {
            arrayAllRe.splice(listIndexToDelete[i], 1)
        }
        for (let i = 0; i < arrayAllRe.length; i++) {
            this.setState({
                arrAllRe: [...this.state.arrAllRe, <Option key={arrayAllRe[i].username} value={arrayAllRe[i].username}>{arrayAllRe[i].name}</Option>]
            })
        }
        this.setState({loading:false})
    }

    componentDidMount = async () => {
        this.setListResearcher()
    }
    public async info(username: string) {
        var viewResearcherInProjectController = new ViewResearcherInProjectController()
        var model = JSON.parse(JSON.stringify(await viewResearcherInProjectController.queryDetailResearcherInProject(username + '')))
        console.log(model.name)
        Modal.info({
            title: 'ข้อมูลนักวิจัย',
            content: (
                <div>
                    <p><b>ชื่อ </b>{model.name}</p>
                    <p><b>รหัสบัตรประชาชน </b>{model.idCard}</p>
                    <p><b>คณะ </b>{model.faculty}</p>
                    <p><b>สาขา </b>{model.major}</p>
                    <p><b>ที่อยู่ </b>{model.address}</p>
                    <p><b>อีเมลล์ </b>{model.email}</p>
                    <p><b>เบอร์โทรศัพท์ </b>{model.tel}</p>
                    <p><b>ไอดีไลน์ </b>{model.idLine}</p>
                </div>
            ),
            onOk() { },
        });

    }
    
    render() {

        return <div>
            <br />
            <h3><b>รายชื่อผู้ร่วมโครงการ</b></h3>   
            <Spin className="researcher" tip="Loading..." spinning={this.state.loading}>
                <div style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '20px', paddingBottom: '20px', borderStyle: 'groove' }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.arrRe}
                        renderItem={(item: any) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://ih0.redbubble.net/image.264574568.3133/flat,1000x1000,075,f.u6.jpg" />}
                                    title={<div><a onClick={() => {
                                        this.info(item.username)
                                    }}><b style={{ color: '#2AA9FE' }}>{item.title}</b></a></div>}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </Spin>
            
        </div>
    }

}