import React, { Component } from 'react'
import {loginCheck} from './service'
import { Form, Input, Button,message ,Card} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {history} from 'umi'
import styles from './index.less'
import logo from '../images/gduf.png'


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    async componentDidMount(){
    }

    onFinish = async values => {
        const result = await loginCheck(values) 
        if(result.status === 200){
            if(result.auth === 'admin'){
                history.push('/admin')
            }
            else{
                history.push('/user')
            }
        }
        else{
            message.error('账号或者密码错误')
        }      
      };

    render() {
        return (
            <div className={styles['login']} >
            <Card  style={{minWidth:'25%',marginTop:'10%'}}>
                <p style={{color:'#008c8c',fontWeight:'bold',fontSize:30}}> <img className={styles['img']} src={logo}></img>拼车系统登录</p>
            <Form
            name="car_login"           
            onFinish={this.onFinish}
            >
            <Form.Item
           
                name="username"
                rules={[{ required: true, message: '请输入账号' }]}
            >
                <Input prefix={<UserOutlined  />} style={{  width:' 80%' }} placeholder="Username" />
            </Form.Item>
            <Form.Item
          
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
            >
                <Input
                prefix={<LockOutlined />}
                style={{   width:' 80%'}}
                type="password"
                placeholder="密码"
                />
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit"  >
                登陆
                </Button>
                <Button type="primary" style={{marginLeft:20}}  >
                注册
                </Button>
            </Form.Item>
            </Form>
            </Card>
            </div>
        )
    }
}
