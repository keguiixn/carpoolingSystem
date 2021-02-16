import React, { Component } from 'react'
import {Card,Space,Button,Tooltip,Message} from 'antd'
import ProTable from '@ant-design/pro-table';
import moment from 'moment'
import {getCarPoolingInfo} from '../../UserDashboard/CarPooling/service'


class CarPooling extends Component {

    Carcolumns = [
        {
          title: '发起人',
          dataIndex: 'initiator',
          key:'initiator',
          search:false
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
               <Button type='link'  onClick={()=>this.showEditModal(record.carInfoid)}>删除</Button>
             </> 
          )
        }
    ]

    

    constructor(props){
        super(props);
        this.state={
        }
    }

    CarActionRef = React.createRef();

    async componentDidMount(){

  }
 



    render() {
        return (
            <Card>
                <ProTable  
                     rowKey="carInfoid"
                     actionRef={this.CarActionRef}
                     columns={this.Carcolumns}
                     request={async params =>{
                         const result = await getCarPoolingInfo()                         
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