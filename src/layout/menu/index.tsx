import  { useEffect, useState } from 'react';
import {
    HomeOutlined,
    MailOutlined,
    UsergroupDeleteOutlined,
    UserOutlined,
    SolutionOutlined,
    LaptopOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import styles from './index.module.less';
import { useNavigate, useRouteLoaderData } from 'react-router';
import { useStore } from '../../store';
import { IMenu } from '../../types/api';
type MenuItem = Required<MenuProps>['items'][number];
const iconMap={
    HomeOutlined,
    MailOutlined,
    UsergroupDeleteOutlined,
    UserOutlined,
    SolutionOutlined,
    LaptopOutlined,
}
const getIcon=(iconName:string)=>{
    const IconComponent=iconMap[iconName]
    return IconComponent ? <IconComponent /> : null;
}


const SiderMenu = () => {
    // const [theme, setTheme] = useState<MenuTheme>('dark');
    const [current, setCurrent] = useState('1');
    // const changeTheme = (value: boolean) => {
    //     setTheme(value ? 'dark' : 'light');
    // };
    const [menuList, setMenuList] = useState<MenuItem[]>([])
    const data=useRouteLoaderData('layout')
    const {  collapsed, isDark } = useStore();
    const navigate = useNavigate();
    const onClick: MenuProps['onClick'] = ({ key }: { key: string }) => {
        setCurrent(key);
        navigate(key);
    };
    const getItem=(label:string,key:string,icon:any,children?:MenuItem[])=>{
        const myicon=getIcon(icon)
        return {
            label,
            key,
            myicon,
            children
        }
    }
    const getTreeMenu = (menuList: IMenu[],treeList:MenuItem[]=[]) => {
        console.log('menuList',menuList);
        
        menuList.forEach((item) => {
            if(item.menuType===1 && item.menuState===1){
                if(item.buttons){
                    return treeList.push(getItem(item.menuName,item.path,item.icon)) 
                }
                treeList.push(getItem(item.menuName,item.path,item.icon,getTreeMenu(item.children||[],[] ))) 
            }
        });
        return treeList
    };
    useEffect(() => {
       const treeMenu=getTreeMenu(data.menuList) 
       setMenuList(treeMenu)
    },[])
    return (
        <div className={styles.navSide}>
            <div className={styles.logo}>
                <img src="/imgs/logo.png" className={styles.img} />
                {collapsed?'':<span>中台系统</span>}
            </div>
            <Menu
                theme={isDark? 'dark' : 'light'}
                onClick={onClick}
                // style={{ width: 256 }}
                defaultOpenKeys={['sub1']}
                selectedKeys={[current]}
                mode="inline"
                items={menuList}
                style={{
                    height: '100%',
                    backgroundColor: 'var(--dark-home-bg-color)',
                    color:'var(--dark-color)'
                }}
            />
        </div>
    );
};

export default SiderMenu;
