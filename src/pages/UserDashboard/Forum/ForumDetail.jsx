import React, { Component } from 'react'
import {Card,Row,Col ,Comment, Avatar, Form, Button, List, Input} from 'antd';
import {connect} from 'dva'
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
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
    handleSubmit = () => {
    if (!this.state.value) {
        return;
    }

    this.setState({
        submitting: true,
    });
    setTimeout(() => {
        this.setState({
          submitting: false,
          value: '',
          comments: [
            {
              author: 'Han Solo',
              content: <p>{this.state.value}</p>,
              datetime: moment().fromNow(),
            },
            ...this.state.comments,
          ],
        });
      }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
        
    componentDidMount(){
        if(this.props.forumInfo.forumList&&this.props.forumInfo.forumList.length===0){
            this.props.getforumInfo()
        }

    }
    render() {
        const { comments, submitting, value } = this.state;

        const forumInfo = this.props.forumInfo.forumList.filter(item =>item.forumId===this.props.location.query.id)
        return (
            <Row>
                <Col span={3}>
                    发帖人：{forumInfo.length&&forumInfo[0].forumuserName}
                </Col>
                <Col span={18}>
                <Card style={{minwidth:500 ,height:300}}title={`标题为：${forumInfo.length&&forumInfo[0].title}`}>
                内容为：{forumInfo.length&&forumInfo[0].content}
                </Card>
                </Col>
            {comments.length > 0 && <CommentList comments={comments} />}
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
            </Row>
        )
    }
}

const mapStateToProps = state  => ({    
    forumInfo: state.forumInfo
})
const mapDispatchToProps = dispatch => ({
    getforumInfo:() => dispatch({type:"forumInfo/fetchforumInfo"}),
})


export default connect(mapStateToProps, mapDispatchToProps)(ForumDetail);
