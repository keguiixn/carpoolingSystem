import React, { Component } from 'react'
import {loginCheck,registerUser} from './service'
import { Form, Input, Button,message ,Card, Tabs, Radio ,InputNumber} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {history} from 'umi'
import styles from './index.less'
import logo from '../images/gduf.png'
import { v4 as uuidv4 } from 'uuid';

const { TabPane } = Tabs;

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    async componentDidMount(){
    }

    onLoginFinish = async values => {
        const result = await loginCheck(values) 
        if(result.status === 200){
            if(result.auth === 'admin'){
                sessionStorage.setItem('admin', result.name)
                history.push('/admin')
            }
            else{
                sessionStorage.setItem('user', result.name)
                history.push('/user')
            }
        }
        else{
            message.error('账号或者密码错误')
        }      
      };

    onRegisterFinish = async values => {
        const result = await registerUser({...values,auth:0,userId:uuidv4()}) 
        if(result.code === 1){
            message.error(result.message)
        }
        else if(result.code === 2){
            message.info(result.message)
        }
        else{
            message.success(result.message)
            window.location.reload(); 
        }
    }

    render() {
        return (
            <div className={styles['login']} >
            <Card  style={{minWidth:'25%',marginTop:'10%'}}>
                <p style={{color:'#008c8c',fontWeight:'bold',fontSize:30}}> <img className={styles['img']} src={logo}></img>拼车管理系统登录</p>
                <Tabs defaultActiveKey="1" centered type="card">
                    <TabPane tab="登陆" key="login">
                        <Form
                        name="car_login"           
                        onFinish={this.onLoginFinish}
                        >
                        <Form.Item                    
                            name="username"
                            rules={[{ required: true, message: '请输入账号' }]}
                        >
                            <Input prefix={<UserOutlined  />} style={{  width:' 80%' }} />
                        </Form.Item>
                        <Form.Item                    
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input
                            prefix={<LockOutlined />}
                            style={{   width:' 80%'}}
                            type="password"
                            />
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit"  >
                            登陆
                            </Button>
                        </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="注册" key="register">
                    <Form
                        name="car_register"           
                        onFinish={this.onRegisterFinish}
                        >
                        <Form.Item  
                            label="用户名"        
                            name="username"
                            style={{marginLeft:40}}
                            rules={[{ required: true, message: '请输入账号' }]}
                        >
                            <Input  style={{ width:'65%',marginLeft:-80 }} />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            style={{marginLeft:40}}
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input
                           
                            style={{width:'65%',marginLeft:-60}}
                            type="password"
                            />
                        </Form.Item>
                        <Form.Item label="性别" name="sex" style={{marginLeft:40}} rules={[{ required: true, message: '请选择性别' }]}>
                        <Radio.Group style={{marginLeft:-80}}> 
                        <Radio value="1">男</Radio>
                        <Radio value="0">女</Radio>
                    </Radio.Group>
                        </Form.Item>
                        <Form.Item label="年龄" name="age" style={{marginLeft:40}} 
                        rules={[{ required: true, message: '请输入年龄' }]}>
                            <InputNumber  style={{   width:' 25%',marginLeft:-80}} min={1}  />
                            </Form.Item >
                            <Form.Item
                    label="联系人电话"
                    name="telPhone"
                    rules={[
                        {required:true,message: '请输入手机号'},
                        {
                            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号'
                        },
                      ]}
                   >
                        <Input placeholder="请输入手机号码" />          
                </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit"  >
                            注册
                            </Button>
                        </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            
            </Card>
            </div>
        )
    }
}
