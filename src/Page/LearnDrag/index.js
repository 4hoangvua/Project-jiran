import React, { useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import "./DemoDrag.css";
const defaultTask = [
  { id: 1, taskName: "task 1" },
  { id: 2, taskName: "task 2" },
  { id: 3, taskName: "task 3" },
  { id: 4, taskName: "task 4" },
  { id: 5, taskName: "task 5" },
  { id: 6, taskName: "task 6" },
];

const Drag = () => {
  const [propsSpring, set, top] = useSpring(() => ({
    from: { bottom: -25 },
    config: { duration: 1000 },
    to: { bottom: 0 },
    reset: true,
  }));
  const tagRef = useRef({});
  const tagDragEnterRef = useRef();
  const handleDragStart = (e, task) => {
    tagRef.current = task;
  };
  const handleEnter = (e, taskEnter) => {
    set({ bottom: 0 });
    tagDragEnterRef.current = taskEnter.id;
    let taskListUpdate = [...taskList];
    let indexDrag = taskListUpdate.findIndex(
      (task) => task.id === tagRef.current.id
    );
    let indexDragEnter = taskListUpdate.findIndex(
      (task) => task.id === taskEnter.id
    );
    let tmp = taskListUpdate[indexDrag];
    taskListUpdate[indexDrag] = taskListUpdate[indexDragEnter];
    taskListUpdate[indexDragEnter] = tmp;
    settaskList(taskListUpdate);
  };
  const handleEnd = (e) => {
    tagRef.current = {};
    settaskList([...taskList]);
  };
  const handleDrop = (e) => {
    console.log("drop:", e.target);
  };
  const [taskList, settaskList] = useState(defaultTask);
  return (
    <div
      className="container"
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDrop={(e) => {
        tagRef.current = {};
        settaskList([...taskList]);
      }}
    >
      <div className="text-center display-4">Task List</div>
      <div className="row">
        <div className="col-2"></div>

        <div className="bg-dark p-5 col-8">
          {taskList.map((task, index) => {
            if (task.id === tagDragEnterRef.current) {
              return (
                <animated.div
                  style={{
                    position: "relative",
                    bottom: propsSpring.bottom.to((num) => `${num}px`),
                  }}
                  key={index}
                  draggable={true}
                  className={`bg-success text-white m-1 p-3`}
                  onDragStartCapture={(e) => {
                    handleDragStart(e, task);
                  }}
                  onDragEnter={(e) => {
                    handleEnter(e, task);
                  }}
                  onDragEnd={handleEnd}
                >
                  {task.taskName}
                </animated.div>
              );
            }
            return (
              <div
                key={index}
                draggable={true}
                className={`bg-success text-white m-1 p-3 ${
                  task.id === tagRef.current.id ? "dragTag" : ""
                }`}
                onDragStartCapture={(e) => {
                  handleDragStart(e, task);
                }}
                onDragEnter={(e) => {
                  handleEnter(e, task);
                }}
                onDragEnd={handleEnd}
              >
                {task.taskName}
              </div>
            );
          })}
        </div>
        <div
          className="col-20 bg-primary"
          style={{ height: "500px" }}
          //   draggable={true}
          //   onDragOver={(e) => {
          //     e.stopPropagation();
          //     e.preventDefault();
          //   }}
          //   onDrop={(e) => handleDrop(e)}
        >
          4hoangvua la tao
        </div>
      </div>
    </div>
  );
};

export default Drag;
