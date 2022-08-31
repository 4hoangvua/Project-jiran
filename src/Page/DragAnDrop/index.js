import React, { useState } from "react";
import _, { drop } from "lodash";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const DragAndDrop = () => {
  const [IsState, setIsState] = useState({
    toDo: {
      id: "toDo",
      items: [
        { id: "1", taskName: "Task 1" },
        { id: "2", taskName: "Task 2" },
        { id: "3", taskName: "Task 3" },
      ],
    },
    inProgress: {
      id: "inProgress",
      items: [
        { id: "4", taskName: "Task 1" },
        { id: "5", taskName: "Task 2" },
        { id: "6", taskName: "Task 3" },
      ],
    },
    done: {
      id: "done",
      items: [
        { id: "7", taskName: "Task 1" },
        { id: "8", taskName: "Task 2" },
        { id: "9", taskName: "Task 3" },
      ],
    },
  });
  const handleDropEnd = (resualt) => {
    let { destination, source } = resualt;
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    let itemCopy = { ...IsState[source.droppableId].items[source.index] };
    console.log("itemCooy", itemCopy);

    let index = IsState[source.droppableId].items.findIndex(
      (item) => item.id == itemCopy.id
    );

    IsState[source.droppableId].items.splice(index, 1);
    let dropDestination = IsState[destination.droppableId].items;
    dropDestination.splice(destination.index, 0, itemCopy);
    setIsState(IsState);
  };
  return (
    <div className="container">
      <h3 className="text-center display-4">Demo Drag and Drop</h3>
      <DragDropContext onDragEnd={handleDropEnd}>
        <div className="row">
          {_.map(IsState, (statusTask, index) => {
            return (
              <Droppable droppableId={statusTask.id} key={index}>
                {(provided) => {
                  return (
                    <div className="col-4">
                      <div
                        className=" bg-primary p-5"
                        key={index}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {statusTask.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              index={index}
                              draggableId={item.id}
                            >
                              {(provided) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mt-2 p-2 bg-white text-center"
                                  >
                                    {item.taskName}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default DragAndDrop;
