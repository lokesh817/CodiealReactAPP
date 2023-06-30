import { API_URLS,LocalStorage_Token_Key } from "../utils";
const customfetch=async (url,{body,...customeConfig})=>{
    const token=window.localStorage.getItem(LocalStorage_Token_Key);
    const headers={
        'content-type':'application/json',
        Accept:'application/json',
        'Access-Control-Allow-Headers':
          'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': '*',
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
    }
    if(body){
        config.body=JSON.stringify(body);
    }
    try{
        const response=await fetch(url,config);
        const data=await response.json();
        if(response.success){
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
export const getPosts=(page=1,limit=5)=>{
    return customfetch(API_URLS.posts(page,limit),{
        method:'GET',
    });
}