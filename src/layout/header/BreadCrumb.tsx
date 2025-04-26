import { ReactNode, useEffect, useState } from "react";
import { useLocation, useRouteLoaderData } from "react-router";
import { findTreeNode } from "../../utils";
import { Breadcrumb } from "antd";

export default function BreadCrumb() {
    const { pathname } = useLocation();
    const [breadlist, setBreadlist] = useState<string[]|ReactNode[]> ([]);
    const data=useRouteLoaderData('layout')
    useEffect(()=>{
        const breadList = findTreeNode(data.menuList, pathname,[]);
        setBreadlist([<a href="/welcome">首页</a>,...breadList])
    },[pathname,data])
    return (
       <Breadcrumb items={breadlist.map((item,index)=>({key:index,title:item}))}></Breadcrumb> 
    )
}