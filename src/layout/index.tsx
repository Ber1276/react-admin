import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import styles from './index.module.less';
import { Layout } from 'antd';
const { Sider } = Layout;
import Footer from './footer/index';
import NavHeader from './header/index';
import SiderMenu from './menu/index';
import { useStore } from '../store/index';
import api from '../api';
const LayoutContainer: React.FC = () => {
    const { collapsed, updateUserInfo } = useStore();

    // 获取用户信息
    useEffect(() => {
        getUserInfo();
    }, []);
    const getUserInfo = async () => {
        const data = await api.getUserInfo();
        updateUserInfo(data);
    };
    // 权限判断
    return (
        <Layout>
            <Sider collapsed={collapsed}>
                <SiderMenu />
            </Sider>
            <Layout>
                <NavHeader />
                {/* <TabsFC /> */}
                <div className={styles.content}>
                    <Outlet></Outlet>
                </div>
                <Footer />
            </Layout>
        </Layout>
    );
};
export default LayoutContainer;
