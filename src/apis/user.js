import {http as request }  from '@/utils/request';

//request instance from users
//1. login request
function loginAPI(formData){
    return request(
        {
            url: '/authorizations',
            method: 'POST',
            data: formData
        }
    )
}

//2. get user profile request
function getUserProfileAPI(){
    return request(
        {
            url: '/user',
            method: 'GET'
        }
    )
}
//3. remove user profile request

export {loginAPI, getUserProfileAPI};