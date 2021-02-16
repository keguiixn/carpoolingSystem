import React, { Component } from 'react'
import { List, Space,Card,Select,Button,Message } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined,DislikeOutlined,StarFilled } from '@ant-design/icons';
import {changeForum,getForumInfo,addForumInfo} from './service'
import {Link} from 'umi'
import {connect} from 'dva'
import ForumForm from './ForumForm'
const {Option} = Select



class Forum extends Component {
    constructor(props){
        super(props);
        this.state={
            SelectValue:'查看所有',
            forumList:[],
            visible:false
        }
    }

    async componentDidMount(){
       this.props.getforumInfo()
       const result = await getForumInfo()
       this.setState({
       forumList:result.forumList
     })
    }



    handle= async value=>{
      if(value==='查看我发布的'){
        const user = sessionStorage.getItem('user')
        const result = await getForumInfo({forumuserName:user})
        this.setState({
          SelectValue:value,
          forumList:result.forumList
        })
      }
      else{
        const result = await getForumInfo()
        this.setState({
          SelectValue:value,
          forumList:result.forumList
        })
      }
        
    }

    onchangeState= async (forumId,type,value,Num)=>{
      if(type === 'Star'){
        const params = {
          forumId,
          isStar:value==='true'?'false':'true',
          StarNum:value==='true'?Num-1:Num+1
        }
        const result = await changeForum(params)
        if(result.status === 200){
          this.setState({
            forumList:result.forumList,
          })
        }
      }else if(type === 'Like'){
        const params = {
          forumId,
          isLike:value==='true'?'false':'true',
          likeNum:value==='true'?Num-1:Num+1
        }
        const result = await changeForum(params)
        if(result.status === 200){
          this.setState({
            forumList:result.forumList,
          })
        }
      }
      else{
        const params = {
          forumId,
          isDis:value==='true'?'false':'true',
          disNum:value==='true'?Num-1:Num+1
        }
        const result = await changeForum(params)
        if(result.status === 200){
          this.setState({
            forumList:result.forumList,
          })
        }
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
      const result = await addForumInfo(values)
      if(result.status === 200){
        this.setState({
          visible:false
        },async ()=>{
          Message.success(result.message)
          const newData = await getForumInfo()
          this.setState({forumList:newData.forumList})
        })  
        
      }
      else{
        Message.error(result.message)
      }
    }

    render() {
      const {forumList,visible} = this.state
        return (
            <Card title={<><Button type='primary'  onClick={this.showModal}>新建帖子</Button></>} extra={<><Select defaultValue="查看所有" onChange={this.handle} style={{width:200}}><Option value="查看所有">查看所有</Option>
            <Option value="查看我发布的">查看我发布的</Option></Select></>}>
            <List
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 3,
            }}
            dataSource={forumList}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <Space onClick={()=>this.onchangeState(item.forumId,'Star',item.isStar,item.StarNum)}>{item.isStar==='true'?<StarFilled/>:<StarOutlined/>}<span>{item.StarNum}</span></Space>,
                  <Space onClick={()=>{if(item.isDis==='false'){this.onchangeState(item.forumId,'Like',item.isLike,item.likeNum)}}}>{item.isLike==='true'?<LikeOutlined style={{color:'red'}}/>:<LikeOutlined/>}<span>{item.likeNum}</span></Space>,
                  <Space onClick={()=>{if(item.isLike==='false'){this.onchangeState(item.forumId,'disLike',item.isDis,item.disNum)}}}>{item.isDis==='true'?<DislikeOutlined style={{color:'red'}}/>:<DislikeOutlined  />}<span>{item.disNum}</span></Space>,
                  <Space><MessageOutlined/><span>{item.commentNum}</span></Space>
                ]}
              >
                <List.Item.Meta
                  title={<Link to={`/user/dashboard/forum/Detail?id=${item.forumId}`}>{item.title}</Link>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
          {visible?<ForumForm onClose={this.closeModal} onCreate={this.submit} {...this.state}/>:null}
          </Card>
        )
    }
}
const mapStateToProps = state  => ({    
  forumList: state.forumInfo.forumList,
  commentsList:state.forumInfo.commentsList
})
const mapDispatchToProps = dispatch => ({
  getforumInfo:() => dispatch({type:"forumInfo/fetchforumInfo"}),
  getcommentInfo:payload => dispatch({type:"forumInfo/fetchcommentInfo",payload}),
})


export default connect(mapStateToProps, mapDispatchToProps)(Forum);
