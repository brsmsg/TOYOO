import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import { connect } from 'dva';

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
  <div>
    <Form.Item>
      <TextArea placeholder="发表我的评论" rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button style={{border:'none',color:'gray',backgroundColor:'aliceblue'}} htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        添加评论
      </Button>
    </Form.Item>
  </div>
);

@connect(({ loading,commentary }) => ({
    commentary,
    loading: loading
}))

export default class myCommentary extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
  };

  handleSubmit = () => {
    const {userInfo,dispatch,bookID} = this.props;
    if (!this.state.value) {
      return;
    }

    dispatch({
        type: 'commentary/submitCommentary',
        payload:{
            UID:userInfo.userid,
            bookID:bookID,
            content:this.state.value,
        }
    });

    this.setState({
      value: '',
    });

  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;
    const {userInfo, bookID} = this.props;
    return (
      <div>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={
            <Avatar
              src={userInfo.avatar}
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    );
  }
}