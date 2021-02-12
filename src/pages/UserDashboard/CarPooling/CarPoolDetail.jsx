import React, { Component } from 'react'
import { Descriptions ,Button,Drawer} from 'antd';
import {connect} from 'dva'
import moment from 'moment'
import {getUserInfo} from './service'


class CarPoolDetail extends Component {
    state={
        visible:false,
        user:'',
        userRecord:{}
    }

    componentDidMount(){      
        if(this.props.carPoolingInfo.carpoolinformationList.length<1&&this.props.carPoolingInfo){
            this.props.getCarPoolingInfo()
          }
    }

    UserDetail = name=>{
        let Newname 
        if(typeof name ==='string' ){
            Newname = name.split(',')
        }
        else{
            Newname=[]
        }
        return (
        <div>
            {
             Newname.length>0&&Newname.map((item,index)=>   
                <Button type='link' key={index} onClick={()=>this.showModal(item)}>{item} </Button>)
            }
        </div>
           
    )
    }

    onCloseModal=()=>{
        this.setState({visible:false})
    }
    showModal=async(item)=>{
        const Info = await getUserInfo({username:item})
        this.setState({visible : true,userRecord:Info.userInfo[0],user:item})
    }

    render() {
        const {userRecord,user} = this.state
        const carPoolingInfo = this.props.carPoolingInfo.carpoolinformationList 
        const id = this.props.location.query.carInfoid
        const current = carPoolingInfo.filter(item => item.carInfoid=== id)
        let newDate
        if(current[0]){
            newDate = moment (current[0].startDate).format('YYYY-MM-DD hh:mm:ss')
        }
        
        return (
            <div>               
                <Descriptions
                title="拼车信息详情"
                bordered
                column={{ xxl: 4, xl: 1, lg: 1, md: 3, sm: 3, xs: 1 }}
                extra={<Button type='link' onClick={()=>{this.props.history.go(-1)}}>返回</Button>}
                >
                <Descriptions.Item label="发起人">{current.length&&current[0].initiator}</Descriptions.Item>
                <Descriptions.Item label="出发点">{current.length&&current[0].startPoint}</Descriptions.Item>
                <Descriptions.Item label="目的点">{current.length&&current[0].endPoint}</Descriptions.Item>
                <Descriptions.Item label="出发时间">{newDate}</Descriptions.Item>
                <Descriptions.Item label="总人数">{current.length&&current[0].total}</Descriptions.Item>
                <Descriptions.Item label="剩余拼车人数">{current.length&&current[0].restNum}</Descriptions.Item>
                <Descriptions.Item label="参加拼车的人">{this.UserDetail(current.length&&current[0].hasPerson)}</Descriptions.Item>
                <Descriptions.Item label="发起人联系电话">{current.length&&current[0].telphone}</Descriptions.Item>
                <Descriptions.Item label="描述信息">
                {current.length&&current[0].description}
                </Descriptions.Item>
                </Descriptions>
                <Drawer
                    title="目标用户基础信息"
                    width={500}
                    placement="right"
                    onClose={this.onCloseModal}
                    visible={this.state.visible}
                >
                    <Descriptions
                    title={`${user}的信息`}
                    bordered
                    column={{ xxl: 4, xl: 1, lg: 3, md: 3, sm: 2, xs: 1 }}
                    >
                    <Descriptions.Item label="名字">{userRecord&&userRecord.username}</Descriptions.Item>
                    <Descriptions.Item label="性别">{userRecord&&userRecord.sex==='1'?'男':'女'}</Descriptions.Item>
                    <Descriptions.Item label="年龄">{userRecord&&userRecord.age}</Descriptions.Item>
                    <Descriptions.Item label="用户身份">{userRecord&&userRecord.auth===1?'管理员':'普通用户'}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{userRecord&&userRecord.telPhone}</Descriptions.Item>
                    </Descriptions>
                </Drawer>
            </div>
            
        )
    }
}
const mapStateToProps = state  => ({
    carPoolingInfo: state.carPoolingInfo
  })
  const mapDispatchToProps = dispatch => ({
    getCarPoolingInfo:() => dispatch({type:"carPoolingInfo/fetchCarPoolingInfo"}),
  })
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(CarPoolDetail);