import request from 'umi-request'

export function getNotcieInfo(){
    return request(`/carSystem/notcieInfo`)
}
