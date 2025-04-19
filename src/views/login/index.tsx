import { Form, Input,Button } from "antd"
import "./index.less"

const Login = () => {


    return (
        <div className="login">
            <div className="login-wrapper">
                <div className="title">系统登陆</div>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    autoComplete="off"
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