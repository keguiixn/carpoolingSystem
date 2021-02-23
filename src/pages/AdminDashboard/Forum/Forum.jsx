import React, { Component } from 'react'
import {Card,Space,Button,Popconfirm,Message} from 'antd'
import ProTable from '@ant-design/pro-table';
import {getForumInfo} from '../../UserDashboard/Forum/service'
import {DeleteForumInfo} from './service'


class Forum extends Component {

    forumcolumns = [
        {
          title: '发帖人',
          dataIndex: 'forumuserName',
          key:'forumuserName',
        },
        {
          title: '点赞人数',
          dataIndex: 'likeNum',
          key:'likeNum',
          search:false
        },
        {
          title: '踩人数',
          dataIndex: 'disNum',
          key:'disNum',
          search:false
        },
        {
            title: '收藏人数',
            dataIndex: 'StarNum',
            key:'StarNum',
            search:false
          },
        {
          title: '评论人数',
          dataIndex: 'commentNum',
          key:'commentNum',
          search: false
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
                  onConfirm={()=>this.deleteForumInfo(record.forumId)}
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
            selectedRowKeys:[]
        }
    }

    ForumActionRef = React.createRef();

    async componentDidMount(){

  }
  deleteForumbatchInfo=async()=>{
    const params = this.state.selectedRowKeys
    const result = await DeleteForumInfo({forumId:params})
    if(result.status === 200){
      Message.success(result.message)
      this.ForumActionRef.current.reloadAndRest()
    }
    else{
      Message.error(result.message)
    }
  }

  deleteForumInfo= async(forumId)=>{
    const params = [forumId]
    const result = await DeleteForumInfo({forumId:params})
    if(result.status === 200){
      Message.success(result.message)
      this.ForumActionRef.current.reloadAndRest()
    }
    else{
      Message.error(result.message)
    }
  }
 
 



    render() {
        return (
            <Card>
                <ProTable  
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
                              onConfirm={()=>this.deleteForumbatchInfo()}
                              okText="确定"
                              cancelText="取消"
                            >
                          <a>批量删除</a>
                          </Popconfirm>
                        </Space>
                      );
                    }}
                     rowKey="forumId"
                     actionRef={this.ForumActionRef}
                     columns={this.forumcolumns}
                     request={async params =>{
                        let result
                        if(params.forumuserName){
                          result = await getForumInfo({forumuserName:params.forumuserName})  
                         }
                         else{
                          result = await getForumInfo()  
                         }                       
                         if(result.status === 200){
                           return{
                             data:result.forumList,
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
            </Card>
        )
    }
}



export default Forum;