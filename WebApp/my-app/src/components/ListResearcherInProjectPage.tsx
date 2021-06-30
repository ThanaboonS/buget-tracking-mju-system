import * as React from "react";
import { List, Avatar, Modal, Select, Button, Spin, Icon } from 'antd';
import 'antd/dist/antd.css'
import ListResearcherProjectController from "src/controller/ListResearcherProjectController";
import ViewResearcherInProjectController from "src/controller/ViewResearcherInProjectController";
import ListAllResearcherController from "src/controller/ListAllResearcherController";
import AddResearcherInProjectController from "src/controller/AddResearcherInProjectController";
import DeleteResearcherInProjectController from "src/controller/DeleteResearcherInProjectController";


const Option = Select.Option;






export default class ListResearcherInProject extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
    }
    state = {
        arrRe: [],
        arrReReader: [],
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

        visible2: false,
        deleteUser: '',
        deleteName: '',

        statusRes: false
    }

    handleChange = (value: any) => {
        console.log(`selected ${value}`);
        this.setState({
            arrayAddResearcher: value
        })
        console.log('researcherAdd:', this.state.arrayAddResearcher)
    }
    hannleOk = async () => {
        this.setState({ loading: true })
        var addResearcherInProjectController = new AddResearcherInProjectController();
        var result = await addResearcherInProjectController.addResearcherInProject(this.props.idProject, this.state.arrayAddResearcher);
        if (result) {
            this.setState({
                arrReReader:[],
                arrRe: [],
                arrAllRe: []
            })
            var listResearcherProjectController = new ListResearcherProjectController()
            var dataRe = await listResearcherProjectController.queryResearcherInProject(this.props.idProject)
            for (var i = 0; i < dataRe.length; i++) {

                if (dataRe[i].statusInProject === 'หัวหน้าโครงการวิจัย') {
                    this.setState({
                        arrReReader: [...this.state.arrReReader, {
                            title: dataRe[i].name,
                            description: dataRe[i].statusInProject,
                            username: dataRe[i].username
                        }]
                    })
                } else {
                    this.setState({
                        arrRe: [...this.state.arrRe, {
                            title: dataRe[i].name,
                            description: dataRe[i].statusInProject,
                            username: dataRe[i].username
                        }]
                    })
                }
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
            this.setState({ loading: false, arrayAddResearcher: [] })

        }
    }
    public async setListResearcher() {
        this.setState({ loading: true })
        var listResearcherProjectController = new ListResearcherProjectController()
        var dataRe = await listResearcherProjectController.queryResearcherInProject(this.props.idProject)

        for (var i = 0; i < dataRe.length; i++) {
            console.log(dataRe[i].statusInProject)
            if (dataRe[i].statusInProject === 'หัวหน้าโครงการวิจัย') {
                this.setState({
                    arrReReader: [...this.state.arrReReader, {
                        title: dataRe[i].name,
                        description: dataRe[i].statusInProject,
                        username: dataRe[i].username
                    }]
                })
            } else {
                this.setState({
                    arrRe: [...this.state.arrRe, {
                        title: dataRe[i].name,
                        description: dataRe[i].statusInProject,
                        username: dataRe[i].username
                    }]
                })
            }
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
        this.setState({ loading: false })
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
                    <p><b>ชื่อผู้ใช้งาน </b>{model.username}</p>
                    <p><b>รหัสผ่าน </b>{model.password}</p>
                    <p><b>เบอร์โทรศัพท์ </b>{model.tel}</p>
                    <p><b>ไอดีไลน์ </b>{model.idLine}</p>
                </div>
            ),
            onOk() { },
        });

    }
    showModal = () => {
        this.setState({
            visible2: true,
        });
    }

    handleOk = async (e: any) => {
        console.log(e);
        this.setState({
            loading: true,
            arrRe: [],
            arrAllRe: [],
            arrReReader: []
        })

        var deleteResearcherProjectController = new DeleteResearcherInProjectController()
        await deleteResearcherProjectController.deleteResearcherProject(this.props.idProject, this.state.deleteUser)
        this.setListResearcher()

        this.setState({
            visible2: false,
            loading: false
        });
    }

    handleCancel = (e: any) => {
        console.log(e);
        this.setState({
            visible2: false,
        });
    }
    render() {

        return <div>
            <br />
            <h3><b>รายชื่อผู้ร่วมโครงการ</b></h3>

            <div hidden={this.props.statusProjectSwist}>
                ค้นหานักวิจัย <Select
                    mode="multiple"
                    placeholder="ค้นหานักวิจัย"
                    style={{ width: '50%' }}
                    onChange={this.handleChange}
                    value={this.state.arrayAddResearcher}
                    optionFilterProp="children"
                    filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {this.state.arrAllRe}
                </Select> <Button loading={this.state.loading} onClick={this.hannleOk} type="primary" style={{ width: '10%' }}>เพิ่ม</Button>
            </div>
            <br /><br />
            <Spin className="researcher" tip="Loading..." spinning={this.state.loading}>
                <div style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '20px', paddingBottom: '20px', borderStyle: 'groove' }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.arrReReader}
                        renderItem={(item: any) => (

                            <List.Item>

                                <List.Item.Meta
                                    avatar={<Avatar src="https://ih0.redbubble.net/image.264574568.3133/flat,1000x1000,075,f.u6.jpg" />}
                                    title={<div><a onClick={() => {
                                        this.info(item.username)
                                    }}><b style={{ color: '#2AA9FE' }}>{item.title}</b></a>
                                    </div>}
                                    description={item.description}
                                />
                            </List.Item>

                        )}
                    />
                </div>
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
                                    }}><b style={{ color: '#2AA9FE' }}>{item.title}</b></a>

                                        <a hidden={this.props.statusProjectSwist} onClick={() => { this.setState({ visible2: true, deleteUser: item.username, deleteName: item.title }) }} style={{ color: "red", right: '5%', position: 'absolute' }}>Delete</a>
                                    </div>}
                                    description={item.description}
                                />
                            </List.Item>

                        )}
                    />
                </div>
            </Spin>
            <Modal
                title="คุณต้องการถอนนักวิจัยคนนี้ใช่หรือไม่"
                visible={this.state.visible2}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Icon type="user-delete" style={{ fontSize: '300%', color: 'red' }} />
                <p>{this.state.deleteName}</p>
            </Modal>
        </div>
    }

}