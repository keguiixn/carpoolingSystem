import React, { Component } from 'react'
import {Card,Space,Button,Tooltip,Message} from 'antd'
import ProTable from '@ant-design/pro-table';
import { PlusOutlined} from '@ant-design/icons'
import {getUserInfo,opertionBlack} from './service'

class User extends Component {
    Usercolumns = [
        {
          title: '用户名',
          dataIndex: 'username',
          key:'username',
        },
        {
          title: '用户权限',
          dataIndex: 'auth',
          key:'auth',
          search:false,
          valueEnum:{
            1:{
                text:'超级用户'
            },
            0:{
                text:'普通用户'
            },
            2:{
              text:'黑名单'
            }
        }
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key:'sex',
          valueType: 'select', 
          align:"center",
          search:false,
          valueEnum:{
          0:{
              text:'男'
          },
          1:{
            text:'女'
          }
        },
    },
        {
            title: '年龄',
            dataIndex: 'age',
            key:'age',
            search:false
          },
          {
            title: '联系电话',
            dataIndex: 'telPhone',
            key:'telPhone',
            search:false
          },
          {
            title: '被举报次数',
            dataIndex: 'times',
            key:'times',
            search:false,
          },
          {
            title: '举报人',
            dataIndex: 'timespeople',
            key:'timespeople',
            search:false
          },
          {
            title: '是否拉黑',
            dataIndex: 'isBlack',
            key:'isBlack',
            search:false,
            valueEnum:{
                'true':{
                    text:'是'
                },
                'false':{
                  text:'否'
                }
          },
          },
        {
          title: '操作',
          dataIndex: 'action',
          key:'action',
          valueType: 'option',
          render: (text,record) => (
             <>
             {record.auth===1?null:
             <>
             <Tooltip title={record.isBlack==='true'?'已加入黑名单':null}>
             <Button type='link' disabled={record.isBlack==='true'} onClick={()=>this.exitUser('add',record.userId)}>加入黑名单</Button>
             </Tooltip>
             <Tooltip title={record.isBlack==='false'?'未加入黑名单无法移出':null}>
             <Button type='link' disabled={record.isBlack==='false'} onClick={()=>this.exitUser('out',record.userId)}>移出黑名单</Button>
             </Tooltip>
             </>}
            
             </> 
          )
        }
    ]
    constructor(props){
        super(props);
        this.state={

        }
    }
    UserActionRef = React.createRef();

    exitUser=async(type,userId)=>{
        if(type === 'add'){
            const params = {userId,isBlack:'true'}
            const result = await opertionBlack(params)
            if(result.status===200){
                Message.success(result.message)
                this.UserActionRef.current.reloadAndRest()
            }
            else{
                Message.error(result.message)
            }
        }
        else{
            const params = {userId,isBlack:'false'}
            const result = await opertionBlack(params)
            if(result.status===200){
                Message.success(result.message)
                this.UserActionRef.current.reloadAndRest()
            }
            else{
                Message.error(result.message)
            }
        }
    }
    render() { 
        const {visible} = this.state
        return (
            <Card>
                <ProTable  
                     rowKey="userId"
                     actionRef={this.UserActionRef}
                     columns={this.Usercolumns}
                     request={async params =>{
                        let result
                        if(params.username){
                             result = await getUserInfo(params)
                        }
                        else{
                             result = await getUserInfo()
                        }                     
                         if(result.status === 200){
                           return{
                             data:result.userInfo,
                             success:true,
                             total:result.total,
                             page:result.page,
                             pageSize:result.pageSize
                           }
                         }
                         return{
                             data:[],
                             success:true,
                             total:0,
                             page:0,
                             pageSize:10
                         }}}
                         pagination={{
                           pageSize: 10,
                         }}
                       />
                       {visible?<GlobalForm  onClose={this.closeModal} onCreate={this.submit} {...this.state}  />:null}
            </Card>
        )
    }
}

export default User