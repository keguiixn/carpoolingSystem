import request from 'umi-request'

export function getForumInfo(){
    return request(`/carSystem/forumInfo`)
}
