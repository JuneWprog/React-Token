// if has token then redirect to children page
//if has no token then redirect to login page

import {getToken} from '@/utils'
import {Navigate} from 'react-router-dom'

const AuthRoute = ({children}) => {
    const token = getToken();
    
    if(token){
        return <>{children}</>
    }else{
        return <Navigate to={"/login"} replace/>
    }
}
export default AuthRoute;