import { Modal, Form, Input, Select, TreeSelect, message } from 'antd';
import { useState, useImperativeHandle, useEffect, RefObject } from 'react';
import { IDeptItem, IUserItem } from '../../types/api';
import api from '../../api/index';
interface IProps {
    mref:RefObject<{openModal:(type: 'create' | 'edit', data?: { parentId: string })=> void}>;
    update: () => void;
}
export default function CreateDept(props: IProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deptList, setDeptList] = useState<IDeptItem[]>([]);
    const [userList, setUserList] = useState<IUserItem[]>([]);
    const [action, setAction] = useState<'create' | 'edit'>('create');
    const [form] = Form.useForm();

    useEffect(() => {
        getAllUserList();
    }, []);
    // 初始化 调用ajax获取部门数据
    const getDeptList = async () => {
        const data = await api.getDeptList();
        setDeptList(data as unknown as IDeptItem[]);
    };
    // 初始化 调用ajax获取用户数据
    const getAllUserList = async () => {
        const data = await api.getAllUserList();
        setUserList(data as unknown as IUserItem[]);
    };
    const handleOk = async () => {
        const valid = await form.validateFields();
        if (valid) {
            if (action === 'create') {
                await api.createDept(form.getFieldsValue());
                message.success('创建成功');
            } else if (action === 'edit') {
                await api.updateDept(form.getFieldsValue());
                message.success('更新成功');
            }
            handleCancel();
            props.update();
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const openModal = (type: 'create' | 'edit', data?: { parentId: string }) => {
        setAction(type);
        setIsModalOpen(true); 
        getDeptList();
        console.log(data);
        if (data) {
            form.setFieldsValue(data);
        }
    };
    useImperativeHandle(props.mref, () => ({
        openModal 
    }));
    return (
        <Modal title="创建部门" open={isModalOpen} width={800} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} labelAlign="right" labelCol={{ span: 4 }}>
                <Form.Item label="部门ID" hidden name="_id"></Form.Item>
                <Form.Item label="上级部门" name="parentId">
                    <TreeSelect
                        placeholder="请选择上级部门"
                        allowClear
                        treeDefaultExpandAll
                        treeData={deptList}
                        fieldNames={{ label: 'deptName', value: '_id' }}
                    ></TreeSelect>
                </Form.Item>
                <Form.Item label="部门名称" name="deptName" rules={[{ required: true, message: '请输入部门名称' }]}>
                    <Input placeholder="请输入部门名称" />
                </Form.Item>
                <Form.Item label="负责人" name="userName" rules={[{ required: true, message: '请输入选择负责人' }]}>
                    <Select>
                        {userList.map((item) => {
                            return (
                                <Select.Option key={item._id} value={item.userName}>
                                    {item.userName}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}
