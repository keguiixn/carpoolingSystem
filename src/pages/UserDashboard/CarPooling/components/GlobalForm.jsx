import React, { Component } from 'react'
import {Modal,Form,Input,Cascader,DatePicker, Space ,InputNumber } from 'antd'
import options from './mock'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'

export default class GlobalForm extends Component {
    constructor(props){
        super(props)
        this.formRef = undefined
        this.state={
            
        }
    }

    componentDidMount(){
        if(this.props.record){
            if(this.props.title === '编辑'){
                console.log(this.props.record)
                const value = {...this.props.record}
                const {startPoint,endPoint} = value
                if(!(startPoint instanceof Array && endPoint instanceof Array)){
                    value.startPoint = startPoint.split(' ')
                    value.endPoint = endPoint.split(' ')
                }
                if(this.formRef){
                    this.formRef.setFieldsValue({...value})
                }
            }
        }  
    }


    onChange=(type,value,dateString)=>{
        if(type==='startDate'){
            this.setState({
                [type]:dateString
            })
        }
        else if(type==='startPoint'||type==='endPoint'){
            this.setState({
                [type]:value.join(' ')
            })
        }
        else{
            this.setState({
                [type]:value
            })
        }
    }

    render() {
        const {visible,title,onClose,onCreate} = this.props
        const Formvalue = this.state
        return (
            <Modal  
            visible={visible}
            title={title}
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
                        const {telphone,description,initiator} = values
                        const carInfoid = uuidv4()
                        const hasPerson = sessionStorage.user
                        const newObj = {...Formvalue,telphone,description,initiator,hasPerson,carInfoid}
                        this.formRef.resetFields();
                        onCreate(newObj);
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
                    label="出发点"
                    name="startPoint"
                    rules={[{required:true,message:'请输入出发点'}]}
                   >
                        <Cascader options={options} onChange={(value)=>this.onChange('startPoint',value)} placeholder="Please select" />
                </Form.Item>

                <Form.Item
                    label="目的点"
                    name="endPoint"
                    rules={[{required:true,message:'请输入目的点'}]}
                   >
                        <Cascader options={options} onChange={(value)=>this.onChange('endPoint',value)} placeholder="Please select" />
                </Form.Item>
                <Form.Item
                    label="发起人"
                    name="initiator"
                    initialValue={title==='新建'? window.sessionStorage.user:''}
                   >
                        <Input disabled></Input>
                </Form.Item>
                <Form.Item
                    label="出发时间"
                    name="startDate"
                    // rules={[{required:true,message:'请输入出发时间'}]}
                   >
                        <Space direction="vertical" size={12}>
                        {title==='编辑'?<DatePicker  format="YYYY-MM-DD HH:mm:ss" showTime value={this.props.record?moment(this.props.record.startDate):null}  onChange={(value,dateString)=>this.onChange('startDate',value,dateString)} />:
                            <DatePicker  format="YYYY-MM-DD HH:mm:ss" showTime  onChange={(value,dateString)=>this.onChange('startDate',value,dateString)}  />}
                        </Space>          
                </Form.Item>
                <Form.Item
                    label="总人数"
                    name="total"
                    rules={[{required:true,message:'请输入总人数'}]}
                   >
                     <InputNumber min={1}   onChange={(value)=>this.onChange('total',value)} />            
                </Form.Item>
                <Form.Item
                    label="仍需拼车人数"
                    name="restNum"
                    rules={[{required:true,message:'请输入仍需拼车人数'}]}
                   >
                        <InputNumber min={0}  max={this.state.total?this.state.total-1:undefined} onChange={(value)=>this.onChange('restNum',value)} />          
                </Form.Item>
                <Form.Item
                    label="联系人电话"
                    name="telphone"
                    rules={[
                        {required:true,message: '请输入手机号'},
                        {
                            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号'
                        },
                      ]}
                   >
                        <Input placeholder="请输入手机号码" />          
                </Form.Item>
                <Form.Item
                    label="描述"
                    name="description"
                >
                    <Input.TextArea  placeholder="请输入描述" />
                </Form.Item>

                </Form>
            </Modal>
            
        )
    }
}
