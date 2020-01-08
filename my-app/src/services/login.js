import request from '@/utils/request';
import url from '@/utils/webConfig.js';
const hostUrl=url.hostUrl;

export async function fakeAccountLogin(params) {
  return request(hostUrl+'/login', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
		},
    body: JSON.stringify(params),
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
