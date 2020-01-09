import { addTrip,getRecentTrip } from '@/services/api';
import { message } from 'antd';
import router from 'umi/router';

const Model = {
    namespace: 'trip',
    state: {
        tripInfo: {
            photoList:[],
            userList:[],
            attentionList:[],
        },
        place_record:"",
    },

    effects: {
        *addTrip({ payload }, {call, put}){
            const response = yield call(addTrip, payload);
            //添加行程判断
            if(response)
            {
                message.success("行程添加成功！快去相册上传图片吧！");
            }
            else{
                message.error("行程添加失败！");
            }
        },
        *getRecentTrip({ payload }, {call, put}){
            const response = yield call(getRecentTrip, payload);
            yield put({
                type:'saveTripInfo',
                payload:response
            })
        },
        *savePlaceRecord({payload},{put}){
            //将点击的地点相册的地点保存到仓库
            yield put({
                type:'savePlaceRecord',
                payload:payload
            })
        }
    },

    reducers: {
        saveTripInfo(state, action){
            return{
                ...state,
                tripInfo: action.payload,
            }
        },
        savePlaceRecord(state, action){
            return{
                ...state,
                place_record: action.payload,
            }
        } 
    },

}

export default Model;