import { API_URLS,LocalStorage_Token_Key } from "../utils";
const customfetch=async (url,{body,...customeConfig})=>{
    const token=window.localStorage.getItem(LocalStorage_Token_Key);
    const headers={
        'content-type':'application/json',
        Accept:'application/json',
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
        config.body=JSON.stringify(body);
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
    }
};
export const getPosts=(page=2,limit=10)=>{
    return customfetch(API_URLS.posts(page,limit),{
        method:'GET',
    });
};