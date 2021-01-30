import { Component } from 'react';
import { Layout } from 'antd';
import {Menu ,Space} from 'antd';
import {Link } from 'umi';
import routes from '../config/routes'
import './index.less'
import {
  HomeOutlined,
  DesktopOutlined ,
  PieChartOutlined,
  FormOutlined,
  UserOutlined,
  SendOutlined
} from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;
const icon =[<HomeOutlined />,< UserOutlined/>,<SendOutlined />,<FormOutlined />,< PieChartOutlined/>]

export default class BasicLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    const UserRoute = routes&&routes[1].routes.filter(item => item.isShow === true)
    return (
      <Layout style={{ minHeight: '100vh'  ,color: 'white' }}>
      <Sider width={200}  collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div style={{ height: '32px',lineHeight:'32px',textAlign:"center", background: 'rgba(255,255,255,.2)', margin: '16px',overflow:"hidden"}}>
        <DesktopOutlined style={{paddingLeft:"10px"}}/><Space style={{marginLeft:"20px"}}>高校拼车系统</Space>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[routes[1].routes[0].path]} >
          {
            UserRoute&&UserRoute.map((item,i)=>
              <Menu.Item key={item.path}>
                <Link to={item.path}> 
                 {icon[i]}
                  <span>{item.name}</span>
                </Link>
              </Menu.Item>
            )
          }
          </Menu>
        </Sider>
        <Layout >
        <Header style={{ background: '#fff', textAlign: 'right', padding: 0 }} onClick={()=>sessionStorage.clear()}><Link  style={{marginRight:40}} to='/login'>退出登陆</Link></Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff' ,color:'black',width:' 100%',height: '100%'}}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>高校拼车客户端</Footer>
        </Layout>
      </Layout>
    )
  }
}