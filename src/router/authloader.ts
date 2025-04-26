import api from "../api"
import { IMenu } from "../types/api"
import { getMenuPath } from "../utils"
export default async function authLoader () {

    const {menuList,buttonList}=await api.getPermissionList() as unknown as {menuList:IMenu[],buttonList:string[]}
    const menuPathList=getMenuPath(menuList) 
    console.log(menuPathList);
    
    return {
        menuList,
        menuPathList,
        buttonList
    }

}