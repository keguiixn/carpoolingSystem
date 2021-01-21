import request from 'umi-request'

export function getCarPoolingInfo(params){
    return request(`/carSystem/carPoolingInfo`,{params})
}