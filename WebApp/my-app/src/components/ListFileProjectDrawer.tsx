import * as React from "react";
import { Drawer, Upload, Icon, Button, message, Modal } from 'antd';
import 'antd/dist/antd.css'
import ListFileProjectController from "src/controller/ListFileProjectController";
import AddFileProjectController from "src/controller/AddFileProjectController";
import DeleteFileProjectController from "src/controller/DeleteFileProjectController";



export default class ListFileProjectDrawer extends React.Component<any, any>{

    state = {
        visible: false,
        nameProject: this.props.nameProject,

        fileList: [],
        uploading: false,
        data: [],
        nameFileDelete: '',
        visible2: false,
        hidden:false
    }
    
    componentDidMount = async() => {             
        await this.setFileProject()
        
    }
    setFileProject = async () => {        
        var listFileProjectController = new ListFileProjectController()
        var fileProjectArr = await listFileProjectController.listFileProject(this.state.nameProject)
        this.setState({ data: [] })
        for (var i = 0; i < fileProjectArr.length; i++) {
            let nameFile = fileProjectArr[i].fileProject.getFileName()            
            let deleteFile =  <a hidden={this.state.hidden} onClick={() => { this.setState({ nameFileDelete: nameFile, visible2: true }) }} style={{ position: 'absolute', right: '5%', color: 'red' }}>delete</a>
            
            let element = <div key={i}>{i + 1 + '. '}<a href={'http://localhost:8080/fileProject/downloadFile/' + nameFile}>{nameFile}</a>{deleteFile}</div>
            this.setState({
                data: [...this.state.data,element ]
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

    handleOk = async () => {

        let deleteFileProjectController = new DeleteFileProjectController()
        let result = await deleteFileProjectController.deleteFileProject(this.state.nameFileDelete)
        if(result){
            message.success('ลบไฟล์สำเร็จ');
        }else{
            message.error('ลบไฟล์ล้มเหลว');
        }
        this.setFileProject()
        this.setState({
            visible2: false,
        });
        this.setState({
            visible2: false,
        });
    }
    handleCancel = (e: any) => {
        console.log(e);
        this.setState({
            visible2: false,
        });
    }
    handleUpload = async () => {
        const { fileList } = this.state;
        var addFileProjectController = new AddFileProjectController();
        this.setState({
            uploading: true,
        });
        var booleanUploading = await addFileProjectController.addFileProject(fileList, this.props.idProject)
        if (booleanUploading) {
            message.success('เพิ่มไฟล์สำเร็จ');
            this.setState({
                uploading: false,
                fileList: []
            });
            this.setFileProject()
        } else {
            message.error('เพิ่มไฟล์ล้มเหลว');
            this.setState({
                uploading: false,
            });
        }
    }
    setPageUpload = () => {
        if (localStorage.getItem('typeUser') === 'researcher') {
            return ''
        }
        const { uploading, fileList } = this.state;
        const props = {
            multiple: true,
            onRemove: (file: any) => {
                this.setState((state: any) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file: any) => {
                this.setState((state: any) => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };
        return <div hidden={this.props.hidden}>
            <br />
            <h3>อัพโหลดไฟล์</h3>
            <br />

            <Upload.Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>


            </Upload.Dragger>
            <Button
                type="primary"
                onClick={this.handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
            >
                {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
            <Modal
                style={{ color: 'red' }}
                title="คุณต้องการลบไฟล์โครงการวิจัยใช่หรือไม่?"
                visible={this.state.visible2}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <p><Icon type="delete" style={{ color: 'red', fontSize: '200%' }} />{this.state.nameFileDelete}</p>

            </Modal>
        </div>

    }
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
                {this.setPageUpload()}
            </Drawer>
        </div >
    }
}
