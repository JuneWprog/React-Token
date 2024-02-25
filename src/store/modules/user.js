import {createSlice} from '@reduxjs/toolkit';
import {http} from '@/utils';


const userStore = createSlice({
    name: 'user',
    initialState: 
    {
        token:'',
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
    },
   
})

//async action login and get token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
       const res = await http.post('/authorizations', loginForm)
       //save token to store
       dispatch(setToken(res.data.token))
    };
};


//actionCreators
export const {  setToken } = userStore.actions;
export { fetchLogin };
//reducer
const userReducer = userStore.reducer;
export default userReducer;