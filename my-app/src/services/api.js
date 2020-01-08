//存放发送请求的函数
import request from '@/utils/request';
import url from '@/utils/webConfig';

const hostUrl=url.hostUrl;

//获取推荐图书 -- 参数为用户的偏好 preferID
export async function getRecommend(params)
{
  return request(hostUrl+'/get-recommend', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(params),
  });
}

//获取畅销图书---不需要参数
export async function getBestSeller()
{
  return request(hostUrl+'/get-best-seller', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
		},
  });
}

//获取排行榜图书---不需要参数
export async function getRankList()
{
  return request(hostUrl+'/get-rank-list', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
		},
  });
}

//获取图书评论 -- 参数为图书的编号 bookID
export async function getCommentary(params)
{
  return request(hostUrl+'/get-commentary', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(params),
  });
}

//提交图书评论 -- 参数为评论信息
export async function submitCommentary(params)
{
  return request(hostUrl+'/submit-commentary', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(params),
  });
}

//获取收藏的图书 -- 参数为用户的编号 UID
export async function getShelf(params)
{
  return request(hostUrl+'/get-shelf', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(params),
  });
}

//提交收藏 -- 参数为收藏的信息
export async function submitShelf(params)
{
  return request(hostUrl+'/submit-shelf', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(params),
  });
}

//查询图书--params是书名
export async function searchBook(params) {
  return request(hostUrl+'/search-book', {
    method: 'POST',
    // mode: "no-cors",//可以在这设置跨域
    headers:{
      'Content-Type':'application/json',
		},
    body: JSON.stringify(params),
  });
}

//获取所有普通用户信息--不需要参数
export async function getAllUsers() {
  return request(hostUrl+'/get-all-users', {
    method: 'POST',
    // mode: "no-cors",//可以在这设置跨域
    headers:{
      'Content-Type':'application/json',
		},
  });
}

//更新用户信息--params是新的用户信息
export async function updateUserInfo(params) {
  return request(hostUrl+'/update-user', {
    method: 'POST',
    // mode: "no-cors",//可以在这设置跨域
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(params),
  });
}

//删除用户信息--params是用户信息的user_id
export async function deleteUserInfo(params) {
  return request(hostUrl+'/delete-user', {
    method: 'POST',
    // mode: "no-cors",//可以在这设置跨域
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(params),
  });
}

//添加用户信息--params是用户信息的user_id,password,role,name等重要信息
export async function addUserInfo(params) {
  return request(hostUrl+'/add-user', {
    method: 'POST',
    // mode: "no-cors",//可以在这设置跨域
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(params),
  });
}

//获取所有图书信息--不需要参数
export async function getAllBooks() {
  return request(hostUrl+'/get-all-books', {
    method: 'POST',
    // mode: "no-cors",//可以在这设置跨域
    headers:{
      'Content-Type':'application/json',
		},
  });
}

//更新图书信息--params是新的图书信息
export async function updateBookInfo(params) {
  return request(hostUrl+'/update-book', {
    method: 'POST',
    // mode: "no-cors",//可以在这设置跨域
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(params),
  });
}

//删除图书信息--params是图书信息的book_id
export async function deleteBookInfo(params) {
  return request(hostUrl+'/delete-book', {
    method: 'POST',
    // mode: "no-cors",//可以在这设置跨域
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(params),
  });
}

//添加图书信息--params是图书信息的book_id,name等重要信息
export async function addBookInfo(params) {
  return request(hostUrl+'/add-book', {
    method: 'POST',
    // mode: "no-cors",//可以在这设置跨域
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(params),
  });
}

