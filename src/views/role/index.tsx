import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import roleApi from '../../api/roleApi';
import { IRole, IRoleCreateParams, IRoleEditParams, IRoleSearchParams } from '../../types/api';

const RoleList: React.FC = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [currentRoleId, setCurrentRoleId] = useState('');

  const fetchRoleList = async () => {
    setLoading(true);
    try {
      const params: IRoleSearchParams = { pageNum: 1, pageSize: 10 };
      const response = await roleApi.getRoleList(params) as unknown as { list: IRole[]};
      setRoles(response.list);
    } catch (error) {
      message.error('获取角色列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoleList();
  }, []);

  const handleCreate = () => {
    setIsEdit(false);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: IRole) => {
    setIsEdit(true);
    setCurrentRoleId(record._id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await roleApi.deleteRole({ _id: id });
      message.success('删除角色成功');
      fetchRoleList();
    } catch (error) {
      message.error('删除角色失败');
    }
  };

  const handleSubmit = async (values: IRoleCreateParams | IRoleEditParams) => {
    try {
      if (isEdit) {
        await roleApi.updateRole({ ...values, _id: currentRoleId } as IRoleEditParams);
        message.success('更新角色成功');
      } else {
        await roleApi.createRole(values as IRoleCreateParams);
        message.success('创建角色成功');
      }
      setModalVisible(false);
      fetchRoleList();
    } catch (error) {
      message.error(isEdit ? '更新角色失败' : '创建角色失败');
    }
  };

  const columns = [
    { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
    { title: '备注', dataIndex: 'remark', key: 'remark' },
    { 
      title: '操作',
      key: 'action',
      render: (_:any, record: IRole) => (
        <> 
          <Button onClick={() => handleEdit(record)}>编辑</Button>
          <Button onClick={() => handleDelete(record._id)} danger>删除</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={handleCreate} type="primary" style={{ marginBottom: 16 }}>
        创建角色
      </Button>
      <Table columns={columns} dataSource={roles} loading={loading} />
      <Modal
        title={isEdit ? '编辑角色' : '创建角色'}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="roleName" label="角色名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="remark" label="备注">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEdit ? '更新' : '创建'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleList;