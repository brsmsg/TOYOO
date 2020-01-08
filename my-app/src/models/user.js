import {query as queryUsers ,register } from '@/services/user';
import {message} from 'antd';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *register({payload}, { call,put }) {    
      const response = yield call(register,payload);

      if(response.res)
      {
        message.success('注册成功！');
      }
      else
      {
        message.error('注册失败！'+response.error);
      }
    },
  *fetchCurrent({payload}, { call, put }) {   
      yield put({
        type: 'saveCurrentUser',
        payload: payload,
      });
  },
},
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
