//axios request instance
//1. base url
//2. timeout
//3. request response interceptors
import axios from 'axios';
import {getToken, removeToken} from './token';
import router from '@/router';

const http = axios.create({
    baseURL: 'https://geek.itheima.net/v1_0',
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
});

// Add a request interceptor

http.interceptors.request.use(function (config) {
    //set up the request header  authorization token  
    const token = getToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});

// Add a response interceptor
http.interceptors.response.use(function (response) {
    //2XX response status code
    return response.data;
},(error) =>{
    //handle respond code 401 for invalid token or expired token
    if(error.response.status === 401){
        //redirect to login page
        removeToken();
        router.navigate('/login');
        window.location.reload();
    }
    return Promise.reject(error);
});

export  {http};
