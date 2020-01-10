import { queryUser,login,register } from '@/services/api';
import { message } from 'antd';
import router from 'umi/router';

const Model = {
    namespace: 'user',
    state: {
        currentUser: {},
        user_id: 0,
    },

    effects: {
        *fetchUser({ payload }, {call, put}){
            const data = yield call(queryUser, payload);
            yield put({
                type: 'getUser',    
                payload: data,
            });
        },
        *login({payload},{call,put}){
            //登录
            const response = yield call(login,payload);
            //登录判断
            if(response)
            {
                message.success("登录成功！");
                
                //跳转路由
                router.push(`/HomePage`);
                yield put({
                    type:'addCurrentUser',
                    payload:response
                })
            }
            else{
                message.error("用户名或密码错误！");
            }
        },
        *register({payload},{call}){
            //注册
            const response = yield call(register,payload);
            //登录判断
            if(response)
            {
                message.success("注册成功！");
                
                //跳转路由
                router.push(`/user/login`);
            }
            else{
                message.error("注册失败！");
            }
        },

        //存用户id
        *savePlaceUserId({payload}, {call, put}){
            console.log(payload);
            yield put({
                type: 'savePlaceUserId',
                payload: payload,
            })
        }
    },

    reducers: {
        getUser(state, action){
            return{
                ...state,
                currentUser: action.payload,
            }
        },
        addCurrentUser(state,action){
            return{
                ...state,
                currentUser:action.payload,
            }
        },

        savePlaceUserId(state, action){
            return{
                ...state,
                user_id: action.payload,
            }
        }
    },

}

export default Model;