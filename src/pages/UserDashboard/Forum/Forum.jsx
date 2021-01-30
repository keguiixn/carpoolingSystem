import React, { Component } from 'react'
import { List, Avatar, Space,Card,Select,Button } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined,DislikeOutlined,StarFilled } from '@ant-design/icons';
import {getForumInfo} from './service'
import {Link} from 'umi'
import {connect} from 'dva'

const {Option} = Select
const listData = [];
for (let i = 0; i <3; i++) {
  listData.push({
    href: `http://localhost:8000/user/dashboard/forum/Detail?id=${i}`,
    title: `ant design part ${i}`,
    like:true,
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}



class Forum extends Component {
    constructor(props){
        super(props);
        this.state={
            SelectValue:'查看所有',
        }
    }

    async componentDidMount(){
        if(this.props.forumInfo.forumList.length<1&&this.props.forumInfo){
            this.props.getforumInfo()
          }
    }

    handle=value=>{
        this.setState({
            SelectValue:value
        })
    }

    render() {
        return (
            <Card title={<><Button type='primary'>新建帖子</Button></>} extra={<><Select defaultValue="查看所有" onChange={this.handle} style={{width:200}}><Option value="查看所有">查看所有</Option>
            <Option value="查看我发布的">查看我发布的</Option></Select></>}>
            <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={this.props.forumInfo.forumList}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <Space onClick={()=>console.log(1)}>{item.isStar==='true'?<StarFilled/>:<StarOutlined/>}<span>{item.StarNum}</span></Space>,
                  <Space onClick={()=>console.log(1)}><LikeOutlined/><span>{item.likeNum}</span></Space>,
                  <Space onClick={()=>console.log(1)}><DislikeOutlined/><span>{item.disNum}</span></Space>,
                  <Space onClick={()=>console.log(1)}><MessageOutlined/><span>{item.commentNum}</span></Space>
                ]}
              >
                <List.Item.Meta
                //   avatar={<Avatar src={item.avatar} />}
                  title={<Link to={`/user/dashboard/forum/Detail?id=${item.forumId}`}>{item.title}</Link>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
          </Card>
        )
    }
}
const mapStateToProps = state  => ({
    forumInfo: state.forumInfo
})
const mapDispatchToProps = dispatch => ({
getforumInfo:() => dispatch({type:"forumInfo/fetchforumInfo"}),
})


export default connect(mapStateToProps, mapDispatchToProps)(Forum);
