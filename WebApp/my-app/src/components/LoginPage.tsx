import * as React from 'react';
import { Icon, Input, Button } from 'antd';
import 'antd/dist/antd.css'
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import './css/LoginPage.css'
import LoginController from 'src/controller/LoginController';



function hasErrors(fieldsError: any) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
interface UserFormProps extends FormComponentProps {
}
const FormItem = Form.Item;
class LoginPage extends React.Component<UserFormProps, any> {

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
                var loginController = new LoginController();
                loginController.getLogin(values.userName, values.password)
            }
        });
    }

    public render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div>
                <h1 style={{textAlign: 'center', paddingTop:'5%'}}><b>ระบบติดตามและควมคุมงบประมาณโครงการวิจัย</b></h1>
                <div className='center'>
                <img style={{opacity:0.05}} src="https://upload.wikimedia.org/wikipedia/th/4/43/%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B9%81%E0%B8%A1%E0%B9%88%E0%B9%82%E0%B8%88%E0%B9%89_edit.png" />
                </div>
                <div className="center">                                    
                    <h2><b>เข้าสู่ระบบ</b></h2>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <FormItem
                            validateStatus={userNameError ? 'error' : undefined}
                            help={userNameError || ''}
                        >
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </FormItem><br />
                        <FormItem
                            validateStatus={passwordError ? 'error' : undefined}
                            help={passwordError || ''}
                        >
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <div style={{color:'red'}}>{localStorage.getItem('errText')}</div>
                      
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={hasErrors(getFieldsError())}
                            >
                                Login
                        </Button>
                        </FormItem>
                    </Form>

                </div>
            </div>
        );
    }
}
const WrappedHorizontalLoginForm = Form.create()(LoginPage);
export default (WrappedHorizontalLoginForm as any);