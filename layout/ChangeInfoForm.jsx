import React, { Component } from 'react'
import {Modal,Form,Input} from 'antd'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'

export default class ChangeInfoForm extends Component {
    constructor(props){
        super(props)
        this.formRef = undefined
        this.state={
            
        }
    }

componentDidMount(){
    if(this.props.record && this.formRef){
        this.formRef.setFieldsValue({...this.props.record})
    }
}

    
    render() {

        const {visible,onClose,onCreate} = this.props
        return (
            <Modal  
            visible={visible}
            title='修改个人信息'
            okText="确定"
            cancelText="关闭" 
            onCancel={()=>{
                this.formRef.resetFields()
                onClose()
                }}
            onOk={()=>{
                this.formRef
                    .validateFields()
                    .then((values) => {
                        this.formRef.resetFields();
                        onCreate(values);
          })
            }}
            destroyOnClose>
            <Form
               ref={ref => {
                this.formRef = ref;
              }}
                layout="vertical"
                name="form_in_modal"
               
                >
               
               
                <Form.Item
                    label="用户名"
                    name="username"
                   >
                     <Input  placeholder="请输入用户名"  disabled/>            
                </Form.Item>
                <Form.Item
                    label="旧密码"
                    name="oldpassword"
                >
                   <Input.Password />
                </Form.Item>
                <Form.Item
                    label="新密码"
                    name="newpassword"
                    // rules={[{required:true,message:'请输入新密码'}]}
                >
                     <Input.Password />
                </Form.Item>
                <Form.Item
                    label="确认新密码"
                    name="confirmnewpassword"
                    // rules={[
                    //     {
                    //       required: true,
                    //       message: '两次密码不一致',
                    //     },
                    //     ({ getFieldValue }) => ({
                    //       validator(rule, value) {
                    //         if (!value || getFieldValue('newpassword') === value) {
                    //           return Promise.resolve();
                    //         }
                    //         return Promise.reject(new Error('两次密码不一致'));
                    //       },
                    //     }),
                    //   ]}
                    //   dependencies={['newpassword']}
                >
                      <Input.Password />
                </Form.Item>
                <Form.Item
                    label="联系方式"
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
                </Form>
            </Modal>
            
        )
    }
}
