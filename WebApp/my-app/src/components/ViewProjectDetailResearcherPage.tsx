import * as React from "react";
import { Collapse, Spin,Icon } from 'antd';
import 'antd/dist/antd.css'
import ViewProjectController from "src/controller/ViewProjectController";
import ViewItemDetailPage from "./ViewItemDetailPage";
import ViewDetailPeriodResearcher from "./ViewDetailPeriodResearcher";
import ListResearcherInProjectResearcherPage from "./ListResearcherInProjectResearcherPage";
import ListFileProjectDrawerResearcher from "./ListFileProjectDrawerResearcherPage";


const Panel = Collapse.Panel;

export default class ViewProjectDetailResearcherPage extends React.Component<any, any>{

    modelProject: any;
    state = {
        idProject: this.props.idProject,
        budget: 0,
        dateStartProject: '',
        durationYear: '',
        fileProject: [],
        idProjectm: '',
        nameProject: '',
        researcherProject: [],
        statusProject: '',
        typeProject: '',
        periods: [],
        periodsElement: [],
        viewListResearcher: false,
        
        loading: true,
        
        
        balanceProject: 0,
        
    }


    async componentDidMount() {
        var viewProjectController = new ViewProjectController();
        this.modelProject = await viewProjectController.getNameProjectDetail(this.state.idProject)
        this.setState({
            budget: this.modelProject.getBudget(),
            dateStartProject: this.modelProject.getDateStartProject(),
            durationYear: this.modelProject.getDurationYear(),
            fileProject: this.modelProject.getFileProject(),
            idProjectm: this.modelProject.getIdProject(),
            nameProject: this.modelProject.getNameProject(),
            researcherProject: this.modelProject.getResearcherProject(),
            statusProject: this.modelProject.getStatusProject(),
            typeProject: this.modelProject.getTypeProject().nameTypeProject,
            periods: this.modelProject.getPeriods(),
        })
        var money = 0
        for (let i = 0; i < this.modelProject.getPeriods().length; i++) {
            //console.log(this.modelProject.getPeriods()[i].period)
            var arrItem = []
            for (let j = 0; j < this.modelProject.getPeriods()[i].period.items[0].length; j++) {
                // console.log(this.modelProject.getPeriods()[i].period.items[0][j].item.budgetItem)
                money += this.state.balanceProject + this.modelProject.getPeriods()[i].period.items[0][j].item.budgetItem
                arrItem.push(this.modelProject.getPeriods()[i].period.items[0][j].item)
            }
            this.setState({
                periodsElement: [...this.state.periodsElement, {
                    budgetPeriod: this.modelProject.getPeriods()[i].period.budgetPeriod,
                    endPeriod: this.modelProject.getPeriods()[i].period.endPeriod,
                    idPeriod: this.modelProject.getPeriods()[i].period.idPeriod,
                    items: arrItem,
                    noPeriod: this.modelProject.getPeriods()[i].period.noPeriod,
                    startPeriod: this.modelProject.getPeriods()[i].period.startPeriod
                }]
            }
            )
            arrItem = []
            if (this.state.statusProject === 'โครงการเสร็จสิ้น') {
                this.setState({ hidden: true })
            }else{
                this.setState({ hidden: false })
            }
        }
        this.setState({ balanceProject: this.state.budget - money })
        if (this.state.statusProject === 'กำลังดำเนินการ') {
            this.setState({ statusProjectSwist: true })
        }
        
        this.setState({ loading: false })
    }



    customPanelStyle = {
        background: 'LightGray',
        borderRadius: 4,
        marginBottom: 24,
        border: 0,
        overflow: 'hidden',
    };

    columns = [{
        key: 'idItem',
        title: 'รหัสการเบิกจ่าย',
        dataIndex: 'idItem',

    },
    {
        key: 'dateBook',
        title: 'วันที่ออกหนังสือ',
        dataIndex: 'dateBook',

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

    }
    ];

    setPeriod = () => {
        const data = []
        var arrPanel = []
        var arrIdPanel = []
        for (var i = 0; i < this.state.periods.length; i++) {
            arrIdPanel.push(i + '')
            var itemArr = JSON.parse(JSON.stringify(this.state.periods[i])).period.items
            var arrSetItem = []
            for (var j = 0; j < itemArr[0].length; j++) {
                arrSetItem.push({
                    idItem: itemArr[0][j].item.idItem,
                    titleItem: [itemArr[0][j].item.titleItem, itemArr[0][j].item.idItem, itemArr[0][j].item.dateBook, itemArr[0][j].item.budgetItem, itemArr[0][j].item.startItem, itemArr[0][j].item.endItem, itemArr[0][j].item.detail],
                    dateBook: itemArr[0][j].item.dateBook,
                    budgetItem: itemArr[0][j].item.budgetItem,
                    delete: [itemArr[0][j].item.idItem, itemArr[0][j].item.budgetItem]
                });
            }
            data.push(arrSetItem)
            arrSetItem = []
            arrPanel.push(<Panel header={"ไตรมาสที่ " + (i + 1)} key={i + ""}  >
                <ViewDetailPeriodResearcher startPeriod={JSON.parse(JSON.stringify(this.state.periods[i])).period.startPeriod} endPeriod={JSON.parse(JSON.stringify(this.state.periods[i])).period.endPeriod} budgetPeriod={JSON.parse(JSON.stringify(this.state.periods[i])).period.budgetPeriod} idPeriod={JSON.parse(JSON.stringify(this.state.periods[i])).period.idPeriod} data={data[i]} />
            </Panel>)
        }
        if (this.state.periods.length > 0) {
            return <Collapse accordion bordered={true} >
                {arrPanel}
            </Collapse>
        } else {
            return <h3>ไม่มีไตรมาสในโครงการนี้</h3>
        }
    }



    setPage = () => {
        var module
        if (this.state.viewListResearcher === false) {
            
                module = <div style={{ paddingLeft: '2%' }}>
                    <h3><b>ปีงบประมาณ </b>{this.state.durationYear} </h3>
                    <h3><b>ประเภทโครงการ </b>{this.state.typeProject}</h3>
                    <h3><b>วันที่เริ่มโครงการวิจัย </b>{this.state.dateStartProject}</h3>
                    <h3><b>จำนวนงบประมาณทั้งหมดของโครงการ </b>{this.state.budget} บาท</h3>
                    <h3><b>จำนวนงบประมาณที่เหลือในโครงการ </b>{this.state.balanceProject} บาท</h3>
                    <h3><b>สถานะโครงการวิจัย </b> {this.state.statusProject}</h3>
                    <h3><a onClick={() => { this.setState({ viewListResearcher: true }) }}><Icon type="team" />รายชื่อผู้เข้าร่วมโครงการ</a></h3>
                    <ListFileProjectDrawerResearcher nameProject={this.state.idProject} idProject={this.state.idProjectm} />
                    {this.setPeriod()}
                </div>
            
        } else {
            module = <div style={{ paddingLeft: '2%' }}>
                <ListResearcherInProjectResearcherPage idProject={this.state.idProjectm} />
            </div>
        }
        return module
    }
    render() {
        return <div>
            <Spin tip="Loading..." spinning={this.state.loading}>
            <a onClick={() => {
                    
                    this.setState({ viewListResearcher: false })
                }} style={{ fontSize: '200%' }}><b>{this.state.idProject}</b></a>
                {this.setPage()}
            </Spin>
        </div>
    }

}