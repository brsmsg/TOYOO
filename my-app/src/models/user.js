import { queryUser } from '@/services/api';

const Model = {
    namespace: 'user',
    state: {
        currentUser: {}
    },

    effects: {
        *fetchUser({ payload }, {call, put}){
            const data = yield call(queryUser, payload);
            yield put({
                type: 'getUser',    
                payload: data,
            });
        },
    },

    reducers: {
        getUser(state, action){
            return{
                ...state,
                currentUser: action.payload,
            }
        },
    },

}

export default Model;