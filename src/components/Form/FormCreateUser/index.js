import { Button, Form, Input, Space } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "~/reducers/login";
import { submitModal } from "~/reducers/modal";

const FormCreateUser = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(submitModal({ submitFunction: onFinish }));
    form.setFieldsValue({
      id: "",
      passWord: "",
      email: "",
      name: "",
      phoneNumber: "",
    });
  }, []);
  const onFinish = (value) => {
    if (!value) form.submit();
    else dispatch(registerUser(form.getFieldsValue(true)));
  };

  const onReset = () => {
    form.resetFields();
  };
  const validateMessages = {
    required: "Please input your ${label}.",
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
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                "At least one lowercase character, one number and 8 character No .*?",
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
              pattern: /^(?:\d*)$/,
              message: "Value should contain just number",
            },
            {
              min: 10,
              message: "At least 10 number",
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
        </Form.Item>
      </Form>
    </Space>
  );
};

export default FormCreateUser;
