import { Button } from "antd";
import { useRouteLoaderData } from "react-router";

export default function AuthButton(props:any){
    const {buttonList}=useRouteLoaderData('layout')
    if(!props.auth){
        return <></>
    }
    if(buttonList.includes(props.auth)){
       return <Button {...props}>{props.children}</Button> 
    }
}