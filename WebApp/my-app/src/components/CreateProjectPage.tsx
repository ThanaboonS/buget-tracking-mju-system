import * as moment from 'moment';
import { Breadcrumb, InputNumber, Layout, Select, Form, Input, DatePicker, Radio, Button, Spin, Modal } from 'antd';
import 'antd/dist/antd.css'
import * as React from "react";

import ListAllResearcherController from '../controller/ListAllResearcherController'
import CreateProjectController from '../controller/CreateProjectController'
import ListTypeProjectController from 'src/controller/ListTypeProjectController';

const { Content } = Layout;
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
    content: 'กรุณาตรวจสอบการแบ่งเงินงบประมาณในไตรมาส(ต้องครบ 100%)...',
  });
}
function warningTypeProject() {
  Modal.warning({
    title: 'ผิดพลาด',
    content: 'กรุณาเลือกประเภทโครงการวิจัย',
  });
}
function error() {
  Modal.error({
    title: 'Error',
    content: 'กรุณากรอกข้อมูลไตรมาสให้ครบถ้วน...',
  });
}
function errorNameProject() {
  Modal.error({
    title: 'This is an error message',
    content: 'ชื่อโครงการวิจัยซ้ำ',
  });
}
let periodIni = new Array();
let periodIniType2 = new Array();
class CreateProjectPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

  }

  state = {
    typePeriod: '3',
    confirmDirty: false,
    autoCompleteResult: [],
    year: moment().year(),
    arrayRe: [],
    durationYear: moment().year() + '',
    typeProject: '',
    nameProject: '',
    dateStartProject: '',
    periods: [],
    period1: [moment().year()  + '-10-01', moment().year()  + '-12-31'],
    period2: [moment().year()  + 1 + '-01-01', moment().year()  + 1 + '-03-31'],
    period3: [moment().year()  + 1 + '-04-01', moment().year()  + 1 + '-06-30'],
    period4: [moment().year()  + 1 + '-07-01', moment().year()  + 1 + '-09-30'],
    period1Type2: [moment().year()  + '-10-01', moment().year()  + 1 + '-01-31'],
    period2Type2: [moment().year()  + 1 + '-02-01', moment().year()  + 1 + '-05-31'],
    period3Type2: [moment().year()  + 1 + '-06-01', moment().year()  + 1 + '-09-30'],
    reader: '',
    budget: 0,
    loading: false,
    perBudgetP1: 50,
    perBudgetP2: 20,
    perBudgetP3: 20,
    perBudgetP4: 10,
    budgetP1: 0,
    budgetP2: 0,
    budgetP3: 0,
    budgetP4: 0,
    perBudgetP1Type2: 50,
    perBudgetP2Type2: 40,
    perBudgetP3Type2: 10,
    budgetP1Type2: 0,
    budgetP2Type2: 0,
    budgetP3Type2: 0, 
    arrTypePro: []
  }

  async componentDidMount() {
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

  handleSubmit = (e: any) => {
    e.preventDefault();
    periodIni = []
    periodIniType2 = []
    let createProjectController = new CreateProjectController();
    console.log(e)
    this.props.form.validateFields(async (err: any, fieldsValue: any) => {
      var result
      if (!err) {
        if(this.state.typeProject === ''){
          warningTypeProject()
          return
        }
        var percen
        if (this.state.typePeriod === '4') {
          percen = this.state.perBudgetP1 + this.state.perBudgetP2 + this.state.perBudgetP3 + this.state.perBudgetP4
          console.log(percen + ':' + (percen === 100))
          if (percen !== 100) {
            warning()
            return
          }
        } else if (this.state.typePeriod === '3') {
          percen = this.state.perBudgetP1Type2 + this.state.perBudgetP2Type2 + this.state.perBudgetP3Type2
          console.log(percen + ':' + (percen === 100))
          if (percen !== 100) {
            warning()
            return
          }
        }

        if (this.state.period1[0] === '' || this.state.period2[0] === '' || this.state.period3[0] === '' || this.state.period4[0] === '') {
          error()
          return
        }
        if (this.state.period1Type2[0] === '' || this.state.period2Type2[0] === '' || this.state.period3Type2[0] === '') {
          error()
          return
        }
        this.setState({ loading: true });
        if (this.state.typePeriod == '4') {
          periodIni.push([this.state.period1[0], this.state.period1[1], this.state.budgetP1]);
          periodIni.push([this.state.period2[0], this.state.period2[1], this.state.budgetP2]);
          periodIni.push([this.state.period3[0], this.state.period3[1], this.state.budgetP3]);
          periodIni.push([this.state.period4[0], this.state.period4[1], this.state.budgetP4]);
          result = await createProjectController.createProject(this.state.durationYear, this.state.typeProject, this.state.nameProject, this.state.dateStartProject, periodIni, this.state.reader, this.state.budget);
          if (result) {
            errorNameProject()
            this.setState({ loading: false })
            return
          }
        } else if (this.state.typePeriod == '3') {
          periodIniType2.push([this.state.period1Type2[0], this.state.period1Type2[1], this.state.budgetP1Type2]);
          periodIniType2.push([this.state.period2Type2[0], this.state.period2Type2[1], this.state.budgetP2Type2]);
          periodIniType2.push([this.state.period3Type2[0], this.state.period3Type2[1], this.state.budgetP3Type2]);
          result = await createProjectController.createProject(this.state.durationYear, this.state.typeProject, this.state.nameProject, this.state.dateStartProject, periodIniType2, this.state.reader, this.state.budget);
          if (result) {
            errorNameProject()
            this.setState({ loading: false })
            return
          }
        }



        this.setState({ result, loading: false })
        console.log(result)

        // this stop change page
        this.props.action()
      }
    });


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
        rangePickers4.push(<div key='1'><b>ไตรมาสที่ 1</b> งบประมาณ <InputNumber defaultValue={50} min={0} max={100} style={{ width: '60px' }} onChange={this._budgetPeriod1} /> % ({this.state.budgetP1} บาท)
       <RangePicker
            ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
            onChange={this._setPeriod1} defaultValue={[moment(this.state.year + '-10-01', dateFormat2), moment(this.state.year + '-12-31', dateFormat2)]} /></div>)
      }
      {
        rangePickers4.push(<div key='2'><b>ไตรมาสที่ 2</b> งบประมาณ <InputNumber defaultValue={20} min={0} max={100} style={{ width: '60px' }} onChange={this._budgetPeriod2} /> % ({this.state.budgetP2} บาท)
      <RangePicker
            ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
            onChange={this._setPeriod2} defaultValue={[moment(this.state.year + 1 + '-01-01', dateFormat2), moment(this.state.year + 1 + '-03-31', dateFormat2)]} /></div>)
      }
      {
        rangePickers4.push(<div key='3'><b>ไตรมาสที่ 3</b> งบประมาณ <InputNumber defaultValue={20} min={0} max={100} style={{ width: '60px' }} onChange={this._budgetPeriod3} /> % ({this.state.budgetP3} บาท)
      <RangePicker
            ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
            onChange={this._setPeriod3} defaultValue={[moment(this.state.year + 1 + '-04-01', dateFormat2), moment(this.state.year + 1 + '-06-30', dateFormat2)]} /></div>)
      }
      {
        rangePickers4.push(<div key='4'><b>ไตรมาสที่ 4</b> งบประมาณ <InputNumber defaultValue={10} min={0} max={100} style={{ width: '60px' }} onChange={this._budgetPeriod4} /> % ({this.state.budgetP4} บาท)
      <RangePicker
            ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
            onChange={this._setPeriod4} defaultValue={[moment(this.state.year + 1 + '-07-01', dateFormat2), moment(this.state.year + 1 + '-09-30', dateFormat2)]} /></div>)
      }
      return <div>{rangePickers4}</div>
    } else if (this.state.typePeriod === "3") {
      rangePickers3 = []
      {
        rangePickers3.push(<div key='1'><b>ไตรมาสที่ 1</b> งบประมาณ <InputNumber defaultValue={50} min={0} max={100} style={{ width: '60px' }} onChange={this._budgetPeriod1Type2} /> % ({this.state.budgetP1Type2} บาท)
      <RangePicker
            ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }} onChange={this._setPeriod1Type2}
            defaultValue={[moment(this.state.year + '-10-01', dateFormat), moment(this.state.year + 1 + '-01-31', dateFormat)]}
          /></div>)
      }
      {
        rangePickers3.push(<div key='2'><b>ไตรมาสที่ 2</b> งบประมาณ <InputNumber defaultValue={40} min={0} max={100} style={{ width: '60px' }} onChange={this._budgetPeriod2Type2} /> % ({this.state.budgetP2Type2} บาท)
      <RangePicker
            ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
            onChange={this._setPeriod2Type2} defaultValue={[moment(this.state.year + 1 + '-02-01', dateFormat), moment(this.state.year + 1 + '-05-31', dateFormat)]} /></div>)
      }
      {
        rangePickers3.push(<div key='3'><b>ไตรมาสที่ 3</b> งบประมาณ <InputNumber defaultValue={10} min={0} max={100} style={{ width: '60px' }} onChange={this._budgetPeriod3Type2} /> % ({this.state.budgetP3Type2} บาท)
       <RangePicker
            ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
            onChange={this._setPeriod3Type2} defaultValue={[moment(this.state.year + 1 + '-06-01', dateFormat), moment(this.state.year + 1 + '-09-30', dateFormat)]} /></div>)
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
    //console.log(e.target.value)
  }
  _setDateStartProject = (e: any) => {
    this.setState({ dateStartProject: e })
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
    const { getFieldDecorator } = this.props.form;
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
    return (
      <Spin spinning={this.state.loading} style={{ position: 'fixed', paddingTop: '50%', paddingLeft: '50%' }}>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><h1><b>สร้างโครงการวิจัย</b></h1></Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>      
            <Form onSubmit={this.handleSubmit} style={{ paddingLeft: '20%', width: "70%" }}>
              <FormItem
                {...formItemLayout}
                label="ปีงบประมาณ"
                hasFeedback
              >
                <Select defaultValue={this.state.year} onChange={this._setDurationYear}
                  onFocus={handleFocus}
                  onBlur={handleBlur}>
                  <Option value={this.state.year}>{this.state.year}</Option>
                  <Option value={this.state.year + 1}>{this.state.year + 1}</Option>
                  <Option value={this.state.year + 2}>{this.state.year + 2}</Option>
                  <Option value={this.state.year + 3}>{this.state.year + 3}</Option>
                </Select>
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
                {getFieldDecorator('nameProject', {
                  rules: [{
                    required: true, message: 'กรุณากรอกชื่อโครงการวิจัย',
                  }],
                })(
                  <Input minLength={10} maxLength={255} placeholder='Project name' onChange={this._setNameProject} />
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="วันที่เริ่มโครงการ"
                hasFeedback
              >
                {getFieldDecorator('dateStartProject', {
                  rules: [{ type: 'object', required: true, message: 'กรุณาเลือกวันเริ่มโครงการ' }],
                })(
                  <DatePicker onChange={this._setDateStartProject} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="จำนวนงบประมาณเงินทุน"
              >
                <InputNumber min={0} defaultValue={0} onChange={this._setBudget} /> บาท
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="ประเภทไตรมาส"
              >

                <Radio.Group value={this.state.typePeriod} onChange={this._onChangePeriod}>
                  <Radio.Button value="3">3 ไตรมาส</Radio.Button>
                  <Radio.Button value="4">4 ไตรมาส</Radio.Button>

                </Radio.Group>

                {this._onChangPeriodForm()}

              </FormItem>
              <FormItem
                {...formItemLayout}
                label="หัวหน้าโครงการวิจัย"
              >
                {getFieldDecorator('reader', {
                  rules: [{ required: true, message: 'กรุณาเลือกหัวหน้าโครงการ' }],
                })(
                  <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={this._setReader}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {this._listAllResearcher()}
                  </Select>
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" >สร้างโครงการวิจัย</Button>
              </FormItem>
            </Form>
          </div>
        </Content>
      </Spin>
    )
  }
}
const WrappedLogin = Form.create()(CreateProjectPage)
export default WrappedLogin as any;
