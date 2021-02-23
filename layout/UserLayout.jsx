import { Component } from 'react';
import { Layout } from 'antd';
import {Menu ,Space,Button,Message} from 'antd';
import routes from '../config/routes'
import './index.less'
import {Link} from 'umi'
import {
  HomeOutlined,
  DesktopOutlined ,
  PieChartOutlined,
  FormOutlined,
  UserOutlined,
  SendOutlined
} from '@ant-design/icons';
import ChangeInfoForm from './ChangeInfoForm'
import {getUserInfo} from '../src/pages/AdminDashboard/CarPooling/service'
import {ChangeuserInfo} from './service'

const { Header, Footer, Sider, Content } = Layout;
const icon =[<HomeOutlined />,< UserOutlined/>,<SendOutlined />,<FormOutlined />,< PieChartOutlined/>]

export default class BasicLayout extends Component {

  state = {
    collapsed: false,
    visible:false,
    current:this.props.location.pathname,
    record:{}
  };

  async componentDidMount(){
    const result = await getUserInfo({username:sessionStorage.getItem('user')})
    this.setState({
      record:result.userInfo[0]
    })
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  handleClick = e => {
    this.setState({
      current: e.key, 
    });
  };
  showModal=()=>{
    this.setState({
      visible:true,
    })
  }
  closeModal=()=>{
    this.setState({
      visible:false
    })
  }
  submit=async(values)=>{     
    const result = await ChangeuserInfo(values)
    if(result.status === 200){
      this.setState({
        visible:false
      },()=>{
        Message.success(result.message)
      })      
    }
    else{
      this.setState({
        visible:false
      },()=>{
        Message.error(result.message)
      })
    }
  }

  render() {
    const { collapsed ,visible} = this.state;
    const UserRoute = routes&&routes[1].routes.filter(item => item.isShow === true)
    return (
      <Layout style={{ minHeight: '100vh'  ,color: 'white' }}>
      <Sider width={200}  collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div style={{ height: '32px',lineHeight:'32px',textAlign:"center", background: 'rgba(255,255,255,.2)', margin: '16px',overflow:"hidden"}}>
        <DesktopOutlined style={{paddingLeft:"10px"}}/><Space style={{marginLeft:"20px"}}>高校拼车系统</Space>
        </div>
        <Menu theme="dark" mode="inline"  onClick={this.handleClick} selectedKeys={[this.state.current]} >
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
        <Header style={{ background: '#fff', textAlign: 'right', padding: 0 }} ><Button type='link'  style={{marginRight:40}} onClick={this.showModal} >修改个人信息</Button><Link  style={{marginRight:40}} onClick={()=>sessionStorage.clear()} to='/login'>退出登陆</Link></Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff' ,color:'black',width:' 100%',height: '100%'}}>
              {this.props.children}
            </div>
            {visible?<ChangeInfoForm  onClose={this.closeModal} onCreate={this.submit} {...this.state}  />:null}
          </Content>
          <Footer style={{ textAlign: 'center' }}>高校拼车客户端</Footer>
        </Layout>
      </Layout>
    )
  }
}