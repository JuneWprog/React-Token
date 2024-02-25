//axios
//1. base url
//2. timeout
//3. request response interceptors
import axios from 'axios';

const http = axios.create({
    baseURL: 'https://geek.itheima.net/v1_0',
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
});

// Add a request interceptor

http.interceptors.request.use(function (config) {
    // Do something before request is sent
    //set up the parameters
    return config;
},(error) =>{
    return Promise.reject(error);
});

// Add a response interceptor
http.interceptors.response.use(function (response) {
    // Do something before request is sent
    return response.data;
},(error) =>{
    return Promise.reject(error);
});



export  {http};
