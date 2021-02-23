import React, { Component } from 'react'
import {Card,Space,Button,Popconfirm,Message} from 'antd'
import ProTable from '@ant-design/pro-table';
import moment from 'moment'
import {getCarPoolingInfo} from '../../UserDashboard/CarPooling/service'
import {DeleteCarInfo} from './service'


class CarPooling extends Component {

    Carcolumns = [
        {
          title: '发起人',
          dataIndex: 'initiator',
          key:'initiator',
        },
        {
          title: '出发点',
          dataIndex: 'startPoint',
          key:'startPoint',
          search:false
        },
        {
          title: '目的点',
          dataIndex: 'endPoint',
          key:'endPoint',
          search:false
        },
        {
            title: '剩余拼车人数',
            dataIndex: 'restNum',
            key:'restNum',
            search:false
          },
        {
          title: '出发时间',
          dataIndex: 'startDate',
          key:'startDate',
          valueType: 'dateTime',
          search: false,
          sorter: (a, b) => moment(a.startDate )- moment(b.startDate),
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
                  onConfirm={()=>this.deleteCarInfo(record.carInfoid)}
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

    CarActionRef = React.createRef();

    async componentDidMount(){

  }

  deleteCarbatchInfo=async()=>{
    const params = this.state.selectedRowKeys
    const result = await DeleteCarInfo({carInfoid:params})
    if(result.status === 200){
      Message.success(result.message)
      this.CarActionRef.current.reloadAndRest()
    }
    else{
      Message.error(result.message)
    }
  }

  deleteCarInfo= async(carInfoid)=>{
    const params = [carInfoid]
    const result = await DeleteCarInfo({carInfoid:params})
    if(result.status === 200){
      Message.success(result.message)
      this.CarActionRef.current.reloadAndRest()
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
                              onConfirm={()=>this.deleteCarbatchInfo()}
                              okText="确定"
                              cancelText="取消"
                            >
                          <a>批量删除</a>
                          </Popconfirm>
                        </Space>
                      );
                    }}
                     rowKey="carInfoid"
                     actionRef={this.CarActionRef}
                     columns={this.Carcolumns}
                     request={async params =>{
                       let result
                      if(params.initiator){
                        result = await getCarPoolingInfo({initiator:params.initiator})  
                       }
                       else{
                        result = await getCarPoolingInfo()  
                       }
                                                 
                         if(result.success === true){
                           return{
                             data:result.carpoolinformationList,
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



export default CarPooling;