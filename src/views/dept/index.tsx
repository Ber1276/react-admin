import { useState, useEffect, useRef } from 'react';
import { IDeptItem } from '../../types/api';
import { Button, Table, Space, Modal, message, Form, Input } from 'antd';
import type { TableColumnsType } from 'antd';
import { formatDate } from '../../utils';
import api from '../../api/index';
import CreateDept from './CreateDept';
export default function DeptList() {
    const [data, setData] = useState<IDeptItem[]>([]);
    const deptRef = useRef<{
        openModal: (type: 'create' | 'edit', data?: IDeptItem | { parentId: string }) => void;
    }>({openModal: () => {}});
    const [form] = Form.useForm();
    // 初始化 调用ajax获取数据
    useEffect(() => {
        getDeptList();
    }, []);

    // 获取部门列表
    const getDeptList = async () => {
        const data = await api.getDeptList(form.getFieldsValue());
        setData(data as unknown as IDeptItem[]);
    };
    const columns: TableColumnsType<IDeptItem> = [
        {
            title: '部门名称',
            dataIndex: 'deptName',
            key: 'deptName',
            width: 200,
        },
        {
            title: '负责人',
            dataIndex: 'userName',
            key: 'userName',
            width: 150,
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            render: (text) => {
                return formatDate(text);
            },
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render(createTime) {
                return formatDate(createTime);
            },
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render: (_, record) => {
                return (
                    <Space>
                        <Button type="primary" onClick={() => handleSubCreate(record._id)}>
                            新增
                        </Button>
                        <Button type="primary" onClick={() => handleEdit(record)}>
                            编辑
                        </Button>
                        <Button
                            danger
                            onClick={() => {
                                handlerDel(record._id);
                            }}
                        >
                            删除
                        </Button>
                    </Space>
                );
            },
        },
    ];
    const handleSubCreate = (id: string) => {
        // 弹框 新增
        deptRef.current?.openModal('create', { parentId: id });
    };
    const handleEdit = (record: IDeptItem) => {
        // 弹框 编辑
        deptRef.current?.openModal('edit', record);
    };
    const handlerDel = async (id: string) => {
        // 弹框 确认删除
        Modal.confirm({
            title: '确认删除',
            content: '确定删除该部门吗？',
            onOk() {
                handleDelSubmit(id);
            },
        });
    };
    const handleDelSubmit = async (id: string) => {
        await api.delDept({ _id: id });
        message.success('删除成功');
        getDeptList();
    };
    // 重置
    const handleReset = () => {
        form.resetFields();
    };
    const handleCreate = () => {
        // 弹框 新增
        deptRef.current?.openModal('create');
    };
    return (
        <div>
            <Form className="search-form" layout="inline" form={form}>
                <Form.Item name="deptName" label="部门名称">
                    <Input placeholder="请输入部门名称" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="mr10" onClick={getDeptList}>
                        搜索
                    </Button>
                    <Button htmlType="button" onClick={handleReset}>
                        重置
                    </Button>
                </Form.Item>
            </Form>
            <div className="wrap-table">
                <div className="header">
                    <div className="title">部门列表</div>
                    <div className="action">
                        <Button type="primary" onClick={handleCreate}>
                            添加
                        </Button>
                    </div>
                </div>
                <Table bordered rowKey="_id" columns={columns} dataSource={data} pagination={false}></Table>
            </div>
            <CreateDept mref={deptRef} update={getDeptList}></CreateDept> 
        </div>
    );
}
