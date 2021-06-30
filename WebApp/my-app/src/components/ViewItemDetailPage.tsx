import * as React from "react";
import { Drawer} from 'antd';
import 'antd/dist/antd.css'
import ListFileItemDrawer from "./ListFileItemDrawer";



export default class ViewItemDetailPage extends React.Component<any, any> {

    
    state = {
        item: this.props.item,
        visible: false,
        
    };    
    
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

            <a type="primary" onClick={this.showDrawer}>
                {this.state.item[0]}
            </a>
            <Drawer
                title={this.state.item[0]}
                width={450}
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
            >
                <p><b>รหัสหนังสือ: </b>{this.state.item[1]}</p>
                <p><b>ชื่อหนังสือ: </b>{this.state.item[0]}</p>
                <p><b>วันที่ออกหนังสือ: </b>{this.state.item[2].split(",")[0]}</p>
                <p><b>วันเริ่มกิจกรรม: </b>{this.state.item[4].split(",")[0]}</p>
                <p><b>วันสิ้นสุดกิจกรรม: </b>{this.state.item[5].split(",")[0]}</p>
                <p><b>รายละเอียดกิจกรรม: </b>{this.state.item[6]}</p>
                <p><b>จำนวนเงินที่ใช้: </b>{this.state.item[3]} บาท</p>
                <ListFileItemDrawer idItem={this.state.item[1]}/>
                
            </Drawer>


        </div>
    }
}