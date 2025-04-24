import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import styles from './index.module.less';
import { Layout } from 'antd';
const { Sider, Footer,Content } = Layout;
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
        <Layout style={{height:'100vh'}}>
            <Sider collapsed={collapsed} style={{height:'100vh'}}>
                <SiderMenu />
            </Sider>
            <Layout>
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
        </Layout>
    );
};
export default LayoutContainer;
