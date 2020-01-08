import { Comment, Icon, Tooltip, Avatar } from 'antd';
import moment from 'moment';

export default class CommentaryList extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <Comment
        key={data.key}
        author={<a>{data.nick_name}</a>}
        avatar={
          <Avatar
            src={data.avatar}
          />
        }
        content={
          <p>
            {data.content}
          </p>
        }
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{data.created_at}</span>
          </Tooltip>
        }
      />
    );
  }
}