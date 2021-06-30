import * as React from "react";
import { Breadcrumb, Layout, Table, Tabs, Form, Input, Select, Button, InputNumber, Spin,Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import 'antd/dist/antd.css'
import ListAllResearcherController from "src/controller/ListAllResearcherController";
import AddResearcherController from "src/controller/AddResearcherController";
import ViewDetailResearcher from "./ViewDetailResearcher";


const { Content } = Layout;
const TabPane = Tabs.TabPane;

function callback(key: any) {
    console.log(key);
}
interface UserFormProps extends FormComponentProps { }
const FormItem = Form.Item;
const Option = Select.Option;
function handleBlur() {
    console.log('blur');
}
function handleFocus() {
    console.log('focus');
}
function error(arr: any[]) {
    var text = ''
    for (let i = 0; i < arr.length; i++) {
        text += ' --' + arr[i]
    }
    Modal.error({
        title: 'กรูณากรอกข้อมูล',
        content: '' + text,

    });
}
class ListResearcherPage extends React.Component<UserFormProps, any> {

    state = {
        arrayResearcher: [],
        confirmDirty: false,
        autoCompleteResult: [],
        textErr:'',
        seeResearcher: null,
        loading: false
    }
    async componentDidMount() {
        this.setState({ loading: true })
        var listAllResearcherController = new ListAllResearcherController()
        var arrTemp = await listAllResearcherController.listAllResearcher()
        arrTemp.reverse()
        this.setState({
            arrayResearcher: [...this.state.arrayResearcher, ...arrTemp]
        })
        this.setState({ loading: false })
    }
    setButtonBack = () => {
        if (this.state.seeResearcher != null) {
            return <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><h1 onClick={() => { this.setState({ seeResearcher: null }) }}><b><a >กลับหน้าหลัก</a></b></h1></Breadcrumb.Item>
                {/* <Button onClick={() => { this.setState({ idProject: null }) }} style={{ marginBottom: '16px' }}>กลับหน้าหลัก</Button> */}
            </Breadcrumb>
        } else {
            return <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><h1><b>นักวิจัย</b></h1></Breadcrumb.Item>
            </Breadcrumb>
        }
    }
    handleSubmit = async (e: any) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err: any, values: any) => {
            this.setState({textErr:''})
            var errTel = []
            console.log(values)
            if(!/[0-9]/.test(values.phone)){
                errTel.push('กรุณากรอกข้อมูลเบอร์โทรศัพท์ให้ถูกต้อง **0-9')
            }else  if(values.phone.length!==10){
                errTel.push('กรุณากรอกข้อมูลเบอร์โทรศัพท์ให้ได้ 10 ตัวอักษร')
            }

            if (errTel.length !== 0) {
                error(errTel)
                return
            }
            if (!err) {                
                this.setState({ loading: true })
                var addResearcherController = new AddResearcherController();
                var Re = await addResearcherController.createResearcher(values)
                if(Re===false){
                    this.setState({textErr:'username นี้มีผู้ใช้งานแล้ว',loading:false})
                    return
                }else{
                    this.setState({
                        arrayResearcher: [...this.state.arrayResearcher, Re],
                        loading: false
                    })
                    this.props.form.resetFields()
                    console.log('pageRe:', Re)
                }
                
            }
        });
    }
    _setPageResearcher = () => {
        if (this.state.seeResearcher != null) {
            return <ViewDetailResearcher username={this.state.seeResearcher} />
        }
        else {
            const { getFieldDecorator } = this.props.form;
            const formItemLayout = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 8 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 },
                },
            };
            const tailFormItemLayout = {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 16,
                        offset: 8,
                    },
                },
            };
            
            return <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="รายชื่อนักวิจัย" key="1"><Table columns={this.columns} dataSource={this.state.arrayResearcher} size="small" rowKey="username" /></TabPane>
                <TabPane tab="เพิ่มนักวิจัย" key="2">
                    <Spin spinning={this.state.loading}>
                        <Form onSubmit={this.handleSubmit} style={{ width: "70%" }}>
                            <h2 style={{ paddingLeft: '10%' }}><b>ข้อมูลส่วนตัว</b></h2>
                            <FormItem
                                {...formItemLayout}
                                label="ชื่อ - นามสกุล(Name)"
                            >
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'กรุณากรอกชื่อ - นามสกุล', whitespace: true }],
                                })(
                                    <Input minLength={6} maxLength={100}/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="เลขประจำตัวประชาชน 13 หลัก(ID Card)"
                            >
                                {getFieldDecorator('idCard', {
                                    rules: [{ required: true, message: 'กรุณากรอกข้อมูล' }],
                                })(
                                    <InputNumber maxLength={13} minLength={13}  style={{ width: '100%' }} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="ที่อยู่(Address)"
                            >
                                {getFieldDecorator('address', {
                                    rules: [{ required: true, message: 'กรุณากรอกที่อยู่', whitespace: true }],
                                })(
                                    <Input maxLength={255} minLength={10} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="โทรศัพท์(Phone number)"
                            >
                                {getFieldDecorator('phone', {
                                    rules: [{ required: true, message: 'กรุณากรอกหมายเลขโทรศัพท์' }],
                                })(
                                    <Input type='number' maxLength={10} minLength={10}  style={{ width: '100%' }} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="ไอดีไลน์(Line id)"
                            >
                                {getFieldDecorator('idLine', {
                                    rules: [{ required: true, message: 'กรุณากรอกข้อมูล' }],
                                })(
                                    <Input maxLength={24} minLength={4} style={{ width: '100%' }} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="สังกัดคณะ(Faculty)"
                            >
                                {getFieldDecorator('faculty', {
                                    rules: [{ required: true, message: 'กรุณากรออกข้อมูล' }],
                                })(
                                    <Select
                                        showSearch
                                        placeholder="Select a faculty"
                                        optionFilterProp="children"
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option key='1' value='คณะบริหารธุรกิจ'>คณะบริหารธุรกิจ</Option>
                                        <Option key='2' value='คณะเศรษฐศาสตร์'>คณะเศรษฐศาสตร์</Option>
                                        <Option key='3' value='คณะศิลปศาสตร์'>คณะศิลปศาสตร์</Option>
                                        <Option key='4' value='คณะผลิตกรรมการเกษตร'>คณะผลิตกรรมการเกษตร</Option>
                                        <Option key='5' value='คณะวิศวกรรมและอุตสาหกรรมเกษตร'>คณะวิศวกรรมและอุตสาหกรรมเกษตร</Option>
                                        <Option key='6' value='คณะเทคโนโลยีการประมงและทรัพยากรทางน้ำ'>คณะเทคโนโลยีการประมงและทรัพยากรทางน้ำ</Option>
                                        <Option key='7' value='คณะพัฒนาการท่องเที่ยว'>คณะพัฒนาการท่องเที่ยว</Option>
                                        <Option key='8' value='คณะวิทยาศาสตร์'>คณะวิทยาศาสตร์</Option>
                                        <Option key='9' value='คณะสถาปัตยกรรมศาสตร์ และการออกแบบสิ่งแวดล้อม'>คณะสถาปัตยกรรมศาสตร์ และการออกแบบสิ่งแวดล้อม</Option>
                                        <Option key='10' value='คณะสัตวศาสตร์และเทคโนโลยี'>คณะสัตวศาสตร์และเทคโนโลยี</Option>
                                        <Option key='11' value='คณะสารสนเทศและการสื่อสาร'>คณะสารสนเทศและการสื่อสาร</Option>
                                        <Option key='12' value='วิทยาลัยบริหารศาสตร์'>วิทยาลัยบริหารศาสตร์</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="สาขา(Major)"
                            >
                                {getFieldDecorator('major', {
                                    rules: [{ required: true, message: 'กรุณากรออกข้อมูล' }],
                                })(
                                    <Select
                                        showSearch
                                        placeholder="Select a major"
                                        optionFilterProp="children"
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option key='1' value='สาขาวิชาบริหารธุรกิจ'>สาขาวิชาบริหารธุรกิจ</Option>
                                        <Option key='2' value='สาขาวิชาบริหารธุรกิจ(ตลาด)'>สาขาวิชาบริหารธุรกิจ(ตลาด)</Option>
                                        <Option key='3' value='สาขาวิชาเศรษฐศาสตร์ประยุกต์ ฉบับ 2554'>สาขาวิชาเศรษฐศาสตร์ประยุกต์ ฉบับ 2554</Option>
                                        <Option key='5' value='สาขาวิชาพัฒนาสังคมและมนุษย์'>สาขาวิชาพัฒนาสังคมและมนุษย์</Option>
                                        <Option key='6' value='สาขาวิชาเทคโนโลยีหลังการเก็บเกี่ยว'>สาขาวิชาเทคโนโลยีหลังการเก็บเกี่ยว</Option>
                                        <Option key='7' value='สาขาวิชาเทคโนโลยีทางอาหาร'>สาขาวิชาเทคโนโลยีทางอาหาร</Option>
                                        <Option key='8' value='สาขาวิชาวิศวกรรมแปรรูปผลผลิตเกษตร'>สาขาวิชาวิศวกรรมแปรรูปผลผลิตเกษตร</Option>
                                        <Option key='9' value='ศิลปศาสตรมหาบัณฑิต(พัฒนาการท่องเที่ยว)'>ศิลปศาสตรมหาบัณฑิต(พัฒนาการท่องเที่ยว)</Option>
                                        <Option key='10' value='Bussiness Information'>ปรัญชาดุษฎีบัณฑิต(พัฒนาการท่องเที่ยว)</Option>
                                        <Option key='11' value='ปรัญชาดุษฎีบัณฑิต(พัฒนาการท่องเที่ยว)'>เทคโนโลยีชีวภาพมหาบัณฑิต</Option>
                                        <Option key='12' value='เคมีประยุกต์มหาบัณฑิต'>เคมีประยุกต์มหาบัณฑิต</Option>
                                        <Option key='13' value='พันธุศาสตร์มหาบัณฑิต'>พันธุศาสตร์มหาบัณฑิต</Option>
                                        <Option key='14' value='วิทยาศาสตร์และเทคโนโลยีนาโนมหาบัณฑิต'>วิทยาศาสตร์และเทคโนโลยีนาโนมหาบัณฑิต</Option>
                                        <Option key='15' value='เทคโนโลยีสิ่งแวดล้อมมหาบัณฑิต'>เทคโนโลยีสิ่งแวดล้อมมหาบัณฑิต</Option>
                                        <Option key='16' value='เทคโนโลยีชีวภาพดุษฏีบัณฑิต'>เทคโนโลยีชีวภาพดุษฏีบัณฑิต</Option>
                                        <Option key='17' value='เคมีประยุกต์ดุษฏีบัณฑิต'>เคมีประยุกต์ดุษฏีบัณฑิต</Option>
                                        <Option key='18' value='พันธุศาสตร์ดุษฏีบัณฑิต'>พันธุศาสตร์ดุษฏีบัณฑิต</Option>
                                        <Option key='19' value='สาขาวิชาการออกแบบและวางแผนสิ่งแวดล้อม'>สาขาวิชาการออกแบบและวางแผนสิ่งแวดล้อม</Option>
                                        <Option key='20' value='สาขาวิชาการสื่อสารดิจิทัล'>สาขาวิชาการสื่อสารดิจิทัล</Option>
                                        <Option key='21' value='รัฐประศาสนศาสตรมหาบัณฑิต(การบริหารองค์การภาครัฐและเอกชน)'>รัฐประศาสนศาสตรมหาบัณฑิต(การบริหารองค์การภาครัฐและเอกชน)</Option>
                                        <Option key='22' value='สาขาวิชาการบริหารองค์การภาครัฐและเอกชน'>สาขาวิชาการบริหารองค์การภาครัฐและเอกชน</Option>
                                        <Option key='23' value='สาขาวิชาบริหารศาสตร์(การบริหารอุตสาหกรรมบริการ)'>สาขาวิชาบริหารศาสตร์(การบริหารอุตสาหกรรมบริการ)</Option>
                                        <Option key='24' value='สาขาวิชาบริหารศาสตร์(การศึกษาเพื่อบริหารทรัพยากรมนุษย์)'>สาขาวิชาบริหารศาสตร์(การศึกษาเพื่อบริหารทรัพยากรมนุษย์)</Option>
                                        <Option key='25' value='สาขาวิชาบริหารศาสตร์ (การบริหารองค์การภาครัฐและเอกชน)'>สาขาวิชาบริหารศาสตร์ (การบริหารองค์การภาครัฐและเอกชน)</Option>
                                        <Option key='26' value='สาขาวิชาบริหารศาสตร์ (การบริหารเพื่อการพัฒนาสุขภาวะ)'>สาขาวิชาบริหารศาสตร์ (การบริหารเพื่อการพัฒนาสุขภาวะ)</Option>
                                        <Option key='27' value='สาขาวิชาบริหารศาสตร์ (การบริหารการเกษตรและทรัพยากร)'>สาขาวิชาบริหารศาสตร์ (การบริหารการเกษตรและทรัพยากร)</Option>
                                        <Option key='28' value='สาขาวิชาบริหารศาสตร์ (การบริหารเทคโนโลยี)'>สาขาวิชาบริหารศาสตร์ (การบริหารเทคโนโลยี)</Option>
                                        <Option key='29' value='สาขาเทคโนโลยีสารสนเทส'>สาขาเทคโนโลยีสารสนเทส</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <h2 style={{ paddingLeft: '10%' }}><b>ข้อมูลการล็อกอิน</b></h2>
                            <FormItem
                                {...formItemLayout}
                                label="ชื่ออผู้ใช้(Username)"
                            >
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'กรุณากรอกข้อมูล' }],
                                })(
                                    <Input minLength={5} maxLength={24}/>
                                    
                                )}<div style={{color:'red'}}>{this.state.textErr}</div>
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="รหัสผ่าน(Password)"
                            >
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true, message: 'กรุณากรอกรหัสผ่าน',
                                    }, {
                                        validator: this.validateToNextPassword,
                                    }],
                                })(
                                    <Input minLength={4} maxLength={24} type="password" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="ยืนยันรหัสผ่าน(Confirm password)"
                            >
                                {getFieldDecorator('confirm', {
                                    rules: [{
                                        required: true, message: 'กรุณายืนยันรหัสผ่าน',
                                    }, {
                                        validator: this.compareToFirstPassword,
                                    }],
                                })(
                                    <Input minLength={4} maxLength={24} type="password" onBlur={this.handleConfirmBlur} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="อีเมลล์(Email)"
                            >
                                {getFieldDecorator('email', {
                                    rules: [{
                                        type: 'email', message: 'กรอกข้อมูลไม่ถูกต้อง',
                                    }, {
                                        required: true, message: 'กรุณากรอกข้อมูล',
                                    }],
                                })(
                                    <Input minLength={8} maxLength={100} />
                                )}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">เพิ่มนักวิจัย</Button>
                            </FormItem>
                        </Form>
                    </Spin>
                </TabPane>
            </Tabs>
        }
    }
    columns = [
        {
            key: 'username',
            title: 'ชื่อนักวิจัย',
            dataIndex: 'name',
            render: (text: any) => <a onClick={() => { this.setState({ seeResearcher: text }) }}>{text}</a>
        },
        {
            key: 'tel',
            title: 'เบอร์โทรศัพท์',
            dataIndex: 'tel',
        },
        {
            key: 'email',
            title: 'อีเมลล์',
            dataIndex: 'email',
        },
        {
            key: 'faculty',
            title: 'คณะ',
            dataIndex: 'faculty'
        },
        {
            key: 'idLine',
            title: 'ไอดีไลน์',
            dataIndex: 'idLine',
        }
    ];

    handleConfirmBlur = (e: any) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareToFirstPassword = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('กรุณากรอกรหัสผ่านให้ตรงกัน!');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render() {
        return <div>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
                <Spin tip="Loading..." spinning={this.state.loading}>
                    {this.setButtonBack()}

                    <div style={{ background: '#fff', padding: 24, minHeight: 600 }}>
                        {this._setPageResearcher()}
                    </div>
                </Spin>
            </Content>
        </div>
    }
}
const WrappedLogin = Form.create()(ListResearcherPage)
export default WrappedLogin as any;