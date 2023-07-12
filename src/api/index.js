import { API_URLS, getFormBody,LocalStorage_Token_Key } from "../utils";
const customfetch=async (url,{body,...customeConfig})=>{
    const token=window.localStorage.getItem(LocalStorage_Token_Key);
    const headers={
        'content-type':'application/x-www-form-urlencoded',
        // Accept:'application/json',
    };
    if(token){
        headers.Authorization=`Bearer ${token}`;
    }
    const config={
        ...customeConfig,
        headers:{
            ...headers,
            ...customeConfig.headers
        },
        // mode:'cors'
    }
    if(body){
        config.body=getFormBody(body)
    }
    try{
        const response=await fetch(url,config);
        const data=await response.json();
        if(data.success){
            return{
                data:data.data,
                success:true
            };
        }
        throw new Error(data.message);
    }catch(error){
        console.error('error');
        return {
            message:error.message,
            success:false,
        };
    }
};
export const getPosts=(page=1,limit=5)=>{
    return customfetch(API_URLS.posts(page,limit),{
        method:'GET',
    });
};
export const login=(email,password)=>{
    return customfetch(API_URLS.login(),{
        method:'POST',
        body:{email,password}
    });
}