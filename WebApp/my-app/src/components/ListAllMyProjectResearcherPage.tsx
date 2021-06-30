
import { Breadcrumb, Layout, Table, Spin } from 'antd';
import 'antd/dist/antd.css'

import * as React from "react";
import ListAllMyProjectResearcherController from 'src/controller/ListAllMyProjectResearcherController';
import ViewProjectDetailResearcherPage from './ViewProjectDetailResearcherPage';

const { Content } = Layout;
export default class ListAllMyProjectResearcherPage extends React.Component<any, any>{

    state = {
        projects: [],
        idProject: this.props.idProject,
        loading: true
    };
    columns = [
        {
            key: 'idProject',
            title: 'โครงการ',
            dataIndex: 'nameProject',
            render: (text: any) => <a onClick={() => { this.setState({ idProject: text }) }}>{text}</a>
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
            key: 'statusProject',
            title: 'สถานะโครงการ',
            dataIndex: 'statusProject'
        }
    ];
    componentDidMount = async () => {
        var listAllMyProjectResearcherController = new ListAllMyProjectResearcherController()
        var projects = await listAllMyProjectResearcherController.listProjectInResearcher()
        projects.reverse()
        this.setState({
            projects: [...this.state.projects, ...projects]
        })
        this.setState({ loading: false })
        // console.log(this.state.projects)
    }

    setPage = () => {
        if (this.state.idProject != null) {
            return <div>
                <ViewProjectDetailResearcherPage idProject={this.state.idProject} />
            </div>
        }
        else {
            return <Table columns={this.columns} dataSource={this.state.projects} rowKey='idProject' />
        }
    }
    setButtonBack = () => {
        if (this.state.idProject != null) {
            return <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><h1 onClick={() => { this.setState({ idProject: null }) }}><b><a >กลับหน้าหลัก</a></b></h1></Breadcrumb.Item>

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
                <Spin tip="Loading..." spinning={this.state.loading}>
                    {this.setButtonBack()}
                    <div style={{ background: '#fff', padding: 24, minHeight: 600 }}>
                        {this.setPage()}
                    </div>
                </Spin>
            </Content>
        )
    }
}