import * as React from "react";
import { Drawer,  Icon, } from 'antd';
import 'antd/dist/antd.css'
import ListFileProjectController from "src/controller/ListFileProjectController";



export default class ListFileProjectDrawerResearcher extends React.Component<any, any>{

    state = {
        visible: false,
        nameProject: this.props.nameProject,

        fileList: [],
        
        data: [],
        nameFileDelete: ''
    }
    componentDidMount = () => {
        this.setFileProject()
    }
    setFileProject = async () => {

        var listFileProjectController = new ListFileProjectController()
        var fileProjectArr = await listFileProjectController.listFileProject(this.state.nameProject)
        this.setState({ data: [] })
        for (var i = 0; i < fileProjectArr.length; i++) {
            // console.log(fileProjectArr[i].fileProject.getFileName())
            // data.push(<p key={i}>{i + 1 + '. '}<a href={'http://localhost:8080/fileProject/downloadFile/' + fileProjectArr[i].fileProject.getFileName()}>{fileProjectArr[i].fileProject.getFileName()}</a></p>)
            let nameFile = fileProjectArr[i].fileProject.getFileName()
            this.setState({
                data: [...this.state.data, <p key={i}>{i + 1 + '. '}<a href={'http://localhost:8080/fileProject/downloadFile/' + nameFile}>{nameFile}</a>                    
                </p>]
            })
        }
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    
    render() {
        return <div>
            <h3><a onClick={this.showDrawer}>
                <Icon type="file" />ไฟล์โครงการวิจัย
        </a></h3>
            <Drawer
                title="ไฟล์โครงการวิจัย"
                width={500}
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
            >
                {this.state.data}
                
            </Drawer>
        </div >
    }
}
