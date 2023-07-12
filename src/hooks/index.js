import { useContext, useEffect, useState } from "react";
import jwt from 'jwt-decode';

import { AuthContext} from '../providers/AuthProvider';
import { login as userLogin } from '../api/index';
import{
    setItemInLocalStorage,
    
    removeItemFromLocalStorage,
    getItemFromLocalStorage,
    LocalStorage_Token_Key,
    } from '../utils';

export const useAuth=()=>{
    return useContext(AuthContext);
}
export const useProvideAuth=()=>{
    const [ user, setUser ] = useState(null);
    const [loading,setLoading]=useState(true);
    
    useEffect(()=>{
        const userToken=getItemFromLocalStorage(LocalStorage_Token_Key);

        if(userToken){
            const user=jwt(userToken);

            setUser(user);
        }

        setLoading(false);
    },[])
    const login=async (email,password)=>{
        const response= await userLogin(email,password);
        
        if(response.success){
            setUser(response.data.user);
            setItemInLocalStorage(
                LocalStorage_Token_Key,
                response.data.token ? response.data.token :null
            );
            return {
                success:true
            };
        }else{
            return {
                success:false,
                message:response.message
            };
        }
    };
    const logout=()=>{
        setUser(null);
        removeItemFromLocalStorage(LocalStorage_Token_Key);
    };

    return{
        user,
        login,
        logout,
        loading
    };
};