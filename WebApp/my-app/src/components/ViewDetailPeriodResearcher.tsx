import * as React from "react";
import { Table, Spin, Icon } from 'antd';
import 'antd/dist/antd.css'

import ViewItemDetailPage from "./ViewItemDetailPage";

export default class ViewDetailPeriodResearcher extends React.Component<any, any>{

    state = {
        idPeriod: this.props.idPeriod,
        data: this.props.data,
        indexDelete: null,
        visible: false,
        
        loading: false,
        budgetPeriod: this.props.budgetPeriod,
        startPeriod: this.props.startPeriod,
        endPeriod: this.props.endPeriod,
        balance: 0
    }
    componentDidMount = async () => {
        var moneyPay = 0
        for (let i = 0; i < this.state.data.length; i++) {
            moneyPay += JSON.parse(JSON.stringify(this.state.data[i])).budgetItem
        }
        this.setState({ balance: this.state.budgetPeriod - moneyPay })        
    }
    columns = [{
        key: 'idItem',
        title: 'รหัสการเบิกจ่าย',
        dataIndex: 'idItem',
        width: 150,
        render: (key: any) => <div><Icon style={{ color: '#4682B4' }} type="key" /> {key}</div>
    },
    {
        key: 'dateBook',
        title: 'วันที่ออกหนังสือ',
        dataIndex: 'dateBook',
        width: 150
    },
    {
        key: 'titleItem',
        title: 'ชื่อหนังสือ',
        dataIndex: 'titleItem',
        render: (text: any) => <ViewItemDetailPage item={text} />

    },
    {
        key: 'budgetItem',
        title: 'จำนวนเงินที่ใช้',
        dataIndex: 'budgetItem',
        width: 150
    },
    
    ];
    

    addItemInData = (data: any) => {
        this.setState({
            data: [...this.state.data, {
                budgetItem: data.budgetItem,
                dateBook: data.dateBook,
                delete: data.idItem,
                idItem: data.idItem,
                titleItem: data.titleItem
            }],
            balance: this.state.balance - data.budgetItem
        })
        console.log(data)
        this.props.action()
    }
    
    render() {
        return <div>
            <Spin spinning={this.state.loading}>
                
                <p><b>วันเริ่มไตรมาส</b> {this.state.startPeriod}</p>
                <p><b>วันสิ้นสุดไตรมาส</b> {this.state.endPeriod}</p>
                <p><b>จำนวนงบประมาณทั้งหมดในไตรมาส </b> {this.state.budgetPeriod} <b>บาท</b></p>
                <p><b>จำนวนงบประมาณที่เหลือในไตรมาส </b> {this.state.balance} <b>บาท</b></p>
                <Table size="small" columns={this.columns} dataSource={this.state.data} rowKey="idItem" />
                

            </Spin>
        </div>
    }




}