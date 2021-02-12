import request from 'umi-request'

export function getForumInfo(){
    return request(`/carSystem/forumInfo`)
}
export function getCommentInfo(params){
    return request(`/carSystem/commentInfo`,{params})
}

export function addCommentInfo(params){
    return request(`/carSystem/addcommentInfo`,{
        method:'POST',
        data:params
    })
}
