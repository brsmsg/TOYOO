import { getBestSeller,getRecommend,getRankList,searchBook } from '@/services/api';
import router from 'umi/router';
import {message} from 'antd';
const Model = {
  namespace: 'book',
  state: {
    best_seller:[],
    recommend:[],
    book_record:[],
    rank_list:{
        IT:[],
        Story:[],
        Literature:[],
    }
  },
  effects: {
    *fetchBestSeller(_, { call, put }) {
      const response = yield call(getBestSeller);
      yield put({
        type: 'saveBestSeller',
        payload: response.res,
      });
    },

    *fetchRecommend({payload}, { call,put }) {    
      const response = yield call(getRecommend,payload);
      yield put({
        type: 'saveRecommend',
        payload: response.res,
      });
    },

    *fetchRankList(_, { call,put }) {    
        const response = yield call(getRankList);
        yield put({
          type: 'saveRankList',
          payload: response.res,
        });
    },

    *saveBookRecord({payload},{call,put}){
      yield put({
        type: 'saveRecord',
        payload: payload,
      });
    },

    *searchBook({payload},{call,put}){
      const response = yield call(searchBook,payload);
      if(response.state=="ok")
      {
        yield put({
          type: 'saveRecord',
          payload: response.res,
        });
        message.success("查询成功！");
        //跳转到图书详情页面
        router.push(`/BookDetail`); 
      }
      else
      {
        message.error("抱歉！未找到相关图书");
      }
      
    }
},
  reducers: {
    saveRecord(state, action) {
      return {
          ...state,
          book_record:action.payload,
        };
    },

    saveBestSeller(state, action) {
        return {
            ...state,
            best_seller:action.payload,
          };
    },

    saveRecommend(state, action) {
        return {
            ...state,
            recommend:action.payload,
          };
    },

    saveRankList(state, action) {
        return {
            ...state,
            rank_list:action.payload,
          };
    },
  },
};
export default Model;