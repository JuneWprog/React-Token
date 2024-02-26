import {http as request }  from '@/utils/request';

//request instance for get channels
//1. get channels request
export function getChannelAPI(){
    return request(
        {
            url: '/channels',
            method: 'GET'
        }
    )
}


//request instance for get and post articles    

//1. get articles request
export function getArticleListAPI(params){
    return request(
        {
            url: '/mp/articles',
            method: 'GET',
            params
        }
    )
}

//2. post one article request
export function createArticleAPI(data){
    return request(
        {
            url: '/mp/articles?draft=false',
            method: 'POST',
            data
        }
    )
}
//3. delete one article 
export function delArticleAPI(id){
    return request(
        {
            url: `/mp/articles/${id}`,
            method: 'DELETE'
        }
    )
}
//4. read article by id
export function getArticleById(id){
    return request(
        {
            url: `/mp/articles/${id}`,
            method: 'GET'
        }
    )
}
//5.update article
export function updateArticleAPI(data){
    return request(
        {
            url: `/mp/articles/${data.id}?draft=false`,
            method: 'PUT',
            data
        }
    )
}
