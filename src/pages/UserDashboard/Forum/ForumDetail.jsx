import React, { Component ,Fragment} from 'react'
import {Card,Row,Col ,Comment, Message, Form, Button, List, Input} from 'antd';
import {connect} from 'dva'
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import {addCommentInfo} from './service'

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} 条评论`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={10} cols={150} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        添加评论
      </Button>
    </Form.Item>
  </>
);
class ForumDetail extends Component {

    state={
        comments: [],
        submitting: false,
        value: '',
    }
    handleSubmit = async () => {
    if (!this.state.value) {
        return;
    }
    const user = sessionStorage.getItem('user')
    this.setState({
        submitting: true,
    });
    const params = {
      author: user,
      content: this.state.value,
      datetime: moment().format('YY-MM-DD hh:mm:ss'),
    }
    const saveParams = {
      forumId:this.props.location.query.id,
      commentId: uuidv4(),
      commentcontent:params,
      commentuserName:user
    }
    const result = await addCommentInfo(saveParams)
    if(result.status === 200){
      setTimeout(() => {
        this.setState({
          submitting: false,
          value: '',
          comments: [         
            ...this.state.comments,
           params
          ],
        });
        Message.success(result.message)
      }, 1000);
    }
    else{
      Message.error(result.message)
    }
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
        
    componentDidMount(){
        if(this.props.forumList&&this.props.forumList.length===0){
            this.props.getforumInfo()
        }
        if(this.props.commentsList&&this.props.commentsList.length===0){
          this.props.getcommentInfo({id:this.props.location.query.id})
      }


    }
    render() {
        const { comments, submitting, value } = this.state;

        const forumInfo = this.props.forumList.filter(item =>item.forumId===this.props.location.query.id)
        return (
          <Fragment>
            <Row>
                <Col span={3}>
                    发帖人：{forumInfo.length&&forumInfo[0].forumuserName}
                </Col>
                <Col span={21} style={{position:'relative'}}>
                <Card style={{minwidth:500 ,height:300}}title={`标题为：${forumInfo.length&&forumInfo[0].title}`}>
                内容为：{forumInfo.length&&forumInfo[0].content}
               
                </Card>
                </Col>
            </Row>
            <Row>
              
              <Col span={11}>
                <Comment
                    content={
                      <Editor
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        submitting={submitting}
                        value={value}
                      />
                    }
            />
              </Col>
              <Col span={11} style={{marginLeft:15}}>
              {comments.length > 0 && <CommentList style={{ marginTop:500}} comments={comments} />}
              </Col>
            </Row>
            </Fragment>
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


export default connect(mapStateToProps, mapDispatchToProps)(ForumDetail);
