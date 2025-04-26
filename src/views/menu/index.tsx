import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import api from '../../api/index';
import { IMenu } from '../../types/api';

export default function MenuList() {
  const [menuList, setMenuList] = useState<IMenu[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState('');

  useEffect(() => {
    fetchMenuList();
  }, []);

  const fetchMenuList = async () => {
    try {
      const response = await api.getMenuList() as unknown as IMenu[];
      setMenuList(response);
    } catch (error) {
      console.error('获取菜单列表失败:', error);
    }
  };

  const handleEdit = (record:string) => {
    form.setFieldsValue(record);
    setIsEditModalVisible(true);
  };

  const handleCreate = () => {
    form.resetFields();
    setIsCreateModalVisible(true);
  };

  const handleDelete = (record: string) => {
    setDeleteRecordId(record);
    setIsDeleteModalVisible(true);
  };

  const handleOk = async (values:any) => {
    try {
      if (form.getFieldValue('_id')) {
        await api.postEditMenu(values);
        setIsEditModalVisible(false);
      } else {
        await api.postCreateMenu(values);
        setIsCreateModalVisible(false);
      }
      fetchMenuList();
    } catch (error) {
      console.error('保存菜单失败:', error);
    }
  };
  const handleDeleteConfirm = async () => {
    try {
      await api.postDeleteMenu({ _id: deleteRecordId });
      fetchMenuList();
    } catch (error) {
      console.error('删除菜单失败:', error);
    }
    setIsDeleteModalVisible(false);
  };

  const columns = [
    { title: '菜单名称', dataIndex: 'menuName', key: 'name' },
    { title: '操作', key: 'action',dataIndex:'_id', render: (record:string) => (
      <span>
        <Button onClick={() => handleEdit(record)}>编辑</Button>
        <Button onClick={() => handleDelete(record)}>删除</Button>
      </span>
    )},
  ];

  return (
    <div>
      <Button onClick={handleCreate}>创建菜单</Button>
      <Table columns={columns} dataSource={menuList} />
      <Modal title="创建菜单" visible={isCreateModalVisible} onCancel={() => setIsCreateModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleOk}>
          <Form.Item name="menuName" label="菜单名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="icon" label="菜单图标">
            <Input />
          </Form.Item>
          <Form.Item name="path" label="菜单路径" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="menuType" label="菜单类型" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="menuCode" label="菜单权限标示" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="parentId" label="父级菜单id" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="component" label="组件名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="menuStatus" label="菜单状态" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">保存</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="编辑菜单" visible={isEditModalVisible} onCancel={() => setIsEditModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleOk}>
          <Form.Item name="menuName" label="菜单名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="icon" label="菜单图标">
            <Input />
          </Form.Item>
          <Form.Item name="path" label="菜单路径" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="menuType" label="菜单类型" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="menuCode" label="菜单权限标示" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="parentId" label="父级菜单id" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="component" label="组件名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="menuStatus" label="菜单状态" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">保存</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="确认删除该菜单吗？"
        visible={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>删除后将无法恢复，请谨慎操作。</p>
      </Modal>
    </div>
  );
}

