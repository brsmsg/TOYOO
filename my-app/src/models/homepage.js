import {queryDistance, queryTime, queryImpression} from '@/services/api';

const Model ={
    namespace: 'homepage',
    state:{
        distance: 0,
        time: undefined,
        impression: "",
    },

    effects:{
        *fetchDistance({payload}, {call, put}){
            const data = yield call(queryDistance, payload);
            yield put({
                type: 'getDistance',
                payload: data,
            });
        },
    },

    reducers:{
        getDistance(state, action){
            return{
                ...state,
                distance: action.payload
            }
        },
    }
}

export default Model