import * as React from "react";
import 'antd/dist/antd.css'
import { Button, Modal, Form, Input, Icon, InputNumber, DatePicker, Upload, Spin } from 'antd';
import AddItemController from "src/controller/AddItemController";
import AddFileItemController from "src/controller/AddFileItemController";





const FormItem = Form.Item;

const { TextArea } = Input;
class AddItemModel extends React.Component<any, any> {
    state = {
        visible: false,
        idPeriod: this.props.idPeriod,

        fileList: [],
        loading: false,
        textErr:''
    }

    setButtonOk = true
    hasErrors(fieldsError: any) {
        //this.setState({setButtonOk:Object.keys(fieldsError).some(field => fieldsError[field])})
        this.setButtonOk = Object.keys(fieldsError).some(field => fieldsError[field])
        return this.setButtonOk
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();        
    }
    handleOk = async (e: any) => {
        e.preventDefault();

        this.props.form.validateFields(async (err: any, values: any) => {
            if (!err) {
                this.setState({ loading: true })
                if(this.props.balancePeriod-values.budgetItem<0){
                    this.setState({textErr:'จำนวนงบประมาณไม่เพียงพอต่อกิจกรรมนี้',loading: false})
                    return
                }
                // console.log('Received values of form: ', values);
                // console.log(values.dateBook._d.getFullYear() + '-' + parseInt(values.dateBook._d.getMonth() + 1) + '-' + values.dateBook._d.getDate())
                var addItemController = new AddItemController()
                var result = await addItemController.addItem(values, this.state.idPeriod)
                console.log(values)
                if (result) {
                    var data = {
                        budgetItem: values.budgetItem,
                        dateBook: values.dateBook._d.getFullYear() + '-' + parseInt(values.dateBook._d.getMonth() + 1) + '-' + values.dateBook._d.getDate(),                        
                        delete: [values.idItem,values.budgetItem],
                        idItem: values.idItem,
                        titleItem:[
                            values.titleItem,
                            values.idItem, 
                            values.dateBook._d.getFullYear() + '-' + parseInt(values.dateBook._d.getMonth() + 1) + '-' + values.dateBook._d.getDate(),
                            values.budgetItem,
                            values.startItem._d.getFullYear() + '-' + parseInt(values.startItem._d.getMonth() + 1) + '-' + values.startItem._d.getDate(),
                            values.endItem._d.getFullYear() + '-' + parseInt(values.endItem._d.getMonth() + 1) + '-' + values.endItem._d.getDate(),
                            values.detail
                        ]
                       
                    }
                    await this.props.action(data)
                }                
                if (this.state.fileList.length > 0) {
                    var addFileItemController = new AddFileItemController()
                    await addFileItemController.addFileItem(values.idItem, this.state.fileList)
                }

                //--------reset form addItem----------
                this.props.form.resetFields()
                this.setState({
                    visible: false,
                    fileList: [],
                    loading: false
                });
                //------------------------------------
            }
        });



    }
    changeBudget=(e:any)=>{
        this.setState({textErr:''})
    }
    handleCancel = (e: any) => {
        //console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const idItemError = isFieldTouched('idItem') && getFieldError('idItem');
        const budgetItemError = isFieldTouched('budgetItem') && getFieldError('budgetItem');
        const dateBookError = isFieldTouched('dateBook') && getFieldError('dateBook');
        const titleItemError = isFieldTouched('titleItem') && getFieldError('titleItem');
        const startItemError = isFieldTouched('startItem') && getFieldError('startItem');
        const endItemError = isFieldTouched('endItem') && getFieldError('endItem');
        const detailError = isFieldTouched('detail') && getFieldError('detail');

        const { fileList } = this.state;
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

        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    เพิ่มกิจกรรม
        </Button>

                <Modal
                    title="เพิ่มกิจกรรม"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okButtonProps={({ disabled: this.hasErrors(getFieldsError()) })}
                >
                    <Spin tip="Loading..." spinning={this.state.loading}>
                        {/* <div>{this.state.idPeriod}</div> */}
                        <Form  onSubmit={this.handleOk}>
                            <FormItem
                                validateStatus={idItemError ? 'error' : undefined}
                                help={idItemError || ''}
                                label='รหัสหนังสือ'
                            >
                                {getFieldDecorator('idItem', {
                                    rules: [{ required: true, message: 'กรุณากรอกรหัสหนังสือ!' }],
                                })(
                                    <Input style={{width:'50%'}} prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="รหัสหนังสือ" />
                                )}
                            </FormItem>
                            <FormItem
                                validateStatus={titleItemError ? 'error' : undefined}
                                help={titleItemError || ''}
                                label='ชื่อหนังสือ'
                            >
                                {getFieldDecorator('titleItem', {
                                    rules: [{ required: true, message: 'กรุณากรอกรหัสหนังสือ!' }],
                                })(
                                    <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="ชื่อหนังสือ" />
                                )}
                            </FormItem>
                            <FormItem
                                validateStatus={dateBookError ? 'error' : undefined}
                                help={dateBookError || ''}
                                label='วันที่ออกหนังสือ'
                            >
                                {getFieldDecorator('dateBook', {
                                    rules: [{ required: true, message: 'กรุณากรอกวันที่ออกหนังสือ!' }],
                                })(
                                    <DatePicker />
                                )}
                            </FormItem>
                            <FormItem
                                validateStatus={startItemError ? 'error' : undefined}
                                help={startItemError || ''}
                                label='วันเริ่มกิจกรรม'
                            >
                                {getFieldDecorator('startItem', {
                                    rules: [{ required: true, message: 'กรุณากรอกวันเริ่มกิจกรรม!' }],
                                })(
                                    <DatePicker />
                                )}
                            </FormItem>
                            <FormItem
                                validateStatus={endItemError ? 'error' : undefined}
                                help={endItemError || ''}
                                label='วันสิ้นสุดกิจกรรม'
                            >
                                {getFieldDecorator('endItem', {
                                    rules: [{ required: true, message: 'กรุณากรอกวันสิ้นสุดกิจกรรม!' }],
                                })(
                                    <DatePicker />
                                )}
                            </FormItem>
                            <FormItem
                                validateStatus={detailError ? 'error' : undefined}
                                help={detailError || ''}
                                label='รายละเอียดกิจกรรม'
                            >
                                {getFieldDecorator('detail', {
                                    rules: [{ required: true, message: 'กรุณากรอกรายละเอียด!' }],
                                })(
                                    <TextArea rows={4} />
                                )}
                            </FormItem>
                            <FormItem
                                validateStatus={budgetItemError ? 'error' : undefined}
                                help={budgetItemError || ''}
                                label='จำนวนเงิน'
                            >
                                {getFieldDecorator('budgetItem', {
                                    rules: [{ required: true, message: 'กรุณากรอกจำนวนเงินที่ใช้ในกิจกรรม!' }],
                                })(
                                    <InputNumber onChange={this.changeBudget} min={0} type="number" />
                                )} บาท
                                <div style={{color:'red'}}>{this.state.textErr}</div>
                        </FormItem>
                            
                            <label style={{ color: '#000' }}>อัพโหลดไฟล์:</label><br/>

                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload" /> Select File
          </Button>
                            </Upload>



                        </Form>
                    </Spin>
                </Modal>

            </div >
        );
    }
}
const WrappedLogin = Form.create()(AddItemModel)
export default WrappedLogin as any;