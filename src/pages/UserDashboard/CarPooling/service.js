import request from 'umi-request'

export function getCarPoolingInfo(params){
    return request(`/carSystem/carPoolingInfo`,{params})
}

export function getUserInfo(params){
    return request(`/carSystem/userInfo`,{params})
}


export function joinCarpool(params){
    return request(`/carSystem/joinCarpool`,{
        method:'POST',
        data: params})
}

export function exitCarpool(params){
    return request(`/carSystem/exitCarpool`,{
        method:'POST',
        data: params})
}
export function newCarpoolInfo(params){
    return request(`/carSystem/newCarpoolInfo`,{
        method:'POST',
        data: params})
}