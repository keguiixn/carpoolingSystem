import React, { Component } from 'react'
import {Card,Space,Button} from 'antd'
import {Link} from 'umi'
import { PlusOutlined} from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import {getCarPoolingInfo} from './service'


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
        },
        {
          title: '目的点',
          dataIndex: 'endPoint',
          key:'endPoint',
        },
        {
            title: '剩余人数',
            dataIndex: 'restNum',
            key:'restNum',
            search:false
          },
        {
          title: '创建时间',
          dataIndex: 'startDate',
          key:'startDate',
        //   valueType: 'dateTime',
          search: false,
          sorter: (a, b) => moment(a.createTime )- moment(b.createTime),
        },
        {
          title: '操作',
          dataIndex: 'action',
          key:'action',
          valueType: 'option',
          render: (text,record) => (
             <>
              <a style={{marginRight:20}}>参与拼车</a>
              <a style={{marginRight:20}}>解除拼车</a>
              <Link>查看详情</Link>
             </>
          )
        }
    ]
    constructor(props){
        super(props);
        this.state={

        }
    }
    async componentDidMount(){
       
    }

    render() {
        return (
            <Card>
                <ProTable  
                 headerTitle={
                    <Space>
                    <Button icon={<PlusOutlined />}
                      type='primary' 
                      style={{marginRight:'10px'}}
                     
                    >
                     新建拼车信息
                    </Button></Space>}
                     rowKey="id"
                     columns={this.Carcolumns}
                     request={async params =>{
                         let result
                        if(params.startPoint||params.endPoint){
                             result = await getCarPoolingInfo(params)
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