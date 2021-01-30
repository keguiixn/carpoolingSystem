import React, { Component } from 'react'
import {Card,Space,Button,Tooltip,Message} from 'antd'
import {Link} from 'umi'
import {connect} from 'dva'
import { PlusOutlined} from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import moment from 'moment'
import {getCarPoolingInfo,joinCarpool,exitCarpool,newCarpoolInfo,getCarPoolingInfoById} from './service'
import GlobalForm from './components/GlobalForm';


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
             <Tooltip title={record.restNum===0  ?'人数已满，无法参与拼车':record.hasPerson.split(',').includes(sessionStorage.user)?'已拼车，无法再次参与':''}>
              <Button type='link' disabled={record.restNum===0 ||record.hasPerson.split(',').includes(sessionStorage.user)}  style={{marginRight:20 }} onClick={()=>this.joinCar(record.carInfoid,sessionStorage.user)}>参与拼车</Button>
              </Tooltip>
              <Tooltip title={record.hasPerson.split(',').includes(sessionStorage.user)?'':'未参与拼车，无法解除拼车'}>
              <Button type='link'  style={{marginRight:20}} disabled={record.hasPerson.split(',').includes(sessionStorage.user)?false:true} onClick={()=>this.exitCar(record.carInfoid,sessionStorage.user)}>解除拼车</Button>
              </Tooltip>
              <Tooltip title={record.initiator===sessionStorage.user?'':'该信息不是你创建的，无法编辑'}>
              <Button type='link'  style={{marginRight:20}} disabled={record.initiator===sessionStorage.user?false:true} onClick={()=>this.showEditModal(record.carInfoid)}>编辑</Button>
              </Tooltip>
              <Link to={`/user/dashboard/carPooling/Detail?carInfoid=${record.carInfoid}`}>查看详情</Link>
             </> 
          )
        }
    ]

    

    constructor(props){
        super(props);
        this.state={
          visible:false,
          title:'新建',
          record:''
        }
    }

    CarActionRef = React.createRef();

    async componentDidMount(){
      if(this.props.carPoolingInfo.carpoolinformationList.length<1&&this.props.carPoolingInfo){
        this.props.getCarPoolingInfo()
      }
  }

    showModal=()=>{
      this.setState({
        visible:true,
        title:'新建'
      })
    }
    showEditModal=(carInfoid)=>{
      const Allrecord = this.props.carPoolingInfo.carpoolinformationList
      const currentRecord = Allrecord.filter(item=>item.carInfoid===carInfoid)
      this.setState(pre=>{
        const result = {...pre}
        result.visible = true
        result.record = currentRecord[0]
        result.title = '编辑'
        return result 
      })
    }

    closeModal=()=>{
      this.setState({
        visible:false
      })
    }

    submit=async(values)=>{     
      const result = await newCarpoolInfo(values)
      if(result.code === 0){
        this.setState({
          visible:false
        },()=>{
          Message.success(result.message)
          this.CarActionRef.current.reloadAndRest()
        })      
      }
      else{
        Message.error(result.message)
      }
    }

    joinCar=async(id,name)=>{
      const result = await joinCarpool({id,name})
      if(result.success === true){
        Message.success(result.message)
        this.CarActionRef.current.reloadAndRest()
      }
      else{
        Message.success('拼车失败')
      }
    }

    exitCar=async(id,name)=>{
      const result = await exitCarpool({id,name})
      if(result.success === true){
        Message.success(result.message)
        this.CarActionRef.current.reloadAndRest()
      }
      else{
        Message.success('解除拼车失败')
      }
    }
    render() {
      const {visible,title} = this.state
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
                     新建拼车信息
                    </Button></Space>}
                     rowKey="carInfoid"
                     actionRef={this.CarActionRef}
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
                       {visible?<GlobalForm  onClose={this.closeModal} onCreate={this.submit} {...this.state}  />:null}
            </Card>
        )
    }
}
const mapStateToProps = state  => ({
  carPoolingInfo: state.carPoolingInfo
})
const mapDispatchToProps = dispatch => ({
  getCarPoolingInfo:() => dispatch({type:"carPoolingInfo/fetchCarPoolingInfo"}),
})


export default connect(mapStateToProps, mapDispatchToProps)(CarPooling);