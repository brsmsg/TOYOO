import { submitShelf,getShelf } from '@/services/api';
import {message} from 'antd';
const Model = {
  namespace: 'bookshelf',
  state: {
    book_shelf:[],
  },
  effects: {
    *fetchShelf({payload}, { call, put }) {
      const response = yield call(getShelf,payload);
      yield put({
        type: 'saveShelf',
        payload: response.res,
      });
    },
    
    *submitShelf({payload}, { call, put }) {
        const response = yield call(submitShelf,payload);
        if(response.res)
        {
            message.success('收藏成功');
        }
        else
        {
            message.error('收藏失败'+response.error);
        }
      },
},
  reducers: {
    saveShelf(state, action) {
      return {
          ...state,
          book_shelf:action.payload,
        };
    },
  },
};
export default Model;