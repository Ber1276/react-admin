
import { IMenu } from "../types/api";

// 格式化日期
export const formatDate = (date?: Date | string, rule?: string) => {
    let curDate = new Date();
    if (date instanceof Date) curDate = date;
    else if (date) curDate = new Date(date);

    let fmt = rule || 'yyyy-MM-dd HH:mm:ss';
    fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString());
    type OType = {
        [key: string]: number;
    };
    const O: OType = {
        'M+': curDate.getMonth() + 1,
        'd+': curDate.getDate(),
        'H+': curDate.getHours(),
        'm+': curDate.getMinutes(),
        's+': curDate.getSeconds(),
    };
    for (const k in O) {
        // const val = O[k].toString();
        fmt = fmt.replace(new RegExp(`(${k})`), O[k] > 9 ? O[k].toString() : '0' + O[k].toString());
        // fmt = fmt.replace(new RegExp(`(${k})`), ('00' + val).substring(val.length))
    }
    return fmt;
};

// 日期格式函数

export function formatDateToChinese(dateString: string): string {
    // 将输入的日期字符串解析为 Date 对象
    const date = new Date(dateString);

    // 提取日期和时间部分
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从 0 开始，需要加 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // 格式化为 "年月日时分秒" 格式
    return (
        `${year}年${month.toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日` +
        `${hours.toString().padStart(2, '0')}时${minutes.toString().padStart(2, '0')}分${seconds
            .toString()
            .padStart(2, '0')}秒`
    );
}

export function getMenuPath(list:IMenu[]):string[] {
    return list.reduce((res:string[],item:IMenu)=>{
        return res.concat(Array.isArray(item.children)&&!item.buttons ? getMenuPath(item.children) : item.path+'')
    },[])
}

export const searchRoute:any=(path:string,routes:any[])=>{
    for (const item of routes) {
        if(item.path===path) return item
        if(item.children) {
            const res=searchRoute(path,item.children)
            if(res) return res
        }
    }
}
export const findTreeNode=(tree:IMenu[],pathname:string,path:string[]):string[] =>{
    if(!tree) return []
    for (const item of tree) {
        path.push(item.menuName)
        if(item.path===pathname) return path
        if(item.children?.length) {
            const list=findTreeNode(item.children,pathname,path)
            if(list.length) return list
        }
        path.pop()
    }
    return []
}
