//传递数据，发送请求用的
//查询图书的相关数据操作(提供书名进行查找)
import { getAllUsers,updateUserInfo,deleteUserInfo,getAllUsersBalance } from '@/services/api';
import { stringify } from 'querystring';
import router from 'umi/router';
import {message} from 'antd';
const Model = {
  namespace: 'user_management',
  state: {
    data: [],
    userRecord:[]
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getAllUsers); 
      yield put({
          type: 'save',
          payload: response.res
      });
    },
    *addUserRecord({payload},{ call, put }){
        yield put({
            type: 'saveRecord',
            payload: payload
        });
    },
    *updateUser({payload},{ call, put }){
        console.log("修改用户");
        console.log(payload);
        const response = yield call(updateUserInfo,payload); 
        if(response.res)
        {
            message.success('修改信息成功');
        }
        else
        {
            message.error('修改信息失败');
        }
        yield put({
            type: 'saveRecord',
            payload: payload
        });
    },
    *updateUserBalance({payload},{ call, put }){
        const response = yield call(updateUserInfo,payload); 
        if(response.res)
        {
            message.success('处罚成功');
        }
        else
        {
            message.error('处罚失败');
        }
        const response_1 = yield call(getAllUsersBalance); 
        yield put({
            type: 'save',
            payload: response_1.res
        });
        yield put({
            type: 'saveRecord',
            payload: []
        });
    },
    *deleteUser({payload},{ call, put }){
        const response = yield call(deleteUserInfo,payload); 
        if(response.res)
        {
            message.success('删除用户信息成功');
        }
        else
        {
            message.error('删除用户信息失败!'+response.error);
        }
        const response_1 = yield call(getAllUsers); 
        yield put({
            type: 'save',
            payload: response_1.res
        });
        yield put({
            type: 'saveRecord',
            payload: []
        });
    },
  },

  reducers: {
    save(state, action) {
        return {
            ...state,
            data:action.payload,
          };
    },
    saveRecord(state, action) {
        return {
            ...state,
            userRecord:action.payload,
          };
    },
  },
};
export default Model;