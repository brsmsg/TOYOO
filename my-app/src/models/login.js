import { stringify } from 'querystring';
import router from 'umi/router';
import { routerRedux } from 'dva/router';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
const Model = {
  namespace: 'login',
  state: {
    status: 0,
    user:[],
  },
  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(fakeAccountLogin, payload);
      const response = res.res;
      const user = res.user;

      //保存用户信息
      yield put({
        type: 'saveUser',
        payload: user,
      });

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.status === 'ok') {

        if(response.currentAuthority=="user")
        {
          yield put(routerRedux.replace('/HomePage'));
        }
        else
        {
          yield put(routerRedux.replace('/UserManagement'));
        }
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
    saveUser(state, action){
      return {
        ...state,
        user: action.payload,
      };
    }
  },
};
export default Model;
