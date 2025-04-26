import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useRouteLoaderData } from 'react-router';
import styles from './index.module.less';
import { Layout, Watermark } from 'antd';
const { Sider, Footer,Content } = Layout;
import NavHeader from './header/index';
import SiderMenu from './menu/index';
import { useStore } from '../store/index';
import api from '../api';
import { searchRoute } from '../utils';
import {router} from '../router';
import { IUserItem } from '../types/api';
const LayoutContainer: React.FC = () => {
    const { collapsed, updateUserInfo } = useStore();

    // 获取用户信息
    useEffect(() => {
        getUserInfo();
    }, []);
    const getUserInfo = async () => {
        const data = await api.getUserInfo() as unknown as IUserItem;
        updateUserInfo(data); 
    };
    // 权限判断 
    const {menuPathList}=useRouteLoaderData('layout')
    const {pathname}=useLocation()
    const staticPathList=['/login','/404','/403','/welcome']
    const route=searchRoute(pathname,router)
    console.log('route',route);
    if(route?.meta?.requireAuth && !localStorage.getItem('token')){
        return <Navigate to="/login" />
    }
    
    if(!menuPathList.includes(pathname) && !staticPathList.includes(pathname)){
        return <Navigate to="/403" />
    }
    return (
        
        <Layout>
            <Sider collapsed={collapsed} >
                <SiderMenu />
            </Sider>
            <Watermark content="bai1276">
            <Layout style={{height:'100vh',width: collapsed ? 'calc(100vw - 80px)' : 'calc(100vw - 200px)'}}>
                <NavHeader />
                <Content className={styles.content}>
                    <Outlet></Outlet>
                </Content>
                <Footer className={styles.footer}>
                    <div >
                        <div>
                            <a>管理平台</a>
                        </div>
                        <div>Copyright All Rights Reserved.</div>
                    </div>
                </Footer>
            </Layout>
            </Watermark>
        </Layout>
        
    );
};
export default LayoutContainer;