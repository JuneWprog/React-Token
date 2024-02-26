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
function getArticlesAPI(){
    return request(
        {
            url: '/articles/?articleId',
            method: 'GET'
        }
    )
}

//2. post articles request
export function createArticleAPI(data){
    return request(
        {
            url: '/mp/articles?draft=false',
            method: 'POST',
            data
        }
    )
}
