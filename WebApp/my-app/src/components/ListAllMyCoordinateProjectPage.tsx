import { Breadcrumb, Layout, Table, Spin, Select, Button, Input, Form } from 'antd';
import 'antd/dist/antd.css'

import * as React from "react";
import ListAllMyCoordinateProjectController from 'src/controller/ListAllMyCoordinateProjectController';
import ViewProjectPage from './ViewProjectPage';
import ListTypeProjectController from 'src/controller/ListTypeProjectController';
import ListDurationController from 'src/controller/ListDurationController';

const FormItem = Form.Item;


const { Content } = Layout;
class ListAllMyProjectPage extends React.Component<any, any> {
    state = {
        data: [],
        idProject: this.props.idProject,
        loading: true,
        nameProject: '',
        typeProject: 'ทุกประเภท',
        statusProject: 'ทั้งหมด',
        arrTypePro: [],
        arrDuration: [],
        duration: 'ทุกปีงบประมาณ'
    };
    columns = [
        {
            key: 'nameProject',
            title: 'โครงการ',
            dataIndex: 'nameProject',
            render: (text: any) => <a onClick={() => { this.setState({ idProject: text }) }}>{text}</a>
        },
        {
            key: 'durationYear',
            title: 'ปีงบประมาณ',
            dataIndex: 'durationYear'
        },
        {
            key: 'typeProject',
            title: 'ประเภทโครงการ',
            dataIndex: 'typeProject'
        },
        {
            key: 'dateStartProject',
            title: 'วันเริ่มโครงการ',
            dataIndex: 'dateStartProject',
        },
        {
            key: 'budget',
            title: 'จำนวนเงิน',
            dataIndex: 'budget',
        },
        {
            key: 'status',
            title: 'สถานะโครงการ',
            dataIndex: 'status'
        }
    ];

    async componentDidMount() {
        var listAllMyProjectController = new ListAllMyCoordinateProjectController();
        var arrTemp = await listAllMyProjectController.getAllMyProject()
        arrTemp.reverse()
        for (let i = 0; i < arrTemp.length; i++) {
            this.setState({
                data: [...this.state.data, {
                    'idProject': arrTemp[i].project.idProject,
                    'nameProject': arrTemp[i].project.nameProject,
                    'typeProject': arrTemp[i].project.typeProject.nameTypeProject,
                    'dateStartProject': arrTemp[i].project.dateStartProject,
                    'budget': arrTemp[i].project.budget,
                    'status': arrTemp[i].project.statusProject,
                    'durationYear': arrTemp[i].project.durationYear
                }]
            })
        }
        let listTypeProjectController = new ListTypeProjectController()
        let arrayTypeProject = await listTypeProjectController.listTypeProject()
        this.setState({
            arrTypePro: [...this.state.arrTypePro, <Select.Option key={'ทุกประเภท'} value={'ทุกประเภท'}>ทุกประเภท</Select.Option>]
        })
        for (let i = 0; i < arrayTypeProject.length; i++) {
            // console.log('typeProject:'+arrayTypeProject[i])
            this.setState({
                arrTypePro: [...this.state.arrTypePro, <Select.Option key={arrayTypeProject[i] + ''} value={arrayTypeProject[i] + ''}>{arrayTypeProject[i]}</Select.Option>]
            })
        }
        let listDurationController = new ListDurationController()
        let durations = await listDurationController.listDuration()
        for (let i = 0; i < durations.length; i++) {
            this.setState({
                arrDuration: [...this.state.arrDuration, <Select.Option key={durations[i]} value={durations[i]}>{durations[i]}</Select.Option>]
            })
        }

        console.log(this.state.arrDuration)
        this.setState({ loading: false })
    }
    searching = async () => {
        this.setState({ loading: true })
        await this.setState({ data: [], loading: true, idProject: null })
        var listAllMyProjectController = new ListAllMyCoordinateProjectController();
        var arrTemp
        if (this.state.nameProject === '' || this.state.nameProject === null) {
            arrTemp = await listAllMyProjectController.getAllMyProject()
        } else {
            arrTemp = await listAllMyProjectController.getAllMyProjectQuery(this.state.nameProject + '')
        }

        arrTemp.reverse()
        if (this.state.duration === 'ทุกปีงบประมาณ') {
            if (this.state.typeProject === 'ทุกประเภท') {
                if (this.state.statusProject === 'ทั้งหมด') {
                    for (let i = 0; i < arrTemp.length; i++) {
                        this.setState({
                            data: [...this.state.data, {
                                'idProject': arrTemp[i].project.idProject,
                                'nameProject': arrTemp[i].project.nameProject,
                                'typeProject': arrTemp[i].project.typeProject.nameTypeProject,
                                'dateStartProject': arrTemp[i].project.dateStartProject,
                                'budget': arrTemp[i].project.budget,
                                'status': arrTemp[i].project.statusProject,
                                'durationYear': arrTemp[i].project.durationYear
                            }]
                        })
                    }
                } else {
                    for (let i = 0; i < arrTemp.length; i++) {
                        if (this.state.statusProject === arrTemp[i].project.statusProject) {
                            this.setState({
                                data: [...this.state.data, {
                                    'idProject': arrTemp[i].project.idProject,
                                    'nameProject': arrTemp[i].project.nameProject,
                                    'typeProject': arrTemp[i].project.typeProject.nameTypeProject,
                                    'dateStartProject': arrTemp[i].project.dateStartProject,
                                    'budget': arrTemp[i].project.budget,
                                    'status': arrTemp[i].project.statusProject,
                                    'durationYear': arrTemp[i].project.durationYear
                                }]
                            })
                        }
                    }
                }
            } else {
                for (let i = 0; i < arrTemp.length; i++) {
                    if (this.state.typeProject === arrTemp[i].project.typeProject.nameTypeProject) {
                        if (this.state.statusProject === arrTemp[i].project.statusProject) {
                            this.setState({
                                data: [...this.state.data, {
                                    'idProject': arrTemp[i].project.idProject,
                                    'nameProject': arrTemp[i].project.nameProject,
                                    'typeProject': arrTemp[i].project.typeProject.nameTypeProject,
                                    'dateStartProject': arrTemp[i].project.dateStartProject,
                                    'budget': arrTemp[i].project.budget,
                                    'status': arrTemp[i].project.statusProject,
                                    'durationYear': arrTemp[i].project.durationYear
                                }]
                            })
                        } else if (this.state.statusProject === 'ทั้งหมด') {
                            this.setState({
                                data: [...this.state.data, {
                                    'idProject': arrTemp[i].project.idProject,
                                    'nameProject': arrTemp[i].project.nameProject,
                                    'typeProject': arrTemp[i].project.typeProject.nameTypeProject,
                                    'dateStartProject': arrTemp[i].project.dateStartProject,
                                    'budget': arrTemp[i].project.budget,
                                    'status': arrTemp[i].project.statusProject,
                                    'durationYear': arrTemp[i].project.durationYear
                                }]
                            })
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < arrTemp.length; i++) {
                if (this.state.duration === arrTemp[i].project.durationYear) {
                    if (this.state.typeProject === 'ทุกประเภท') {
                        if (this.state.statusProject === 'ทั้งหมด') {
                            this.setState({
                                data: [...this.state.data, {
                                    'idProject': arrTemp[i].project.idProject,
                                    'nameProject': arrTemp[i].project.nameProject,
                                    'typeProject': arrTemp[i].project.typeProject.nameTypeProject,
                                    'dateStartProject': arrTemp[i].project.dateStartProject,
                                    'budget': arrTemp[i].project.budget,
                                    'status': arrTemp[i].project.statusProject,
                                    'durationYear': arrTemp[i].project.durationYear
                                }]
                            })
                        } else {
                            if (this.state.statusProject === arrTemp[i].project.statusProject) {
                                this.setState({
                                    data: [...this.state.data, {
                                        'idProject': arrTemp[i].project.idProject,
                                        'nameProject': arrTemp[i].project.nameProject,
                                        'typeProject': arrTemp[i].project.typeProject.nameTypeProject,
                                        'dateStartProject': arrTemp[i].project.dateStartProject,
                                        'budget': arrTemp[i].project.budget,
                                        'status': arrTemp[i].project.statusProject,
                                        'durationYear': arrTemp[i].project.durationYear
                                    }]
                                })
                            }
                        }
                    } else {
                        if (this.state.typeProject === arrTemp[i].project.typeProject.nameTypeProject) {
                            if (this.state.statusProject === arrTemp[i].project.statusProject) {
                                this.setState({
                                    data: [...this.state.data, {
                                        'idProject': arrTemp[i].project.idProject,
                                        'nameProject': arrTemp[i].project.nameProject,
                                        'typeProject': arrTemp[i].project.typeProject.nameTypeProject,
                                        'dateStartProject': arrTemp[i].project.dateStartProject,
                                        'budget': arrTemp[i].project.budget,
                                        'status': arrTemp[i].project.statusProject,
                                        'durationYear': arrTemp[i].project.durationYear
                                    }]
                                })
                            } else if (this.state.statusProject === 'ทั้งหมด') {
                                this.setState({
                                    data: [...this.state.data, {
                                        'idProject': arrTemp[i].project.idProject,
                                        'nameProject': arrTemp[i].project.nameProject,
                                        'typeProject': arrTemp[i].project.typeProject.nameTypeProject,
                                        'dateStartProject': arrTemp[i].project.dateStartProject,
                                        'budget': arrTemp[i].project.budget,
                                        'status': arrTemp[i].project.statusProject,
                                        'durationYear': arrTemp[i].project.durationYear
                                    }]
                                })
                            }
                        }
                    }
                }
            }
        }
        this.setState({ loading: false })
    }
    re_render = async () => {
        await this.setState({ data: [], loading: true, idProject: null, typeProject: 'ทุกประเภท', statusProject: 'ทั้งหมด', nameProject: '',duration:'ทุกปีงบประมาณ' })
        var listAllMyProjectController = new ListAllMyCoordinateProjectController();
        var arrTemp = await listAllMyProjectController.getAllMyProject()
        arrTemp.reverse()
        for (let i = 0; i < arrTemp.length; i++) {
            this.setState({
                data: [...this.state.data, {
                    'idProject': arrTemp[i].project.idProject,
                    'nameProject': arrTemp[i].project.nameProject,
                    'typeProject': arrTemp[i].project.typeProject.nameTypeProject,
                    'dateStartProject': arrTemp[i].project.dateStartProject,
                    'budget': arrTemp[i].project.budget,
                    'status': arrTemp[i].project.statusProject,
                    'durationYear': arrTemp[i].project.durationYear
                }]
            })
        }
        await this.setState({ loading: false })
    }
    _setDuration = (e: any) => {
        this.setState({ duration: e })
        console.log(this.state.duration)
    }
    _setTypeProject = (e: any) => {
        this.setState({ typeProject: e })
        console.log(this.state.typeProject)
    }
    _setStatusProject = (e: any) => {
        this.setState({ statusProject: e })
        console.log(this.state.statusProject)
    }
    _setNameProject = (e: any) => {
        this.setState({
            nameProject: e.target.value
        })
    }
    setPage = () => {
        if (this.state.idProject != null) {
            return <div>
                <ViewProjectPage idProject={this.state.idProject} />
            </div>
        }
        else {
            return <div><Form layout="inline" onSubmit={this.searching}>
                <FormItem>
                    <b>ชื่อโครงการวิจัย </b><Input value={this.state.nameProject} onChange={this._setNameProject} style={{ width: '100%' }} />
                </FormItem>
                <FormItem>
                    <b>ปีงบประมาณ </b><Select
                        showSearch
                        placeholder="Select a duration"
                        optionFilterProp="children"
                        value={this.state.duration}
                        onChange={this._setDuration}
                        filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Select.Option key={'ทุกปีงบประมาณ'} value={'ทุกปีงบประมาณ'}>ทุกปีงบประมาณ</Select.Option>
                        {this.state.arrDuration}
                    </Select>
                </FormItem>
                <FormItem>
                    <b>ประเภทโครงการวิจัย </b><Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        value={this.state.typeProject}
                        onChange={this._setTypeProject}
                        filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {this.state.arrTypePro}
                    </Select>
                </FormItem>
                <FormItem>
                    <b>  สถานะโครงการวิจัย </b><br></br>
                    <Select value={this.state.statusProject} onChange={this._setStatusProject} style={{ width: '150px' }}>
                        <Select.Option key={'ทั้งหมด'} value={'ทั้งหมด'}>ทั้งหมด</Select.Option>
                        <Select.Option key={'กำลังดำเนินการ'} value={'กำลังดำเนินการ'}>กำลังดำเนินการ</Select.Option>
                        <Select.Option key={'โครงการเสร็จสิ้น'} value={'โครงการเสร็จสิ้น'}>โครงการเสร็จสิ้น</Select.Option>
                    </Select>
                </FormItem>
                <FormItem><br></br>
                    <Button onClick={this.searching} shape="circle" icon="search" /><Button type="dashed" onClick={this.re_render} style={{ left: '5px', }} shape="circle" icon="sync" />
                </FormItem>
            </Form>
                <Table style={{ paddingTop: '20px' }} columns={this.columns} dataSource={this.state.data} rowKey='nameProject' />
            </div>
            // <div><p><Input />
            //     <b>ประเภทโครงการวิจัย </b><Select
            //         showSearch
            //         placeholder="Select a person"
            //         optionFilterProp="children"
            //         value={this.state.typeProject}
            //         onChange={this._setTypeProject}
            //         filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            //     >
            //         {this.state.arrTypePro}
            //     </Select>
            //     <b>  สถานะโครงการวิจัย </b>
            //     <Select value={this.state.statusProject} onChange={this._setStatusProject} style={{ width: '150px' }}>                
            //         <Select.Option key={'ทั้งหมด'} value={'ทั้งหมด'}>ทั้งหมด</Select.Option>
            //         <Select.Option key={'กำลังดำเนินการ'} value={'กำลังดำเนินการ'}>กำลังดำเนินการ</Select.Option>
            //         <Select.Option key={'โครงการเสร็จสิ้น'} value={'โครงการเสร็จสิ้น'}>โครงการเสร็จสิ้น</Select.Option>
            //     </Select> <Button onClick={this.searching} shape="circle" icon="search" /><Button type="dashed" onClick={this.re_render} style={{left:'5px',}} shape="circle" icon="sync" />
            // </p>
            //     <Table style={{ paddingTop: '20px' }} columns={this.columns} dataSource={this.state.data} rowKey='nameProject' />
            // </div>
        }
    }
    setButtonBack = () => {
        if (this.state.idProject != null) {
            return <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><h1 onClick={() => { this.searching() }}><b><a >กลับหน้าหลัก</a></b></h1></Breadcrumb.Item>
            </Breadcrumb>
        } else {
            return <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><h1><b>โครงการวิจัย</b></h1></Breadcrumb.Item>
            </Breadcrumb>
        }
    }

    render() {
        return (
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
                <Spin tip="Loading..." style={{ position: 'absolute', top: '30%' }} spinning={this.state.loading}>
                    {this.setButtonBack()}
                    <div style={{ background: '#fff', padding: 24, minHeight: 600 }}>
                        {this.setPage()}
                    </div>
                </Spin>
            </Content>
        )
    }
}

export default ListAllMyProjectPage;