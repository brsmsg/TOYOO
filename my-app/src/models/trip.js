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
        place_record:"黄石",
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
        },
        *saveAttention({payload},{put}){
            //添加新的注意事项
            yield put({
                type:'addAttention',
                payload:payload
            })
            message.success("添加成功！");
        },
        *saveUser({payload},{put}){
            //添加新的成员
            yield put({
                type:'addUser',
                payload:payload
            })
            message.success("添加成功！");
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
        },
        addAttention(state,action){
            var newList=[];
            var i = 0;
            for(i = 0; i<state.tripInfo.attentionList.length;i++)
            {
                newList.push(state.tripInfo.attentionList[i]);
            }
            newList.push(action.payload);
            console.log(newList);
            return{
                ...state,
                tripInfo:{
                    photoList:state.tripInfo.photoList,
                    userList:state.tripInfo.userList,
                    attentionList:newList,
                },
            }
        },
        addUser(state,action){
            var newList=[];
            var i = 0;
            for(i = 0; i<state.tripInfo.userList.length;i++)
            {
                newList.push(state.tripInfo.userList[i]);
            }
            const newUser={
                user_id:6,
                nick_name:"HEIXIAONIU",
                avatar:"http://www.vtiantai.net/wp-content/uploads/2019/03/54064f5c9191ef2-5.jpg",
            };
            newList.push(newUser);
            return{
                ...state,
                tripInfo:{
                    photoList:state.tripInfo.photoList,
                    attentionList:state.tripInfo.attentionList,
                    userList:newList,
                },
            }
        }
    },

}

export default Model;