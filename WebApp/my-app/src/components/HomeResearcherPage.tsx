import * as React from "react";
import { Layout, Menu,Icon } from 'antd';
import 'antd/dist/antd.css'

import ViewMyProfilePage from "./ViewMyProfilePage";

import ListAllMyProjectResearcherPage from "./ListAllMyProjectResearcherPage";





const { Header, Footer } = Layout;

class HomeResearcherPage extends React.Component<any,any> {
    state = {
        dataPage: 'project',
    }

    public getPage(){
        if(this.state.dataPage=='profile'){
            return <ViewMyProfilePage/>
        }else{
            return <ListAllMyProjectResearcherPage />
        }
        
    }
   
    
    render() {
        return <div>
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                        
                    >
                        <Menu.Item key="1" onClick={() => { this.setState({ dataPage: 'project' }) }}><Icon type="bars" />โครงการวิจัย</Menu.Item>
                        
                        <Menu.Item key="2" onClick={() => { this.setState({ dataPage: 'profile' }) }}><Icon type="profile" />ข้อมูลส่วนตัว</Menu.Item>
                        <Menu.Item key="3" onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}><Icon type="disconnect" />ออกจากระบบ</Menu.Item>

                    </Menu>
                </Header>
                {/* --------------Content------------- */}
                    {this.getPage()}
                {/* -------------EndContent----------- */}
                <Footer style={{ textAlign: 'center' }}>
                    Ru|er Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </div>
    }
}
export default HomeResearcherPage;