import * as React from "react";
import { Breadcrumb, Layout, DatePicker,Button, Input } from 'antd';
import 'antd/dist/antd.css'
import * as moment from 'moment';

const { Content } = Layout;
const { MonthPicker } = DatePicker;
export default class TestDatePickerMonth extends React.Component {
    state = {
        startValue: null,
        endValue: null,
        endValue2: null,
        endValue3: null,        
        endOpen: false,

        array: [],
        text:''
    };
    disabledStartDate = (startValue: any) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue;
    }

    disabledEndDate = (endValue: any) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue;
    }

    onChange = (field: any, value: any) => {
        this.setState({
            [field]: value,
        });
    }
    addItemArr = (e: any) => {
        this.setState({
            array: [...this.state.array, <p>{e}</p>]
        })
    }
    onStartChange = (value: any) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value: any) => {
        this.onChange('endValue', value);
    }

    handleStartOpenChange = (open: any) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open: any) => {
        this.setState({ endOpen: open });
    }
    setText=(e:any)=>{
        this.setState({
            text:e.target.value
        })
    }
    render() {
        const { startValue, endValue, endOpen } = this.state;
        return <div>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><h1><b>ข้อมูลส่วนตัว</b></h1></Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 600 }}>

                    <div>
                        <MonthPicker
                            disabledDate={this.disabledStartDate}
                            defaultValue={moment('01-01', 'MM-DD')}
                            format="YYYY-MM"
                            value={startValue || undefined}
                            placeholder="Start"
                            onChange={this.onStartChange}
                            onOpenChange={this.handleStartOpenChange}
                        />
                        <MonthPicker
                            disabledDate={this.disabledEndDate}

                            format="YYYY-MM"
                            value={endValue || undefined}
                            placeholder="End"
                            onChange={this.onEndChange}
                            open={endOpen}
                            onOpenChange={this.handleEndOpenChange}
                        />
                       
                    </div>
                    <br/><br/>
                    {this.state.array}
                    <Input onChange={this.setText}/>
                    <Button type="primary" onClick={()=>{this.addItemArr(this.state.text)}}>Add</Button>
                </div>
            </Content>
        </div>
    }
}