import React, { Component } from 'react'
import {Card,Space,Button,Popconfirm,Message} from 'antd'
import ProTable from '@ant-design/pro-table';
import moment from 'moment'
import {DeleteNoticeInfo,getNotcieInfo,newNoticeInfo} from './service'
import { PlusOutlined} from '@ant-design/icons'
import NoticeForm from './NoticeForm'

class Notice extends Component {

    Noticecolumns = [
        {
          title: '标题',
          dataIndex: 'title',
          key:'title',
        },
        {
          title: '创建时间',
          dataIndex: 'createDate',
          key:'createDate',
          valueType: 'dateTime',
          search: false,
          sorter: (a, b) => moment(a.createDate )- moment(b.createDate),
        },
        {
          title: '操作',
          dataIndex: 'action',
          key:'action',
          valueType: 'option',
          render: (text,record) => (
             <>
              <Popconfirm
                  title="确定删除吗"
                  onConfirm={()=>this.deleteNoticeInfo(record.noticeId)}
                  okText="确定"
                  cancelText="取消"
                >
               <Button type='link'>删除</Button>
               </Popconfirm>
             </> 
          )
        }
    ]

    

    constructor(props){
        super(props);
        this.state={
          selectedRowKeys:[],
          visible:false

        }
    }

    NoticeActionRef = React.createRef();

    async componentDidMount(){

  }

  deleteNoticebatchInfo=async()=>{
    const params = this.state.selectedRowKeys
    const result = await DeleteNoticeInfo({noticeId:params})
    if(result.status === 200){
      Message.success(result.message)
      this.NoticeActionRef.current.reloadAndRest()
    }
    else{
      Message.error(result.message)
    }
  }

  deleteNoticeInfo= async(noticeId)=>{
    const params = [noticeId]
    const result = await DeleteNoticeInfo({noticeId:params})
    if(result.status === 200){
      Message.success(result.message)
      this.NoticeActionRef.current.reloadAndRest()
    }
    else{
      Message.error(result.message)
    }
  }
 
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
    const result = await newNoticeInfo(values)
    if(result.status === 200){
      this.setState({
        visible:false
      },()=>{
        Message.success(result.message)
        this.NoticeActionRef.current.reloadAndRest()
      })      
    }
    else{
      Message.error(result.message)
    }
  }



    render() {
        const {visible} = this.state
        return (
            <Card>
                <ProTable  
                 headerTitle={
                    <Space>
                    <Button icon={<PlusOutlined />}
                      type='primary' 
                      style={{marginRight:'10px'}}
                      onClick={this.showModal}
                    >
                     新建公告信息
                    </Button></Space>}
                      rowSelection={{
                        type: "checkbox",                   
                        onChange: (selectedRowKeys, selectedRows) => { 
                          this.setState({
                            selectedRowKeys
                          })                   
                        }
                      }
                    }
                    tableAlertOptionRender={() => {
                      return (
                        <Space size={16}>
                          <Popconfirm
                              title="确定删除吗"
                              onConfirm={()=>this.deleteNoticebatchInfo()}
                              okText="确定"
                              cancelText="取消"
                            >
                          <a>批量删除</a>
                          </Popconfirm>
                        </Space>
                      );
                    }}
                     rowKey="noticeId"
                     actionRef={this.NoticeActionRef}
                     columns={this.Noticecolumns}
                     search={false}
                     request={async params =>{
                       const result = await getNotcieInfo()  
                                                 
                         if(result.status === 200){
                           return{
                             data:result.noticeList,
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
                       {visible?<NoticeForm  onClose={this.closeModal} onCreate={this.submit} {...this.state}  />:null}
            </Card>
        )
    }
}



export default Notice;