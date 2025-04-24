import  { useState } from 'react';
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
import { useNavigate } from 'react-router';
import { useStore } from '../../store';
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
    {
        key: '/dashboard',
        icon: <HomeOutlined />,
        label: 'Dashboard',
    },
    {
        key: '/user',
        label: '用户模块',
        icon: <UsergroupDeleteOutlined />,
        children: [
            { key: '/userList', label: '用户列表', icon: <UserOutlined /> },
            { key: '/menuList', label: '菜单管理', icon: <MailOutlined /> },
            { key: '/roleList', label: '角色管理', icon: <SolutionOutlined /> },
            { key: '/deptList', label: '部门管理', icon: <LaptopOutlined /> },
        ],
    },
];

const SiderMenu = () => {
    // const [theme, setTheme] = useState<MenuTheme>('dark');
    const [current, setCurrent] = useState('1');
    // const changeTheme = (value: boolean) => {
    //     setTheme(value ? 'dark' : 'light');
    // };
    const {  collapsed, isDark } = useStore();
    const navigate = useNavigate();
    const onClick: MenuProps['onClick'] = ({ key }: { key: string }) => {
        console.log('click ', key);
        setCurrent(key);
        navigate(key);
    };
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
                items={items}
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
