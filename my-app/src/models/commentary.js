import { getCommentary,submitCommentary } from '@/services/api';
import {message} from 'antd';
const Model = {
  namespace: 'commentary',
  state: {
    commentary:[],
  },
  effects: {
    *fetchCommentary({payload}, { call, put }) {
      const response = yield call(getCommentary,payload);
      yield put({
        type: 'saveCommentary',
        payload: response.res,
      });
    },
    *submitCommentary({payload}, { call, put }) {
        const bookID = payload.bookID
        const response = yield call(submitCommentary,payload);
        if(response.res)
        {
            message.success('评论成功');
        }
        else
        {
            message.error('评论失败'+response.error);
        }
        
        //重新获取评论并保存
        const response_1 = yield call(getCommentary,payload);
        yield put({
          type: 'saveCommentary',
          payload: response_1.res,
        });
      },
},
  reducers: {
    saveCommentary(state, action) {
      return {
          ...state,
          commentary:action.payload,
        };
    },
  },
};
export default Model;