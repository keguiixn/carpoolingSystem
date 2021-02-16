import React, { Component } from 'react'
import {Modal,Form,Input} from 'antd'
import { v4 as uuidv4 } from 'uuid';

export default class GlobalForm extends Component {
    constructor(props){
        super(props)
        this.formRef = undefined
        this.state={
            
        }
    }



    
    render() {

        const {visible,title,onClose,onCreate} = this.props
        return (
            <Modal  
            visible={visible}
            title='新建帖子'
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
                        const newparams = {...values}
                        newparams.isStar = 'false'
                        newparams.StarNum = 0
                        newparams.isLike = 'false'
                        newparams.likeNum = 0
                        newparams.isDis = 'false'
                        newparams.disNum = 0
                        newparams.commentNum = 0
                        newparams.forumId = uuidv4()
                        this.formRef.resetFields();
                        onCreate(newparams);
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
                    label="发帖人"
                    name="forumuserName"
                    initialValue={ window.sessionStorage.user}
                   >
                        <Input disabled></Input>
                </Form.Item>
               
                <Form.Item
                    label="标题"
                    name="title"
                    rules={[{required:true,message:'请输入标题'}]}
                   >
                     <Input  placeholder="请输入标题" />            
                </Form.Item>
                <Form.Item
                    label="描述"
                    name="description"
                    rules={[{required:true,message:'请输入描述'}]}
                >
                    <Input.TextArea  placeholder="请输入描述" />
                </Form.Item>
                <Form.Item
                    label="内容"
                    name="content"
                    rules={[{required:true,message:'请输入内容'}]}
                >
                    <Input.TextArea  placeholder="请输入内容" />
                </Form.Item>

                </Form>
            </Modal>
            
        )
    }
}
