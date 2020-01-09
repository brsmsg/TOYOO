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
  return request(hostUrl + '/get-album',{
    method:'POST',
    headers:{
      'Contend-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}