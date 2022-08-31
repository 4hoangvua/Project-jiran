import { Button, Form, Input, Space } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "~/reducers/login";
import { submitModal } from "~/reducers/modal";

const FormEditUser = ({ user }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(submitModal({ submitFunction: onFinish }));
    form.setFieldsValue({
      id: user.userId.toString(),
      passWord: "",
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
    });
  }, []);
  const onFinish = (value) => {
    if (!value) form.submit();
    else dispatch(editUser(form.getFieldsValue(true)));
  };

  const onReset = () => {
    form.resetFields();
  };
  const validateMessages = {
    required: "Please input your ${label}.",
  };
  const onAgain = () => {
    form.setFieldsValue({
      id: user.userId.toString(),
      passWord: "",
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
    });
  };
  return (
    <Space className="d-flex justify-content-center mt-4">
      <Form
        validateMessages={validateMessages}
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ width: 250 }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
            {
              pattern:
                /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9 ]{2,}$/,
              message: "Name is not valid",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
            },
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="passWord"
          label="PassWord"
          rules={[
            {
              required: true,
            },
            {
              pattern: /^[a-zA-Z0-9]+$/,
              message: "No .*?",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
            {
              pattern: /^[0-9]+$/,
              message: "Only number.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item className="text-start">
          <Button
            type="primary"
            htmlType="button"
            onClick={onReset}
            className="me-2"
          >
            Reset
          </Button>
          <Button htmlType="button" onClick={onAgain}>
            Again
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default FormEditUser;
