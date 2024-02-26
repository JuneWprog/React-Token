import {createSlice} from '@reduxjs/toolkit';
import {http} from '@/utils';
import {getToken, setToken as _setToken, removeToken} from '@/utils/token';
import {loginAPI, getUserProfileAPI} from '@/apis/user';

const userStore = createSlice({
    name: 'user',
    initialState: 
    {
        token: getToken() || '', 
        userInfo: {}  
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            //save token to local storage
            _setToken(action.payload);
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        clearUserInfo(state) {
            state.userInfo = {};
            state.token = '';
            removeToken();
        }

    }, 
})

//async action login and get token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
    //    const res = await http.post('/authorizations', loginForm)
       const res = await loginAPI(loginForm)

       //save token to store
       dispatch(setToken(res.data.token))
    };
};

//async action get user info
const fetchUserInfo = () => {
    return async (dispatch) => {
        // const res = await http.get('/user/profile')
        const res = await getUserProfileAPI()
        dispatch(setUserInfo(res.data))
    };
};


//actionCreators
export const { clearUserInfo, setToken, setUserInfo } = userStore.actions;
export { fetchLogin, fetchUserInfo};
//reducer
const userReducer = userStore.reducer;
export default userReducer;