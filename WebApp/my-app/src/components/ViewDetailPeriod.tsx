import * as React from "react";
import { Table, Modal, Spin, Icon, message } from 'antd';
import 'antd/dist/antd.css'
import AddItemModel from "./AddItemModel";
import ViewItemDetailPage from "./ViewItemDetailPage";
import DeleteItemController from "src/controller/DeleteItemController";
// import ListItemController from "src/controller/ListItemController";


const error = () => {
    message.error('delete fail');
  };
export default class ViewDetailPeriod extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            period: this.props.period,
            noPeriod: 0,
            items: [],
            indexDelete: null,
            visible: false,
            deleteIdItem: '',
            loading: false,
            budgetPeriod: 0,
            startPeriod: '',
            endPeriod: '',
            balance: 0,
            hidden: this.props.hidden

        }
    }

    componentDidMount = async () => {
        this.setState({ loading: true })
        await this.setState({
            noPeriod: this.state.period.period.noPeriod,
            budgetPeriod: this.state.period.period.budgetPeriod,
            startPeriod: this.state.period.period.startPeriod,
            endPeriod: this.state.period.period.endPeriod
        })

        var moneyTemp = 0
        for (let i = 0; i < this.state.period.period.items[0].length; i++) {
            console.log(this.state.period.period.items[0])
            await this.setState({
                items: [...this.state.items, {
                    idItem: this.state.period.period.items[0][i].item.idItem,
                    dateBook: this.state.period.period.items[0][i].item.dateBook,
                    titleItem: [this.state.period.period.items[0][i].item.titleItem, this.state.period.period.items[0][i].item.idItem, this.state.period.period.items[0][i].item.dateBook, this.state.period.period.items[0][i].item.budgetItem, this.state.period.period.items[0][i].item.startItem, this.state.period.period.items[0][i].item.endItem, this.state.period.period.items[0][i].item.detail],
                    budgetItem: this.state.period.period.items[0][i].item.budgetItem,
                    delete: [this.state.period.period.items[0][i].item.idItem, this.state.period.period.items[0][i].item.budgetItem]

                }]
            })
            moneyTemp = await moneyTemp + this.state.period.period.items[0][i].item.budgetItem
        }
        this.setState({ balance: this.state.budgetPeriod - moneyTemp, loading: false })
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
    {
        key: 'delete',
        title: '    ',
        dataIndex: 'delete',
        render: (key: any) => <a hidden={this.props.hidden} style={{ color: 'red' }} onClick={() => {
            // this.handleOk(key)
            this.setState({ visible: true, deleteIdItem: key[0], moneyTemp: key[1] })
        }}><Icon type="delete" /> ลบกิจกรรม</a>
    },
    ];
    handleOk = async (e: any) => {
        console.log(e);
        console.log(this.state.items)
        this.setState({
            loading: true
        });
        var index = 0
        var money = 0
        var result = true
        for (let i = 0; i < this.state.items.length; i++) {
            if (this.state.deleteIdItem === this.state.items[i].idItem) {
                index = i
                money = this.state.items[i].budgetItem
                console.log(i + '=>' + this.state.items[i].idItem + '=>' + money)
                result = false
            }
        }
        if (result) {
            error()
            this.setState({
                loading: false,
                visible: false
            })
            return
        }
        var deleteItemController = new DeleteItemController()
        await deleteItemController.deleteItem(this.state.deleteIdItem)
        await this.state.items.splice(index, 1)
        await this.setState({
            balance: this.state.balance + money
        })
        this.props.actionDelete(money)
        console.log(this.state.items)
        // var moneyTemp = 0
        // for (let i = 0; i < this.state.period.period.items[0].length; i++) {
        //     moneyTemp = await moneyTemp + this.state.period.period.items[0][i].item.budgetItem
        // }
        // this.setState({ balance: this.state.budgetPeriod - moneyTemp, loading: false })
        this.setState({
            loading: false,
            visible: false
        })

    }

    handleCancel = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
            loading: false
        });
    }

    re_render = async (data: any) => {
        console.log(this.state.items)
        await this.setState({
            items: [...this.state.items,
            {
                budgetItem: data.budgetItem,
                dateBook: data.dateBook,
                delete: data.delete,
                idItem: data.idItem,
                titleItem: data.titleItem
            }
            ]
        })
        console.log(this.state.items)
        await this.setState({
            balance: this.state.balance - data.budgetItem
        })
        await this.props.action(data.budgetItem)
    }
    render() {
        return <div>
            <Spin spinning={this.state.loading}>
                <Modal
                    title="คุณต้องการลบกิจกรรมนี้ใช่หรือไม่?"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>ลบกิจกรรม: {this.state.deleteIdItem}</p>
                </Modal>
                <p><b>วันเริ่มไตรมาส</b> {this.state.startPeriod}</p>
                <p><b>วันสิ้นสุดไตรมาส</b> {this.state.endPeriod}</p>
                <p><b>จำนวนงบประมาณทั้งหมดในไตรมาส </b> {this.state.budgetPeriod} <b>บาท</b></p>
                <p><b>จำนวนงบประมาณที่เหลือในไตรมาส </b> {this.state.balance} <b>บาท</b></p>
                <Table size="small" columns={this.columns} dataSource={this.state.items} rowKey="idItem" />
                <br />
                <div hidden={this.props.hidden} ><AddItemModel balancePeriod={this.state.balance} idPeriod={this.state.period.period.idPeriod} action={this.re_render} /></div>
                {/* <a style={{position:'absolute', top:'0' ,right:'0'}}>แก้ไขข้อมูลไตรมาส</a> */}
            </Spin>
        </div>
    }




}