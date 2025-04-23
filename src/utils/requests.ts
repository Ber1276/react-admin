import axios from "axios"
import { message } from "antd"
const baseURL=import.meta.env.VITE_BASE_URL
const instance=axios.create({
    baseURL:baseURL,
    timeout:3000,
    timeoutErrorMessage:'请求超时',
    withCredentials:true,
    headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token') || ''
    }
})
instance.interceptors.request.use((config)=>{
    return config
},(err)=>{
    return Promise.reject(err)
})
instance.interceptors.response.use((res)=>{
    const data=res.data
    if(data.code===40001){
        window.location.href='/login'
    }
    else if(data.code!==200){
        message.error(data.msg) 
    }
    return data.data 
})
export default {
    get(url:string,data?:any){
        return instance.get(url,{data}) 
    },
    post(url:string,data?:any){
        return instance.post(url,data) 
    },
    put(url:string,data?:any){
        return instance.put(url,data) 
    },
    delete(url:string,data?:any){
        return instance.delete(url,{data}) 
    }

}