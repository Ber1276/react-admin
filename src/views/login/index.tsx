import { Form, Input,Button } from "antd"
import styles from "./index.module.less"
import api from "../../api/index"
import type { ILoginData } from "../../types"
import storage from "../../utils/storage"
const Login = () => {
    const onFinish = async (values: ILoginData) => {
        const token=await api.login(values)
        storage.set("token",token) 
    }

    return (
        <div className={styles.login}>
            <div className={styles.loginWrapper}>
                <div className={styles.title}>系统登陆</div>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" block>
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}

export default Login