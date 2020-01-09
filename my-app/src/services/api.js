//存放发送请求的函数
import request from '@/utils/request';
import url from '@/utils/webConfig';
import { async } from 'q';

const hostUrl=url.hostUrl;

// //获取推荐图书 -- 参数为用户的偏好 preferID
// export async function getRecommend(params)
// {
//   return request(hostUrl+'/get-recommend', {
//     method: 'POST',
//     headers:{
//       'Content-Type':'application/json',
//     },
//     body: JSON.stringify(params),
//   });
// }

// //获取畅销图书---不需要参数
// export async function getBestSeller()
// {
//   return request(hostUrl+'/get-best-seller', {
//     method: 'POST',
//     headers:{
//       'Content-Type':'application/json',
// 		},
//   });
// }

//登录--参数是email和password
export async function login(params){
  //返回请求函数结果
  // return request(hostUrl + '/login',{
  //   method:'POST',
  //   headers:{
  //     'Contend-Type': 'application/json',
  //   },
  //   body: JSON.stringify(params),
  // });
  console.log(params);
  const response={
      user_id: "1",
      nick_name: "KBH",
      avater: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578560114173&di=01ce80031477c40e7758bee4c7fd6c68&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-d5d077f05fdaadf654ab43c85ccd7db2_hd.jpg",
      current_distance: "20",
      distance: "50",
      total_time: "200",
      content: "siajdihhbhshiuaujdoisaoi",
      created_time: "2019-01-10"
  }
  return response;
}

//注册---参数是email gender password nick_name
export async function register(params){
  //返回请求函数结果
  // return request(hostUrl + '/register',{
  //   method:'POST',
  //   headers:{
  //     'Contend-Type': 'application/json',
  //   },
  //   body: JSON.stringify(params),
  // });
  console.log(params);
  const response = 1;
  return response;
}

//添加行程---参数是行程的目的地destination
export async function addTrip(params){
  //返回请求函数结果
  // return request(hostUrl + '/addTrip',{
  //   method:'POST',
  //   headers:{
  //     'Contend-Type': 'application/json',
  //   },
  //   body: JSON.stringify(params),
  // });
  console.log(params);
  const response = 1;
  return response;
}

//获取最近一次行程的相关信息---参数是user_id
export async function getRecentTrip(params){
  //返回请求函数结果
  // return request(hostUrl + '/getRecentTrip',{
  //   method:'POST',
  //   headers:{
  //     'Contend-Type': 'application/json',
  //   },
  //   body: JSON.stringify(params),
  // });
  console.log(params);
  const response = {
    photoList:[
      {
        longitude: 113.7,
        latitude: 30,
        url: "http://121.199.21.183:8080/upload/2.jpg",
      },
      {
        longitude: 114,
        latitude: 30,
        url: "http://121.199.21.183:8080/upload/3.jpg",
      },
      {
        longitude: 115,
        latitude: 31,
        url: "http://121.199.21.183:8080/upload/4.jpg",
      },
      {
        longitude: 114.7,
        latitude: 31,
        url: "http://121.199.21.183:8080/upload/1.jpg",
      },
    ],
    userList:[
      {
        user_id:1,
        nick_name:"kangbaihan",
        avatar:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578560114173&di=01ce80031477c40e7758bee4c7fd6c68&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-d5d077f05fdaadf654ab43c85ccd7db2_hd.jpg",
      },
      {
        user_id:2,
        nick_name:"heixiaoniu",
        avatar:"https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=612723378,2699755568&fm=111&gp=0.jpg",
      },
      {
        user_id:3,
        nick_name:"zhengpingping",
        avatar:"https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=378824344,1185609431&fm=26&gp=0.jpg",
      },
      {
        user_id:4,
        nick_name:"huangjiarong",
        avatar:"https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=807400438,1244204492&fm=111&gp=0.jpg",
      },
      {
        user_id:5,
        nick_name:"xiangxu",
        avatar:"https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=807400438,1244204492&fm=111&gp=0.jpg",
      },
    ],
    attentionList:[
      {
        content:"南方好冷呀，多穿衣服",
      },
      {
        content:"多喝热水",
      },
      {
        content:"记得带伞",
      }
    ],
  };
  return response;
}


//获取用户相册内容
export async function queryAlbums(params){
  //返回请求函数结果
  // return request(hostUrl + '/get-album',{
  //   method:'POST',
  //   headers:{
  //     'Contend-Type': 'application/json',
  //   },
  //   body: JSON.stringify(params),
  // });
  return(
    [
      {
        url: "http://121.199.21.183:8080/upload/1.jpg"
      },
      {
        url: "http://121.199.21.183:8080/upload/2.jpg"
      },
      {
        url: "http://121.199.21.183:8080/upload/3.jpg"
      },
      {
        url: "http://121.199.21.183:8080/upload/4.jpg"
      },
      {
        url: "http://121.199.21.183:8080/upload/5.jpg"
      },
      {
        url: "http://121.199.21.183:8080/upload/6.jpg"
      },
      {
        url: "http://121.199.21.183:8080/upload/7.jpg"
      },
      {
        url: "http://121.199.21.183:8080/upload/8.jpg"
      },
  ]
  )
}

export async function queryPlaceAlbum(params){
  return(
    [
      {
        url: "http://121.199.21.183:8080/upload/1.jpg"
      },
      {
        url: "http://121.199.21.183:8080/upload/2.jpg"
      },
      {
        url: "http://121.199.21.183:8080/upload/3.jpg"
      },
      {
        url: "http://121.199.21.183:8080/upload/4.jpg"
      },
      {
        url: "http://121.199.21.183:8080/upload/5.jpg"
      },
      {
        url: "http://121.199.21.183:8080/upload/6.jpg"
      },
      {
        url: "http://121.199.21.183:8080/upload/7.jpg"
      },
      {
        url: "http://121.199.21.183:8080/upload/8.jpg"
      },
  ]
  )
}

export async function queryUser(params){
    // return request(hostUrl + '/get-User',{
    // method:'POST',
    // headers:{
    //   'Contend-Type': 'application/json',
    // },
    // body: JSON.stringify(params),});
    
  return(
    {
      user_id: "1",
      nick_name: "kangbaihan",
      avater: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578560114173&di=01ce80031477c40e7758bee4c7fd6c68&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-d5d077f05fdaadf654ab43c85ccd7db2_hd.jpg",
      current_distance: "20",
      distance: "50",
      total_time: "200",
      content: "siajdihhbhshiuaujdoisaoi",
      created_time: "2019-01-10"
    }
  )
}