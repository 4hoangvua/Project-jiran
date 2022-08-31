import React, { useEffect, useState } from "react";
import { Card, Col, Row, Avatar, Tooltip, Modal, Button, Space } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import ModalDetail from "~/components/Modals/ModalDetail";
import { useDispatch } from "react-redux";
import {
  getAllPriority,
  getTaskDetail,
  removeTask,
  updateStatus,
} from "~/reducers/projectDetail";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FormAddCardTask from "~/components/Form/FormAddCardTask";
import { openModal } from "~/reducers/modal";
const arrPriority = [
  "",
  "text-danger",
  "text-warning",
  "text-info",
  "text-light",
];
const getItemStyle = (isDragging, draggableStyle) => ({
  cursor: isDragging ? "grap" : "pointer",
  ...draggableStyle,
});
const Detail = ({ projectDetail }) => {
  const [visible, setVisible] = useState(false);
  const { lstTask } = projectDetail;
  const dispatch = useDispatch();
  const handleDetail = async (taskId) => {
    try {
      await dispatch(getTaskDetail(taskId)).unwrap();
      setVisible(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEnter = (resault) => {
    dispatch(
      updateStatus({
        taskId: resault.draggableId,
        statusId: resault.destination.droppableId,
        projectId: projectDetail.id,
      })
    );
  };
  return (
    <div className="site-card-wrapper rounded">
      <DragDropContext onDragEnd={handleEnter}>
        <Row gutter={8}>
          {lstTask?.map((task, index) => {
            return (
              <Droppable droppableId={task.statusId} key={index}>
                {(provided) => {
                  return (
                    <Col span={6} className="h-100" key={index}>
                      <Card
                        style={{ background: "#EBECF0" }}
                        key={task.statusId}
                        title={
                          <h6 style={{ fontSize: 12, fontWeight: "bold" }}>
                            {task.statusName}
                          </h6>
                        }
                        bordered={true}
                      >
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {task.lstTaskDeTail?.map((item, index) => {
                            return (
                              <Draggable
                                index={index}
                                draggableId={item.taskId.toString()}
                                key={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      className="bg-light"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                      )}
                                    >
                                      <Card.Grid
                                        style={{ width: "100%" }}
                                        className="border-bottom border-info position-relative"
                                        onClick={() =>
                                          handleDetail(item.taskId)
                                        }
                                      >
                                        <Row gutter={[0, 8]}>
                                          <Col span={20}>
                                            <div className="col-18 text-truncate">
                                              {item.taskName}
                                            </div>
                                          </Col>

                                          <Col
                                            span={8}
                                            className={`${
                                              arrPriority[
                                                item.priorityTask.priorityId
                                              ]
                                            }`}
                                          >
                                            {item.priorityTask.priority}
                                          </Col>
                                          <Col span={8} offset={8}>
                                            <Avatar.Group
                                              size="small"
                                              maxCount={2}
                                              maxStyle={{
                                                color: "#f56a00",
                                                backgroundColor: "#1890ff",
                                              }}
                                            >
                                              <Tooltip
                                                title={<small>Member</small>}
                                                placement="right"
                                              >
                                                {item.assigness.map(
                                                  (member, index) => {
                                                    return (
                                                      <Avatar
                                                        key={index}
                                                        src={member.avatar}
                                                      />
                                                    );
                                                  }
                                                )}
                                              </Tooltip>
                                            </Avatar.Group>
                                          </Col>
                                        </Row>
                                        <Tooltip
                                          placement="right"
                                          title={<small>Delete task</small>}
                                          className="position-absolute top-0 start-100 translate-middle "
                                          type="button"
                                        >
                                          <div
                                            type="button"
                                            className="fs-5 text-danger p-2"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              dispatch(
                                                removeTask({
                                                  taskId: item.taskId,
                                                  projectId: item.projectId,
                                                })
                                              );
                                            }}
                                          >
                                            <CloseCircleOutlined />
                                          </div>
                                        </Tooltip>
                                      </Card.Grid>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          <Draggable draggableId={task.statusId} index={index}>
                            {(provided, snapshot) => {
                              return (
                                <button
                                  onClick={() => {
                                    dispatch(
                                      openModal({
                                        Component: (
                                          <FormAddCardTask
                                            projectId={projectDetail.id}
                                            statusId={task.statusId}
                                          />
                                        ),
                                        title: "Add a Card Task",
                                      })
                                    );
                                  }}
                                  className="w-100 btn btn-primary  text-center mt-2"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  Add a card
                                </button>
                              );
                            }}
                          </Draggable>
                          {provided.placeholder}
                        </div>
                      </Card>
                    </Col>
                  );
                }}
              </Droppable>
            );
          })}
        </Row>
      </DragDropContext>
      <ModalDetail visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default Detail;
