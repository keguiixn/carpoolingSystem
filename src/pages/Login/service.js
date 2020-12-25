import request from 'umi-request';

export async function loginCheck(params) {
  return request(`/carSystem/login`,{
      method:'POST',
      data:params
  })
}