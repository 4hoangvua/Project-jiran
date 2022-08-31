import React, { useEffect, useState } from "react";
import { Form, Select, Row, InputNumber, Col, Slider, Input } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  getAllPriority,
  getAllStatus,
  getAllTaskType,
} from "~/reducers/projectDetail";
import { getAllProject } from "~/reducers/projectCategory";
import { getUserByProjectId } from "~/reducers/login";
import { submitModal } from "~/reducers/modal";
const { Option } = Select;

const FormAddCardTask = ({ projectId, statusId }) => {
  const { allProject } = useSelector((state) => state.category);
  const { allPriority, taskType, allStatus } = useSelector(
    (state) => state.proDetail
  );
  const { allUserByProject } = useSelector((state) => state.log);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProject());
    dispatch(getAllTaskType());
    dispatch(getAllPriority());
    dispatch(getAllStatus());
    dispatch(submitModal({ submitFunction: onSubmit }));
    dispatch(getUserByProjectId(projectId));
  }, []);
  const [isTime, setisTime] = useState({
    timeTrackingSpent: 5,
    timeTrackingRemaining: 5,
  });
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      listUserAsign: [],
      taskName: "",
      statusId: statusId,
      description: "",
      originalEstimate: 0,
      timeTrackingSpent: isTime.timeTrackingSpent,
      timeTrackingRemaining: isTime.timeTrackingRemaining,
      projectId: projectId,
      typeId: 1,
      priorityId: 1,
    });
  }, []);
  const onSubmit = (value) => {
    if (!value) form.submit();
    else dispatch(createTask(form.getFieldsValue(true)));
  };
  return (
    <Form
      form={form}
      layout="vertical"
      className="p-4"
      style={{ height: "auto" }}
      onFinish={onSubmit}
    >
      <Form.Item
        label="Project:"
        name="projectId"
        rules={[
          {
            required: true,
            message: "Project is required",
          },
        ]}
      >
        <Select
          placeholder="Please select a project"
          onChange={(value) => {
            dispatch(getUserByProjectId(value));
          }}
        >
          {allProject.map((project, index) => {
            return (
              <Option key={index} value={Number(project.id)}>
                {project.projectName}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            label="Task name:"
            name="taskName"
            rules={[
              {
                required: true,
                message: "Task name is required",
              },
            ]}
          >
            <Input type="text" placeholder="Please a name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Status name is required",
              },
            ]}
            label="Status name:"
            name="statusId"
          >
            <Select
              rules={[
                {
                  required: true,
                  message: "Status is required",
                },
              ]}
              placeholder="Please select status"
            >
              {allStatus.map((status, index) => {
                return (
                  <Option key={index} value={status.statusId}>
                    {status.statusName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            label="Priority:"
            name="priorityId"
            rules={[
              {
                required: true,
                message: "Priority is required",
              },
            ]}
          >
            <Select placeholder="Type priority">
              {allPriority.map((priority, index) => {
                return (
                  <Option key={index} value={Number(priority.priorityId)}>
                    {priority.priority}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Task type:"
            name="typeId"
            rules={[
              {
                required: true,
                message: "Task type is required",
              },
            ]}
          >
            <Select
              rules={[
                {
                  required: true,
                  message: "Task type is required",
                },
              ]}
              placeholder="Please select"
            >
              {taskType.map((type, index) => {
                return (
                  <Option key={index} value={type.id}>
                    {type.taskType}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Assigness:"
        name="listUserAsign"
        rules={[
          {
            required: true,
            message: "Assigness is required",
          },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          optionFilterProp="label"
          options={allUserByProject?.map((user) => ({
            label: user.name,
            value: user.userId,
          }))}
        ></Select>
      </Form.Item>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="originalEstimate"
            label="Original Estimate"
            rules={[
              {
                required: true,
                message: "Estimate is required",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Slider
            value={isTime.timeTrackingSpent}
            step={1}
            defaultValue={0}
            max={
              Number(isTime.timeTrackingSpent) +
              Number(isTime.timeTrackingRemaining)
            }
          />
          <Row gutter={8}>
            <Col>
              <Form.Item
                label={<small>Spend( hours)</small>}
                name="timeTrackingSpent"
              >
                <InputNumber
                  // defaultValue={isTime.timeTrackingSpent}
                  min={0}
                  type="number"
                  onChange={(value) => {
                    setisTime({ ...isTime, timeTrackingSpent: value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label={
                  <small className="text-warning">Remaining( hours)</small>
                }
                name="timeTrackingRemaining"
              >
                <InputNumber
                  // defaultValue={isTime.timeTrackingRemaining}
                  min={0}
                  type="number"
                  onChange={(value) => {
                    setisTime({
                      ...isTime,
                      timeTrackingRemaining: value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Form.Item label="Description:">
        <Editor
          initialValue="Any text."
          init={{
            height: 150,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={(content) => {
            form.setFieldValue("description", content);
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default FormAddCardTask;
