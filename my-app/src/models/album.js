//获取图片，上传图片
import { queryAlbums } from '@/services/api';

const Model = {
  namespace: 'album',
  //当前状态
  state: {
    albumList: [],
  },

  //action 处理器，处理异步操作，计算外的操作均属于effect，通过reducer来对修改
  effects: {
    /*
     * 通过userServie 接口获取用户数据 ，并save进namespace=users的state中,
     * state数据发生改变组件UserList调用render()重新加载。
    */

    // *fetchNotices(_, { call, put, select }) {
    //   const data = yield call(queryNotices);
    //   yield put({
    //     type: 'saveNotices',
    //     payload: data,
    //   });
    //   const unreadCount = yield select(
    //     state => state.global.notices.filter(item => !item.read).length,
    //   );
    //   yield put({
    //     type: 'user/changeNotifyCount',
    //     payload: {
    //       totalCount: data.length,
    //       unreadCount,
    //     },
    //   });
    // }, 

    *fetchAlbum({ payload }, { call, put }) {
      const data = yield call(queryAlbums, payload);   //data 后端返回的数据
      //存入命名空间
      yield put({
        type: 'saveAlbum',  //下面要使用的方法
        payload: data,      //该方法的参数
      });
    },

    
  },

  //action 处理器，处理同步操作，根据action对state进行更新
  reducers: {
    // changeLayoutCollapsed(
    //   state = {
    //     notices: [],
    //     collapsed: true,
    //   },
    //   { payload },
    // ) {
    //   return { ...state, collapsed: payload };
    // },

    saveAlbum(state, action) {
      return {
        ...state,   //其他参数不变，只改变data
        albumList: action.payload
      }
    },

    

  }
}

export default Model;