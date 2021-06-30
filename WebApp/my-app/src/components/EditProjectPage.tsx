import * as moment from 'moment';
import { InputNumber, Select, Form, Input, DatePicker, Radio, Button, Spin, Modal } from 'antd';
import 'antd/dist/antd.css'
import * as React from "react";

import ListAllResearcherController from '../controller/ListAllResearcherController'
import ListTypeProjectController from 'src/controller/ListTypeProjectController';
import EditProjectController from 'src/controller/EditProjectController';
import ListItemController from 'src/controller/ListItemController';
import ProjectManager from 'src/service/ProjectManager';


const Option = Select.Option;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;


function handleBlur() {
    console.log('blur');
}
function handleFocus() {
    console.log('focus');

}
function warning() {
    Modal.warning({
        title: 'ผิดพลาด',
        content: 'กรุณาตรวจสอบการแบ่งเงินงบประมาณในไตรมาส(ต้องครบ 100%)',
    });
    return
}
function error() {
    Modal.error({
        title: 'Error',
        content: 'กรุณากรอกข้อมูลไตรมาสให้ครบถ้วน',
    });
    return
}
function errorDuplicateName() {
    Modal.error({
        title: 'Error',
        content: 'ชื่อโครงการวิจัยซ้ำ',
    });
    return
}
function errorBudget() {
    Modal.error({
        title: 'Error',
        content: 'จำนวนเงินมีค่าน้อยกว่าจำนวนเงินที่ใช้ไปแล้วในไตรมาส',
    });
    return
}

let periodIni = new Array();
let periodIniType2 = new Array();
export default class EditProjectPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    state = {
        idProject: this.props.idProject,
        typePeriod: this.props.typePeriod + '',
        confirmDirty: false,
        autoCompleteResult: [],
        year: moment().year(),
        arrayRe: [],
        durationYear: this.props.durationYear,
        typeProject: this.props.typeProject,
        nameProject: this.props.nameProject,
        dateStartProject: this.props.dateStartProject,
        periods: this.props.periods,
        idPeriods: [],
        period1: [],
        period2: [],
        period3: [],
        period4: [],
        period1Type2: [],
        period2Type2: [],
        period3Type2: [],
        reader: '',
        budget: this.props.budget,
        loading: false,
        perBudgetP1: this.props.periods[0].period.budgetPeriod * 100 / this.props.budget,
        perBudgetP2: this.props.periods[1].period.budgetPeriod * 100 / this.props.budget,
        perBudgetP3: this.props.periods[2].period.budgetPeriod * 100 / this.props.budget,
        perBudgetP4: this.props.budgetPeriod4*100/this.props.budget,
        budgetP1: this.props.periods[0].period.budgetPeriod,
        budgetP2: this.props.periods[1].period.budgetPeriod,
        budgetP3: this.props.periods[2].period.budgetPeriod,
        budgetP4: this.props.budgetPeriod4,
        perBudgetP1Type2: this.props.periods[0].period.budgetPeriod * 100 / this.props.budget,
        perBudgetP2Type2: this.props.periods[1].period.budgetPeriod * 100 / this.props.budget,
        perBudgetP3Type2: this.props.periods[2].period.budgetPeriod * 100 / this.props.budget,
        budgetP1Type2: this.props.periods[0].period.budgetPeriod,
        budgetP2Type2: this.props.periods[1].period.budgetPeriod,
        budgetP3Type2: this.props.periods[2].period.budgetPeriod,
        arrTypePro: [],
        listBudgetItem: []
    }
    nameProjectBackup = ''
    async componentDidMount() {
        console.log(this.props.dateStartProject)
        this.nameProjectBackup = this.props.nameProject;
        this.setState({ loading: true })
        let listAllResearcherController = new ListAllResearcherController();
        let arrayReController = await listAllResearcherController.listAllResearcher();

        let listTypeProjectController = new ListTypeProjectController()
        let arrayTypeProject = await listTypeProjectController.listTypeProject()
        for (let i = 0; i < arrayTypeProject.length; i++) {
            // console.log('typeProject:'+arrayTypeProject[i])
            this.setState({
                arrTypePro: [...this.state.arrTypePro, <Option key={arrayTypeProject[i] + ''} value={arrayTypeProject[i] + ''}>{arrayTypeProject[i]}</Option>]
            })
        }
        //------------set periods-------------        
        if (this.state.typePeriod === '3') {
            console.log(this.state.periods[0].period.noPeriod)
            this.setState({
                period1Type2: [this.state.periods[0].period.startPeriod, this.state.periods[0].period.endPeriod],
                period2Type2: [this.state.periods[1].period.startPeriod, this.state.periods[1].period.endPeriod],
                period3Type2: [this.state.periods[2].period.startPeriod, this.state.periods[2].period.endPeriod],
            })
            console.log(this.state.period1Type2, '--', this.state.period2Type2, '--', this.state.period3Type2)
        } else if (this.state.typePeriod === '4') {
            this.setState({
                period1: [this.state.periods[0].period.startPeriod, this.state.periods[0].period.endPeriod],
                period2: [this.state.periods[1].period.startPeriod, this.state.periods[1].period.endPeriod],
                period3: [this.state.periods[2].period.startPeriod, this.state.periods[2].period.endPeriod],
                period4: [this.state.periods[3].period.startPeriod, this.state.periods[3].period.endPeriod],
                budgetP4: this.state.periods[3].period.budgetPeriod,
            })
        }
        for (let i = 0; i < this.state.periods.length; i++) {
            this.setState({
                idPeriods: [...this.state.idPeriods, this.state.periods[i].period.idPeriod]
            })
        }
        let listItemController = new ListItemController()

        for (let i = 0; i < this.state.idPeriods.length; i++) {
            let items = await listItemController.listItem(this.state.idPeriods[i])
            let money = 0;
            for (let j = 0; j < items.length; j++) {
                // console.log(items[j].item.budgetItem)
                money += items[j].item.budgetItem
            }
            
            this.setState({
                listBudgetItem: [...this.state.listBudgetItem, money]
            })
        }
        console.log(this.state.listBudgetItem)
        //------------------------------------
        this.setState({
            arrayRe: [...this.state.arrayRe, ...arrayReController],
            loading: false
            //arrTypePro:[...this.state.arrTypePro, ...arrayTypeProject]
        })
        return arrayReController;
    }
    _listAllResearcher = () => {
        let option = []
        for (var i = 0; i < this.state.arrayRe.length; i++) {
            let reseaStr = JSON.stringify(this.state.arrayRe[i]);
            let reseaPar = JSON.parse(reseaStr);
            option.push(<Option key={reseaPar.username} value={reseaPar.username}>{reseaPar.name}</Option>)
        }
        return option
    }
    handleSubmit = async () => {
        this.setState({ loading: true });
        periodIni = []
        periodIniType2 = []
        let editProjectController = new EditProjectController()
        console.log(editProjectController)
        var result
        var percen
        
        let projectManager: ProjectManager = new ProjectManager({});
        let check = await projectManager.getNameProjectDetail(this.state.nameProject+'');
        
        if(this.nameProjectBackup !== this.state.nameProject){
            if(check.getNameProject() === this.state.nameProject){            
                errorDuplicateName()
                this.setState({ loading: false });
                    return
            }
        }
        
        console.log(check+' 55gg')
        console.log(this.state.nameProject+'jjjjjj')
        if (this.state.typePeriod === '4') {
            percen = this.state.perBudgetP1 + this.state.perBudgetP2 + this.state.perBudgetP3 + this.state.perBudgetP4
            console.log(percen + ':' + (percen === 100))
            
            if (this.state.nameProject === '' ||  typeof(this.state.period1[0]) !== 'undefined'  || typeof(this.state.period2[0]) !== 'undefined'  || typeof(this.state.period3[0]) !== 'undefined'  || typeof(this.state.period4[0]) !== 'undefined' ) {
                error()
                this.setState({ loading: false });
                return
            }
            if (percen !== 100) {
                warning()
                this.setState({ loading: false });
                return
            }
            if(this.state.budgetP1<this.state.listBudgetItem[0]){
                errorBudget()
                this.setState({ loading: false });
                return
            }else if(this.state.budgetP2<this.state.listBudgetItem[1]){
                errorBudget()
                this.setState({ loading: false });
                return
            }else if(this.state.budgetP3<this.state.listBudgetItem[2]){
                errorBudget()
                this.setState({ loading: false });
                return
            }else if(this.state.budgetP4<this.state.listBudgetItem[3]){
                errorBudget()
                this.setState({ loading: false });
                return
            }
        } else if (this.state.typePeriod === '3') {
            percen = this.state.perBudgetP1Type2 + this.state.perBudgetP2Type2 + this.state.perBudgetP3Type2
            console.log(percen + ':' + (percen === 100))
            console.log(this.state.period1Type2, this.state.period2Type2, this.state.period3Type2)
            if (this.state.period1Type2[0] === '' || this.state.period2Type2[0] === '' || this.state.period3Type2[0] === '') {
                error()
                this.setState({ loading: false });
                return
            }
            if (percen !== 100) {
                warning()
                this.setState({ loading: false });
                return
            }
            if(this.state.budgetP1Type2<this.state.listBudgetItem[0]){
                errorBudget()
                this.setState({ loading: false });
                return
            }else if(this.state.budgetP2Type2<this.state.listBudgetItem[1]){
                errorBudget()
                this.setState({ loading: false });
                return
            }else if(this.state.budgetP3Type2<this.state.listBudgetItem[2]){
                errorBudget()
                this.setState({ loading: false });
                return
            }
        }        
        if (this.state.typePeriod == '4') {
            periodIni.push([this.state.period1[0], this.state.period1[1], this.state.budgetP1]);
            periodIni.push([this.state.period2[0], this.state.period2[1], this.state.budgetP2]);
            periodIni.push([this.state.period3[0], this.state.period3[1], this.state.budgetP3]);
            periodIni.push([this.state.period4[0], this.state.period4[1], this.state.budgetP4]);
            result = await editProjectController.updateProject(this.state.idProject, this.state.durationYear, this.state.typeProject, this.state.nameProject, this.state.dateStartProject, this.state.budget, periodIni, this.state.idPeriods);
            console.log(periodIni)
        } else if (this.state.typePeriod == '3') {
            periodIniType2.push([this.state.period1Type2[0], this.state.period1Type2[1], this.state.budgetP1Type2]);
            periodIniType2.push([this.state.period2Type2[0], this.state.period2Type2[1], this.state.budgetP2Type2]);
            periodIniType2.push([this.state.period3Type2[0], this.state.period3Type2[1], this.state.budgetP3Type2]);
            result = await editProjectController.updateProject(this.state.idProject, this.state.durationYear, this.state.typeProject, this.state.nameProject, this.state.dateStartProject, this.state.budget, periodIniType2, this.state.idPeriods);

        }
        this.setState({ result, loading: false })
        console.log(result)
        window.location.reload()
        // this.props.action()
    }
    _onChangePeriod = (e: any) => {
        this.setState({ typePeriod: e.target.value })
        // this.setState({ period1: null, period2: null, period3: null, period4: null })
    }

    _budgetPeriod1Type2 = (e: any) => {
        this.setState({
            budgetP1Type2: e * this.state.budget / 100,
            perBudgetP1Type2: e
        })
    }
    _budgetPeriod2Type2 = (e: any) => {
        this.setState({
            budgetP2Type2: e * this.state.budget / 100,
            perBudgetP2Type2: e
        })
    }
    _budgetPeriod3Type2 = (e: any) => {
        this.setState({
            budgetP3Type2: e * this.state.budget / 100,
            perBudgetP3Type2: e
        })
    }
    _budgetPeriod1 = (e: any) => {
        this.setState({
            budgetP1: e * this.state.budget / 100,
            perBudgetP1: e
        })
    }
    _budgetPeriod2 = (e: any) => {
        this.setState({
            budgetP2: e * this.state.budget / 100,
            perBudgetP2: e
        })
    }
    _budgetPeriod3 = (e: any) => {
        this.setState({
            budgetP3: e * this.state.budget / 100,
            perBudgetP3: e
        })
    }
    _budgetPeriod4 = (e: any) => {
        this.setState({
            budgetP4: e * this.state.budget / 100,
            perBudgetP4: e
        })
    }
    _setBudget = (e: any) => {
        this.setState({
            budget: e,
            budgetP1: e * this.state.perBudgetP1 / 100,
            budgetP2: e * this.state.perBudgetP2 / 100,
            budgetP3: e * this.state.perBudgetP3 / 100,
            budgetP4: e * this.state.perBudgetP4 / 100,

            budgetP1Type2: e * this.state.perBudgetP1Type2 / 100,
            budgetP2Type2: e * this.state.perBudgetP2Type2 / 100,
            budgetP3Type2: e * this.state.perBudgetP3Type2 / 100,

        })
    }
    _onChangPeriodForm = () => {
        const dateFormat = 'YYYY-MM-DD';
        const dateFormat2 = 'YYYY-MM-DD';
        var rangePickers4 = []
        var rangePickers3 = []
        if (this.state.typePeriod === "4") {
            rangePickers4 = []
            {
                rangePickers4.push(<div key='1'><b>ไตรมาสที่ 1</b> งบประมาณ <InputNumber defaultValue={this.state.perBudgetP1} min={0} max={100} style={{ width: '60px' }} onChange={this._budgetPeriod1} /> % ({this.state.budgetP1} บาท)(*ใช้ไปแล้ว {this.state.listBudgetItem[0]} บาท)
       <RangePicker
                        ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
                        onChange={this._setPeriod1} defaultValue={[moment(this.state.periods[0].period.startPeriod, dateFormat2), moment(this.state.periods[0].period.endPeriod, dateFormat2)]} /></div>)
            }
            {
                rangePickers4.push(<div key='2'><b>ไตรมาสที่ 2</b> งบประมาณ <InputNumber defaultValue={this.state.perBudgetP2} min={0} max={100} style={{ width: '60px' }} onChange={this._budgetPeriod2} /> % ({this.state.budgetP2} บาท)(*ใช้ไปแล้ว {this.state.listBudgetItem[1]} บาท)
      <RangePicker
                        ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
                        onChange={this._setPeriod2} defaultValue={[moment(this.state.periods[1].period.startPeriod, dateFormat2), moment(this.state.periods[1].period.endPeriod, dateFormat2)]} /></div>)
            }
            {
                rangePickers4.push(<div key='3'><b>ไตรมาสที่ 3</b> งบประมาณ <InputNumber defaultValue={this.state.perBudgetP3} min={0} max={100} style={{ width: '60px' }} onChange={this._budgetPeriod3} /> % ({this.state.budgetP3} บาท)(*ใช้ไปแล้ว {this.state.listBudgetItem[2]} บาท)
      <RangePicker
                        ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
                        onChange={this._setPeriod3} defaultValue={[moment(this.state.periods[2].period.startPeriod, dateFormat2), moment(this.state.periods[2].period.endPeriod, dateFormat2)]} /></div>)
            }
            {
                rangePickers4.push(<div key='4'><b>ไตรมาสที่ 4</b> งบประมาณ <InputNumber defaultValue={this.state.perBudgetP4} min={0} max={100} style={{ width: '60px' }} onChange={this._budgetPeriod4} /> % ({this.state.budgetP4} บาท)(*ใช้ไปแล้ว {this.state.listBudgetItem[3]} บาท)
      <RangePicker
                        ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
                        onChange={this._setPeriod4} defaultValue={[moment(this.state.periods[3].period.startPeriod, dateFormat2), moment(this.state.periods[3].period.endPeriod, dateFormat2)]} /></div>)
            }
            return <div>{rangePickers4}</div>
        } else if (this.state.typePeriod === "3") {
            rangePickers3 = []
            {
                rangePickers3.push(<div key='1'><b>ไตรมาสที่ 1</b> งบประมาณ <InputNumber defaultValue={this.state.perBudgetP1Type2} min={0} max={100} style={{ width: '60px' }} onChange={this._budgetPeriod1Type2} /> % ({this.state.budgetP1Type2} บาท)(*ใช้ไปแล้ว {this.state.listBudgetItem[0]+''} บาท)
      <RangePicker
                        ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }} onChange={this._setPeriod1Type2}
                        defaultValue={[moment(this.state.periods[0].period.startPeriod, dateFormat), moment(this.state.periods[0].period.endPeriod, dateFormat)]}
                    /></div>)
            }
            {
                rangePickers3.push(<div key='2'><b>ไตรมาสที่ 2</b> งบประมาณ <InputNumber defaultValue={this.state.perBudgetP2Type2} min={0} max={100} style={{ width: '60px' }} onChange={this._budgetPeriod2Type2} /> % ({this.state.budgetP2Type2} บาท)(*ใช้ไปแล้ว {this.state.listBudgetItem[1]+''} บาท)
      <RangePicker
                        ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
                        onChange={this._setPeriod2Type2} defaultValue={[moment(this.state.periods[1].period.startPeriod, dateFormat), moment(this.state.periods[1].period.endPeriod, dateFormat)]} /></div>)
            }
            {
                rangePickers3.push(<div key='3'><b>ไตรมาสที่ 3</b> งบประมาณ <InputNumber defaultValue={this.state.perBudgetP3Type2} min={0} max={100} style={{ width: '60px' }} onChange={this._budgetPeriod3Type2} /> % ({this.state.budgetP3Type2} บาท)(*ใช้ไปแล้ว {this.state.listBudgetItem[2]+''} บาท)
       <RangePicker
                        ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
                        onChange={this._setPeriod3Type2} defaultValue={[moment(this.state.periods[2].period.startPeriod, dateFormat), moment(this.state.periods[2].period.endPeriod, dateFormat)]} /></div>)
            }
            return <div>{rangePickers3}</div>
        }
        return <div></div>
    }
    _setDurationYear = (e: any) => {
        this.setState({ durationYear: e })
    }
    _setTypeProject = (e: any) => {
        this.setState({ typeProject: e })
        // console.log(this.state.typeProject)
    }
    _setNameProject = (e: any) => {
        this.setState({ nameProject: e.target.value, textErr: '' })
        // console.log(e.target.value)
    }
    _setDateStartProject = (e: any) => {
        this.setState({ dateStartProject: (parseInt(e._d.getFullYear())) + '-' + parseInt(e._d.getMonth()) + '-' + e._d.getDate() })
        // console.log(this.state.dateStartProject)
    }
    _setPeriod1Type2 = (dates: any, dateStrings: any) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        if (dateStrings[0] !== null) {
            this.setState({ period1Type2: [dateStrings[0], dateStrings[1]] })
        } else {
            this.setState({ period1Type2: [] })
        }
    }
    _setPeriod2Type2 = (dates: any, dateStrings: any) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        if (dateStrings[0] !== null) {
            this.setState({ period2Type2: [dateStrings[0], dateStrings[1]] })
        } else {
            this.setState({ period2Type2: [] })
        }
    }
    _setPeriod3Type2 = (dates: any, dateStrings: any) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        if (dateStrings[0] !== null) {
            this.setState({ period3Type2: [dateStrings[0], dateStrings[1]] })
        } else {
            this.setState({ period3Type2: [] })
        }
    }
    _setPeriod1 = (dates: any, dateStrings: any) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        if (dateStrings[0] !== null) {
            this.setState({ period1: [dateStrings[0], dateStrings[1]] })
        } else {
            this.setState({ period1: [] })
        }
    }
    _setPeriod2 = (dates: any, dateStrings: any) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        if (dateStrings[0] !== null) {
            this.setState({ period2: [dateStrings[0], dateStrings[1]] })
        } else {
            this.setState({ period2: [] })
        }
    }
    _setPeriod3 = (dates: any, dateStrings: any) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        if (dateStrings[0] !== null) {
            this.setState({ period3: [dateStrings[0], dateStrings[1]] })
        } else {
            this.setState({ period3: [] })
        }
    }
    _setPeriod4 = (dates: any, dateStrings: any) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        if (dateStrings[0] !== null) {
            this.setState({ period4: [dateStrings[0], dateStrings[1]] })
        } else {
            this.setState({ period4: [] })
        }
    }
    _setReader = (e: any) => {
        this.setState({ reader: e })
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const dateFormat = 'YYYY-MM-DD';
        return (
            <Spin spinning={this.state.loading} style={{ position: 'fixed', paddingTop: '50%', paddingLeft: '50%' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                    <Form onSubmit={this.handleSubmit} style={{ paddingLeft: '20%', width: "80%" }}>
                        <FormItem
                            {...formItemLayout}
                            label="ปีงบประมาณ"
                            hasFeedback
                        >
                            <InputNumber min={1990} max={3000} defaultValue={this.state.durationYear} onChange={this._setDurationYear} />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="ประเภทโครงการวิจัย"
                            hasFeedback
                        >
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                                value={this.state.typeProject}
                                onChange={this._setTypeProject}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {this.state.arrTypePro}
                            </Select>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="ชื่อโครงการวิจัย"
                            hasFeedback
                        >
                            <Input minLength={10} maxLength={255} placeholder='Project name' value={this.state.nameProject} onChange={this._setNameProject} />
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="วันที่เริ่มโครงการ"
                            hasFeedback
                        >
                            <DatePicker defaultValue={moment(this.state.dateStartProject, dateFormat)} onChange={this._setDateStartProject} />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="จำนวนงบประมาณเงินทุน"
                        >
                            <InputNumber min={0} value={this.state.budget} onChange={this._setBudget} /> บาท
                         </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="ประเภทไตรมาส"
                        >
                            <Radio.Group value={this.state.typePeriod} onChange={this._onChangePeriod}>
                                <Radio.Button value={this.state.typePeriod}>{this.state.typePeriod} ไตรมาส</Radio.Button>
                            </Radio.Group>
                            {this._onChangPeriodForm()}
                        </FormItem>

                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" onClick={this.handleSubmit} >แก้ไขโครงการวิจัย</Button>
                        </FormItem>
                    </Form>
                </div>
            </Spin>
        )
    }
}