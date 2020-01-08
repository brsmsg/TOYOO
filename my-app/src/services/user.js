import request from '@/utils/request';
import url from '@/utils/webConfig.js';
const hostUrl=url.hostUrl;

export async function query() {
  return request('/api/users');
}
export async function queryCurrent(params) {
  //获取当前用户信息
  return request(hostUrl+'/currentUser', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
		},
    body: JSON.stringify(params),
  });
}

export async function getAllPrefers() {
  //获取当前用户信息
  return request(hostUrl+'/get-all-prefers', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
		},
  });
}

register
export async function register(params) {
  //注册
  return request(hostUrl+'/register', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
