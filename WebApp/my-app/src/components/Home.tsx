import * as React from "react";
import { Layout, Menu,Icon } from 'antd';
import 'antd/dist/antd.css'
import ListAllMyCoordinateProjectPage from "./ListAllMyCoordinateProjectPage";
import ListResearcherPage from "./ListResearcherPage";
import CreateProjectPage from "./CreateProjectPage";
import ViewMyProfilePage from "./ViewMyProfilePage";






const { Header, Footer } = Layout;

class Home extends React.Component {
    state = {
        dataPage: 'project',
        
    }

    public getPage(){
        if(this.state.dataPage=='listResearcher'){
            return <ListResearcherPage/>
        }else if(this.state.dataPage=='addProject'){
            return <CreateProjectPage action={this.afterCreateProjectHandler}/>
        }else if(this.state.dataPage=='profile'){
            return <ViewMyProfilePage/>
        }
        return <ListAllMyCoordinateProjectPage/>
    }
    afterCreateProjectHandler=()=>{
        //this.setState({dataPage:'project'})
        window.location.reload();
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
                        <Menu.Item key="2" onClick={() => { this.setState({ dataPage: 'listResearcher' }) }}><Icon type="team" />นักวิจัย</Menu.Item>
                        <Menu.Item key="3" onClick={() => { this.setState({ dataPage: 'addProject' }) }}><Icon type="experiment" />สร้างโครงการวิจัย</Menu.Item>
                        <Menu.Item key="4" onClick={() => { this.setState({ dataPage: 'profile' }) }}><Icon type="profile" />ข้อมูลส่วนตัว</Menu.Item>
                        <Menu.Item key="5" onClick={() => {
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
export default Home;