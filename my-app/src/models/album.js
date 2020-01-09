//获取图片，上传图片
import { queryAlbums, uploadAlbums } from '@/services/api';

const Model = {
  namespace: 'album',
  state: {
      albumList: [],
  },
  effects: {
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

    *fetchAlbum({payload}, {call, put}){
        const data = yield call(queryAlbums, payload);   //data 后端返回的数据
        //存入命名空间
        yield put({
            type: 'saveAlbum',  //下面要使用的方法
            payload: data,      //该方法的参数
        });
    }
  },

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

    saveAlbum( state, action){
        return{
            ...state,   //其他参数不变，只改变data
            AlbumList: action.payload
        }
    }
  }
}
    
export default Model;