import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import api from '../../api/index';
import { ILogin } from '../../types/api';
// import './index.module.less';
import styles from './index.module.less';
export default function Login() {
    const [loading, setLoading] = useState(false);
    const onFinish = async (values: ILogin) => {
        setLoading(true);
        const data = await api.login(values);
        setLoading(false);
        console.log('onFinish', data.data);
        // cookie 存储在localStorage中
        localStorage.setItem('token', data.data);
        const params = new URLSearchParams(location.search);
        console.log('params', params);
        if (params.get('redirect')) {
            location.href = params.get('redirect') as string;
        } else {
            location.href = '/';
        }
    };
    return (
        // 看文档 直接copy
        <div className={styles.login}>
            <div className={styles.loginWrapper}>
                <div className={styles.title}>系统登录</div>
                <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
