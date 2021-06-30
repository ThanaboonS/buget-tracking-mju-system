import * as React from "react";
import { Collapse, Spin, Icon, Switch, Modal } from 'antd';
import 'antd/dist/antd.css'
import ViewProjectController from "src/controller/ViewProjectController";

import ListFileProjectDrawer from "./ListFileProjectDrawer";

import ListResearcherInProject from "./ListResearcherInProjectPage";
import ViewDetailPeriod from "./ViewDetailPeriod";
import EditProjectPage from "./EditProjectPage";
import UpdateStatusProjectController from "src/controller/UpdateStatusProjectController";


const Panel = Collapse.Panel;
export default class ViewProjectPage extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    modelProject: any;
    state = {
        idProject: this.props.idProject,
        budget: 0,
        dateStartProject: '',
        durationYear: '',
        idProjectm: '',
        nameProject: '',
        statusProject: '',
        typeProject: '',
        periods: [],
        typePeriod: '',
        periodsElement: [],
        viewListResearcher: false,
        viewEditProject: false,
        loading: true,
        visibleStatusProejct: false,
        balanceProject: 0,

        hiddenElement: true,
        hiddenEdit: true,
        
        budgetPeriod4:0
    }

    componentWillMount = async () => {
        this.setState({ loading: true })
        var viewProjectController = new ViewProjectController();
        this.modelProject = await viewProjectController.getNameProjectDetail(this.state.idProject)
        this.setState({
            budget: this.modelProject.getBudget(),
            dateStartProject: this.modelProject.getDateStartProject(),
            durationYear: this.modelProject.getDurationYear(),
            idProjectm: this.modelProject.getIdProject(),
            nameProject: this.modelProject.getNameProject(),
            statusProject: this.modelProject.getStatusProject(),
            typeProject: this.modelProject.getTypeProject().nameTypeProject,
            periods: this.modelProject.getPeriods(),
        })
        this.setState({ typePeriod: this.state.periods.length })        
        var money = 0
        for (let i = 0; i < this.modelProject.getPeriods().length; i++) {
            for (let j = 0; j < this.modelProject.getPeriods()[i].period.items[0].length; j++) {
                money += this.state.balanceProject + this.modelProject.getPeriods()[i].period.items[0][j].item.budgetItem
            }
        }
        this.setState({ balanceProject: this.state.budget - money })

        if (this.state.statusProject === 'กำลังดำเนินการ') {
            this.setState({
                hiddenEdit: false,
                hiddenElement: false
            })
        } else {
            this.setState({
                hiddenEdit: true,
                hiddenElement: true
            })
        }
        this.setState({ loading: false })
    }

    afterDelete = (money: number) => {
        this.setState({
            balanceProject: this.state.balanceProject + money
        })
    }
    afterAddItem = async (budgetItem: number) => {
        this.setState({
            balanceProject: this.state.balanceProject - budgetItem
        })
    }

    setPeriod = () => {
        //-----------------state period setting---------------------
        var arrayPeriodElement = []
        for (var i = 0; i < this.state.periods.length; i++) {
            arrayPeriodElement.push(<Panel header={"ไตรมาสที่ " + (i + 1)} key={i + ""}  >
                <ViewDetailPeriod actionDelete={this.afterDelete} action={this.afterAddItem} hidden={this.state.hiddenElement} period={this.modelProject.periods[i]} />
            </Panel>)
        }
        //----------------------------------------------------------
        if (this.state.periods.length > 0) {
            return <Collapse accordion bordered={true} >
                {arrayPeriodElement}
            </Collapse>
        } else {
            return <h3>ไม่มีไตรมาสในโครงการนี้</h3>
        }
    }
    warning = () => {
        Modal.warning({
            title: 'ผิดพลาด!',
            content: 'ยังมีจำนวนเงินงบประมาณในโครงการวิจัย',
        });
    }
    setSwitchStatusProject = async () => {

        var updateStatusProjectController = new UpdateStatusProjectController()

        if (this.state.hiddenElement) {
            this.setState({ statusProject: 'กำลังดำเนินการ', loading: true, hiddenEdit: false, hiddenElement: !this.state.hiddenElement });
            await updateStatusProjectController.updateStatusProject(Number.parseInt(this.state.idProjectm), 'กำลังดำเนินการ')
        } else {
            if (this.state.balanceProject !== 0) {
                this.warning()
                return
            }
            this.setState({ statusProject: 'โครงการเสร็จสิ้น', loading: true, hiddenEdit: true, hiddenElement: !this.state.hiddenElement });
            await updateStatusProjectController.updateStatusProject(Number.parseInt(this.state.idProjectm), 'โครงการเสร็จสิ้น')

        }
        this.setState({ loading: false });
    }
    setPage = () => {
        var module
        if (this.state.viewListResearcher === false) {
            if (this.state.viewEditProject === true) {
                if (this.state.periods.length === 3) {
                    module = <div style={{ paddingLeft: '2%' }}>
                        <EditProjectPage idProject={this.state.idProjectm} nameProject={this.state.idProject} budget={this.state.budget} dateStartProject={this.state.dateStartProject} durationYear={this.state.durationYear} typeProject={this.state.typeProject} typePeriod={this.state.typePeriod} periods={this.state.periods} />
                    </div>
                } else {
                    module = <div style={{ paddingLeft: '2%' }}>
                    <EditProjectPage budgetPeriod4={JSON.parse(JSON.stringify(this.state.periods[3])).period.budgetPeriod} idProject={this.state.idProjectm} nameProject={this.state.idProject} budget={this.state.budget} dateStartProject={this.state.dateStartProject} durationYear={this.state.durationYear} typeProject={this.state.typeProject} typePeriod={this.state.typePeriod} periods={this.state.periods} />
                </div>
                }

            } else {
                module = <div style={{ paddingLeft: '2%' }}>
                    <h3><b>ปีงบประมาณ </b>{this.state.durationYear} </h3>
                    <h3><b>ประเภทโครงการ </b>{this.state.typeProject}</h3>
                    <h3><b>วันที่เริ่มโครงการวิจัย </b>{this.state.dateStartProject}</h3>
                    <h3><b>จำนวนงบประมาณทั้งหมดของโครงการ </b>{this.state.budget} บาท</h3>
                    <h3><b>จำนวนงบประมาณที่เหลือในโครงการ </b>{this.state.balanceProject} บาท</h3>
                    <h3><b>สถานะโครงการวิจัย </b><Switch checked={!this.state.hiddenElement} onChange={this.setSwitchStatusProject} /> {this.state.statusProject}</h3>
                    <h3><a onClick={() => { this.setState({ viewListResearcher: true, hiddenEdit: true }) }}><Icon type="team" />รายชื่อผู้เข้าร่วมโครงการ</a></h3>
                    <ListFileProjectDrawer hidden={this.state.hiddenElement} nameProject={this.state.idProject} idProject={this.state.idProjectm} />
                    {this.setPeriod()}
                </div>
            }
        } else {
            module = <div style={{ paddingLeft: '2%' }}>
                <ListResearcherInProject statusProjectSwist={this.state.hiddenElement} idProject={this.state.idProjectm} />
            </div>
        }
        return module
    }
    linkBackToMainProject = () => {
        if (this.state.hiddenElement) {
            return <a onClick={() => {
                this.setState({ viewListResearcher: false, viewEditProject: false, hiddenEdit: true })
            }} style={{ fontSize: '200%' }}><b>{this.state.idProject}</b></a>
        } else {
            return <a onClick={() => {
                this.setState({ viewListResearcher: false, viewEditProject: false, hiddenEdit: false })
            }} style={{ fontSize: '200%' }}><b>{this.state.idProject}</b></a>
        }
    }

    render() {
        return <div>
            <Spin tip="Loading..." spinning={this.state.loading}>
                {this.linkBackToMainProject()}<a hidden={this.state.hiddenEdit} onClick={() => { this.setState({ viewEditProject: true, hiddenEdit: true }) }} style={{ position: 'absolute', top: '10px', right: '10px' , left:'90%' }}><Icon type="tool" /> แก้ไขโครงการวิจัย</a>
                {this.setPage()}
            </Spin>
        </div>
    }
}