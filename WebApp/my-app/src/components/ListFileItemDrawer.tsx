import * as React from "react";
import 'antd/dist/antd.css'
import ListFileItemController from "src/controller/ListFileItemController";
import { Drawer, Button } from 'antd';

var data = [{}]
export default class ListFileItemDrawer extends React.Component<any, any>{


    state = {
        idItem:this.props.idItem,
        visible: false,
        childrenDrawer: false,
        
    }
    componentDidMount = async () => {
        this.listFileItem()
    }
    listFileItem = async () => {
        data = []

        var listFileItemController = new ListFileItemController()
        var fileItemArr = await listFileItemController.listFileItem(""+this.state.idItem)

        for (var i = 0; i < fileItemArr.length; i++) {
            data.push(<p key={i}>{i + 1 + '. '}<a href={'http://localhost:8080/fileProject/downloadFile/' + fileItemArr[i].fileItem.fileName}>{fileItemArr[i].fileItem.fileName}</a></p>)
        }
        

        //  console.log(data)
    }
    showChildrenDrawer = () => {
        this.setState({
            childrenDrawer: true,
        });
    };

    onChildrenDrawerClose = () => {
        this.setState({
            childrenDrawer: false,
        });
    };
    render() {
        return <div>
            <Button type="primary" onClick={this.showChildrenDrawer}>
                ไฟล์กิจกรรม
          </Button>
            <Drawer
                title="ไฟล์กิจกรรม"
                width={300}
                closable={false}
                onClose={this.onChildrenDrawerClose}
                visible={this.state.childrenDrawer}
            >
                {data}
            </Drawer>
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e8e8e8',
                    padding: '10px 16px',
                    textAlign: 'right',
                    left: 0,
                    background: '#fff',
                    borderRadius: '0 0 4px 4px',
                }}
            >

            </div>
        </div>
    }
}