import React, { useState } from "react";
import {
  message,
  Button,
  Form,
  Input,
  Typography,
} from "antd";
import Axios from "axios";

const ChangePassword = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [objectData, setObjectData] = useState({current_password: "", new_password: "", new_confirm_password: ""})

  const formItemLayout = {
    labelAlign: "left",
    labelCol: { span: 4, offset: 3 },
    wrapperCol: { span: 14 },
  };

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 7 },
  };

  const handleReset = () => {
    setObjectData({...objectData,
        current_password: "", new_password: "", new_confirm_password: ""
    });
    setTimeout(() => form.resetFields(), 100);
  };

  const handleSubmit = (val) => {
      Axios.post(`/change-password`, val)
        .then((res) => {
          if (res.status === 200) {
            message.success("Success! Password has been changed");
            setTimeout(() => {
              handleReset()
            }, 100);
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
  };

  return (
    <>
      <Title level={3} style={{ textAlign: "center" }}>
        Change Password
      </Title>
      <Form
        form={form}
        {...formItemLayout}
        name="changePwd-form"
        initialValues={objectData}
        onFinish={handleSubmit}
      >
        <Form.Item name="current_password" label="Current Password" rules={[{ required: true, message: "Current Password is required" }]}>
          <Input type="password" />
        </Form.Item>
        <Form.Item name="new_password" label="New Password" rules={[{ required: true, message: "New Password is required" }]}>
          <Input type="password" />
        </Form.Item>
        <Form.Item name="new_confirm_password" label="Confirm New Password" rules={[{ required: true, message: "Confirm New Password is required" }]}>
        <Input type="password" />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            htmlType="reset"
            onClick={handleReset}
            style={{ marginLeft: "8px" }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChangePassword;
