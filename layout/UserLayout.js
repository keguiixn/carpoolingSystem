import { Component } from 'react';
import { Layout } from 'antd';
import {Menu ,Image  } from 'antd';
import {Link } from 'umi';
import routes from '../config/routes'
import './index.less'
import {
  DesktopOutlined,
  PieChartOutlined,

  UserOutlined,
} from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu


export default class BasicLayout extends Component {

  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
        <Layout style={{ minHeight: '100vh'  ,color: 'white' }}>
        <Sider width={200}  collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div style={{ height: '32px',lineHeight:'32px',textAlign:"center", background: 'rgba(255,255,255,.2)', margin: '16px',overflow:"hidden"}}>
        <DesktopOutlined style={{paddingLeft:"10px"}}/><space style={{marginLeft:"20px"}}>高校拼车系统</space>
        </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[routes[1].routes[1].path]}>
            <Menu.Item key={routes[1].routes[1].path}>
              <Link to={routes[1].routes[1].path}>
               <UserOutlined/>
                <span>{routes[1].routes[1].name}</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><PieChartOutlined/><span>看板</span></span>}
            >
              {routes[1].routes[2].routes.map(item=>(
                 <Menu.Item key={item.path}><Link to={item.path}>{item.name}</Link></Menu.Item>
              ))}
            </SubMenu>
          </Menu>
        </Sider>
        <Layout >
          <Header style={{ background: '#fff', textAlign: 'right', padding: 0 }}><a style={{marginRight:40}}><Link to='/login'>退出登陆</Link></a></Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>高校拼车用户端</Footer>
        </Layout>
      </Layout>
    )
  }
}