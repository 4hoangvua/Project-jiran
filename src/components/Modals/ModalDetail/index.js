import React, { useEffect, useRef, useState } from "react";
import {
  Col,
  Modal,
  Row,
  Typography,
  Select,
  Tag,
  Avatar,
  Popover,
  AutoComplete,
  Space,
  InputNumber,
  Slider,
  Button,
  Comment,
  Form,
  Input,
  List,
  Dropdown,
  Menu,
} from "antd";
import {
  CreditCardOutlined,
  OrderedListOutlined,
  UserOutlined,
  PlusOutlined,
  ThunderboltOutlined,
  NotificationOutlined,
  ClockCircleOutlined,
  UnorderedListOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import HTMLReactParser from "html-react-parser";

import { useDispatch, useSelector } from "react-redux";
import {
  addUserMember,
  deleteComment,
  getAllPriority,
  getAllStatus,
  getAllTaskType,
  insertComment,
  removeUserFromTask,
  updateComment,
  updateDescription,
  updateEstimate,
  updatePriority,
  updateStatus,
  updateTask,
  updateTimeTracking,
} from "~/reducers/projectDetail";
import { Editor } from "@tinymce/tinymce-react";
const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

const ModalDetail = ({ visible, setVisible }) => {
  const { taskDetail, allPriority, taskType, allStatus, projectDetail } =
    useSelector((state) => state.proDetail);
  const { userInfo } = useSelector((state) => state.log);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsTime({
      timeTrackingSpent: taskDetail.timeTrackingSpent,
      timeTrackingRemaining: taskDetail.timeTrackingRemaining,
    });
  }, [taskDetail]);
  const [IsComment, setIsComment] = useState(true);
  const desRef = useRef(taskDetail.description);
  const estiRef = useRef(false);
  const [isTime, setIsTime] = useState({});
  const [isDescription, setIsDescription] = useState();
  const [isCommentUser, setIsCommentUser] = useState(true);
  const handleComment = (evt) => {
    setIsComment(!IsComment);
    evt.stopPropagation();
  };
  const handleCommentUser = () => {
    setIsCommentUser(!isCommentUser);
  };

  const preventDefault = (e, id) => {
    dispatch(
      removeUserFromTask({
        taskId: taskDetail.taskId,
        userId: id,
        projectId: taskDetail.projectId,
      })
    );
  };

  useEffect(() => {
    dispatch(getAllTaskType());
    dispatch(getAllPriority());
    dispatch(getAllStatus());
  }, []);
  const handleClose = () => {
    setVisible(false);
  };
  const TitleDetail = () => {
    return (
      <Row>
        <Col span={1}>
          <CreditCardOutlined className="fs-4" />
        </Col>
        <Col span={23}>
          <Title level={5}>{taskDetail.taskName}</Title>
        </Col>
        <small>
          in list{" "}
          <Text underline>
            {allStatus[Number(taskDetail.statusId) - 1].statusName}{" "}
          </Text>
        </small>
      </Row>
    );
  };

  const handleDes = (evt) => {
    evt.stopPropagation();
    setIsDescription(!isDescription);
  };
  return (
    <>
      {visible ? (
        <Modal
          title={<TitleDetail />}
          centered
          visible={visible}
          onOk={handleClose}
          onCancel={handleClose}
          width={800}
          footer={null}
        >
          <Row
            gutter={8}
            onClick={() => {
              setIsComment(true);
              setIsDescription(false);
            }}
          >
            <Col span={16}>
              <Row>
                <Col span={1}>
                  <UnorderedListOutlined />
                </Col>
                <Col span={23}>
                  <Title className="text-secondary" level={5}>
                    Description:
                  </Title>
                </Col>
              </Row>
              <Row>
                <Col span={23}>
                  {taskDetail.description && isDescription ? (
                    <>
                      <Editor
                        initialValue={taskDetail.description}
                        init={{
                          height: 200,
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
                          desRef.current = content;
                        }}
                      />
                      <Button
                        size="small"
                        type="primary"
                        className="mt-2 mb-2"
                        onClick={(evt) => {
                          dispatch(
                            updateDescription({
                              taskId: taskDetail.taskId,
                              description: desRef.current,
                              projectId: taskDetail.projectId,
                            })
                          );
                          handleDes(evt);
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        size="small"
                        className="mt-2 mb-2"
                        onClick={() => setIsDescription(false)}
                      >
                        Came
                      </Button>
                    </>
                  ) : (
                    <>
                      {taskDetail.description ? (
                        <div onClick={handleDes} role="button">
                          {HTMLReactParser(taskDetail.description)}
                        </div>
                      ) : (
                        <Input
                          placeholder="Add more detail description..."
                          onClick={handleDes}
                        />
                      )}
                    </>
                  )}
                </Col>
              </Row>
              <Row>
                <Col span={1}>
                  <CommentOutlined />
                </Col>
                <Col span={23}>
                  <Title className="text-secondary" level={5}>
                    Comment:
                  </Title>
                </Col>
              </Row>
              <Row onClick={() => setIsComment(true)}>
                <Comment
                  author={<a>{taskDetail.name}</a>}
                  avatar={<Avatar src={userInfo.avatar} alt={userInfo.name} />}
                  content={
                    IsComment ? (
                      <Input
                        onClick={handleComment}
                        placeholder="Write a comment..."
                      />
                    ) : (
                      <>
                        <Editor
                          initialValue={""}
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
                            desRef.current = content;
                          }}
                        />
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => {
                            dispatch(
                              insertComment({
                                taskId: taskDetail.taskId,
                                contentComment: desRef.current,
                              })
                            );
                          }}
                        >
                          Save
                        </Button>
                        <Button size="small" onClick={handleComment}>
                          Cancel
                        </Button>
                      </>
                    )
                  }
                >
                  {taskDetail.lstComment.map((userComment, index) => {
                    return (
                      <Comment
                        key={index}
                        actions={
                          isCommentUser
                            ? [
                                <Text
                                  strong
                                  underline
                                  key="comment-nested-reply-to"
                                  onClick={handleCommentUser}
                                >
                                  Edit
                                </Text>,
                                <Text
                                  type="danger"
                                  underline
                                  key="comment-nested-reply-to"
                                  onClick={() => {
                                    dispatch(
                                      deleteComment({
                                        idComment: userComment.id,
                                        taskId: taskDetail.taskId,
                                      })
                                    );
                                  }}
                                >
                                  Delete
                                </Text>,
                              ]
                            : []
                        }
                        author={<a>{userComment.name}</a>}
                        avatar={
                          <Avatar
                            src={userComment.avatar}
                            alt={userComment.name}
                          />
                        }
                        content={
                          isCommentUser ? (
                            <Space>
                              {HTMLReactParser(userComment.commentContent)}
                            </Space>
                          ) : (
                            <>
                              <Editor
                                initialValue={userComment.commentContent}
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
                                  desRef.current = content;
                                }}
                              />
                              <Button
                                size="small"
                                type="primary"
                                onClick={() => {
                                  dispatch(
                                    updateComment({
                                      id: userComment.id,
                                      taskId: taskDetail.taskId,
                                      contentComment: desRef.current,
                                    })
                                  );
                                  handleCommentUser();
                                }}
                              >
                                Save
                              </Button>
                              <Button size="small" onClick={handleCommentUser}>
                                Cancel
                              </Button>
                            </>
                          )
                        }
                      />
                    );
                  })}
                </Comment>
              </Row>
            </Col>
            <Col span={8}>
              <Tag color="processing" icon={<OrderedListOutlined />}>
                Status:
              </Tag>
              <Row className="mt-2 mb-2">
                <Select
                  value={taskDetail.statusId}
                  className="w-100"
                  onChange={(statusId, option) => {
                    dispatch(
                      updateStatus({
                        taskId: taskDetail.taskId,
                        statusId: statusId,
                        projectId: taskDetail.projectId,
                      })
                    );
                  }}
                >
                  {allStatus.map((status, index) => {
                    return (
                      <Option key={index} value={status.statusId}>
                        {status.statusName}
                      </Option>
                    );
                  })}
                </Select>
              </Row>
              <Tag color="geekblue" icon={<UserOutlined />}>
                Assigness:
              </Tag>
              <Row className="mt-2 mb-2">
                {taskDetail.assigness.map((member, index) => {
                  return (
                    <Col span={12} key={index}>
                      <Tag
                        closable
                        onClose={(e) => preventDefault(e, member.id)}
                        key={member.id}
                      >
                        <Avatar src={member.avatar} />
                        {member.name}
                      </Tag>
                    </Col>
                  );
                })}

                <Dropdown
                  className="mt-2"
                  overlay={
                    <Menu
                      onClick={({ key }) => {
                        let userSelected = projectDetail.members.find(
                          (mem) => mem.userId === Number(key)
                        );
                        userSelected = {
                          ...userSelected,
                          id: userSelected.userId,
                        };
                        let listUserAsign = [
                          ...taskDetail.assigness,
                          userSelected,
                        ];
                        listUserAsign = listUserAsign.map((user) => user.id);
                        dispatch(
                          updateTask({
                            ...taskDetail,
                            listUserAsign,
                          })
                        );
                      }}
                      items={projectDetail.members
                        ?.filter((mem) => {
                          let index = taskDetail.assigness?.findIndex(
                            (user) => user.id === mem.userId
                          );
                          if (index === -1) return true;
                          return false;
                        })
                        .map((item) => {
                          return { key: item.userId, label: item.name };
                        })}
                    ></Menu>
                  }
                  trigger={["click"]}
                >
                  <Tag className="site-tag-plus" type="button">
                    <PlusOutlined /> Add member
                  </Tag>
                </Dropdown>
              </Row>
              <Row gutter={32} className="mt-2 mb-2">
                <Col span={12}>
                  <Tag color="purple" icon={<ThunderboltOutlined />}>
                    Priority:
                  </Tag>
                  <Select
                    value={taskDetail.priorityTask.priorityId}
                    className="w-100 mt-2"
                    onChange={(priorityId) => {
                      dispatch(
                        updatePriority({
                          taskId: taskDetail.taskId,
                          priorityId: priorityId,
                          projectId: taskDetail.projectId,
                        })
                      );
                    }}
                  >
                    {allPriority.map((priority, index) => {
                      return (
                        <Option key={index} value={priority.priorityId}>
                          {priority.priority}
                        </Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col span={12}>
                  <Tag
                    className="text-end"
                    color="volcano"
                    icon={<NotificationOutlined />}
                  >
                    Task type:
                  </Tag>
                  <Select
                    value={taskDetail.taskTypeDetail.id}
                    className="w-100 mt-2"
                    onChange={(value) => {
                      dispatch(updateTask({ ...taskDetail, typeId: value }));
                    }}
                  >
                    {taskType.map((type, index) => {
                      return (
                        <Option key={index} value={type.id}>
                          {type.taskType}
                        </Option>
                      );
                    })}
                  </Select>
                </Col>
              </Row>
              <Row>
                <Tag color="warning" icon={<ClockCircleOutlined />}>
                  OriginalEstimate:
                </Tag>
                <InputNumber
                  min={0}
                  type="number"
                  value={taskDetail.originalEstimate}
                  onChange={(value) => {
                    if (value) {
                      if (estiRef.current) {
                        clearTimeout(estiRef.current);
                      }
                      estiRef.current = setTimeout(() => {
                        dispatch(
                          updateEstimate({
                            taskId: taskDetail.taskId,
                            originalEstimate: value,
                            projectId: taskDetail.projectId,
                          })
                        );
                      }, 300);
                    }
                  }}
                />
              </Row>
              <Row className="mt-2 mb-2">
                <Slider
                  value={isTime.timeTrackingSpent}
                  max={
                    Number(isTime.timeTrackingSpent) +
                    Number(isTime.timeTrackingRemaining)
                  }
                  className="w-100"
                />
              </Row>
              <Row gutter={32} className="mb-2">
                <Col span={12}>
                  <Tag color="magenta" icon={<ClockCircleOutlined />}>
                    Time spend:
                  </Tag>
                  <InputNumber
                    value={isTime.timeTrackingSpent}
                    min={0}
                    type="number"
                    className="w-100 mt-2"
                    onChange={(value) => {
                      if (value) {
                        setIsTime((time) => ({
                          ...time,
                          timeTrackingSpent: value,
                        }));
                      }
                    }}
                  />
                </Col>
                <Col span={12}>
                  <Tag color="magenta">Remaining:</Tag>
                  <InputNumber
                    value={isTime.timeTrackingRemaining}
                    min={0}
                    type="number"
                    className="w-100 mt-2"
                    onChange={(value) => {
                      if (value) {
                        setIsTime((time) => ({
                          ...time,
                          timeTrackingRemaining: value,
                        }));
                      }
                    }}
                  />
                </Col>
              </Row>
              <Col span={12}>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    dispatch(
                      updateTimeTracking({
                        taskId: taskDetail.taskId,
                        timeTrackingSpent: isTime.timeTrackingSpent,
                        timeTrackingRemaining: isTime.timeTrackingRemaining,
                        projectId: taskDetail.projectId,
                      })
                    );
                  }}
                >
                  Save
                </Button>
              </Col>
            </Col>
          </Row>
        </Modal>
      ) : null}
    </>
  );
};

export default ModalDetail;
