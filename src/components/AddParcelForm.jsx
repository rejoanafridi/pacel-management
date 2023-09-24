/* eslint-disable react/prop-types */
import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const AddParcelForm = ({ visible, onCancel, onAddParcel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Handle form submission and send POST request to API
    onAddParcel(values);
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      title='Add Parcel'
      onCancel={onCancel}
      footer={null}>
      <Form form={form} name='addParcelForm' onFinish={onFinish}>
        <Form.Item
          name='recipientName'
          label='Recipient Name'
          rules={[
            { required: true, message: 'Please enter the recipient name' },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='recipientPhone'
          label='Recipient Phone'
          rules={[
            {
              required: true,
              message: 'Please enter the recipient phone number',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button className='bg-blue-500' type='primary' htmlType='submit'>
              Add Parcel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddParcelForm;
