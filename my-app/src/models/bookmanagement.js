//传递数据，发送请求用的
//查询图书的相关数据操作(提供书名进行查找)
import { getAllBooks,updateBookInfo,deleteBookInfo,addBookInfo } from '@/services/api';
import { stringify } from 'querystring';
import router from 'umi/router';
import {message} from 'antd';
const Model = {
  namespace: 'book_management',
  state: {
    data: [],
    bookRecord:[]
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getAllBooks); 
      yield put({
          type: 'save',
          payload: response.res
      });
    },
    *addBookRecord({payload},{ call, put }){
        yield put({
            type: 'saveRecord',
            payload: payload
        });
    },
    *updateBook({payload},{ call, put }){
        console.log(payload);
        const response = yield call(updateBookInfo,payload); 
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
    *deleteBook({payload},{ call, put }){
        const response = yield call(deleteBookInfo,payload); 
        if(response.res)
        {
            message.success('删除图书信息成功');
        }
        else
        {
            message.error('删除图书信息失败');
        }
        const response_1 = yield call(getAllBooks); 
        yield put({
            type: 'save',
            payload: response_1.res
        });
        yield put({
            type: 'saveRecord',
            payload: []
        });
    },
    *addBook({payload},{ call, put }){
        const response = yield call(addBookInfo,payload); 
        if(response.res)
        {
            message.success('添加图书成功');
        }
        else
        {
            message.error('添加图书失败,（图书编号已存在）');
        }
        const response_1 = yield call(getAllBooks); 
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
            bookRecord:action.payload,
          };
    },
  },
};
export default Model;