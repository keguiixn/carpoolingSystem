import request from 'umi-request'

export function getForumInfo(params){
    return request(`/carSystem/forumInfo`,{params})
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
export function addForumInfo(params){
    return request(`/carSystem/newForumInfo`,{
        method:'POST',
        data:params
    })
}

export function changeForum(params){
    return request(`/carSystem/changeForum`,{
        method:'POST',
        data:params
    })
}
