//存放发送请求的函数
import request from '@/utils/request';
import url from '@/utils/webConfig';

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
      }
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
      nick_name: "KBH",
      avater: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578560114173&di=01ce80031477c40e7758bee4c7fd6c68&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-d5d077f05fdaadf654ab43c85ccd7db2_hd.jpg",
      current_distance: "20",
      distance: "50",
      total_time: "200",
      content: "siajdihhbhshiuaujdoisaoi",
      created_time: "2019-01-10"
    }
  )
}