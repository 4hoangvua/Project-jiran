import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ContainerSidebar,
  SideLogo,
  CSidebar,
  ListSidebar,
  ItemBoard,
  LogoBoard,
  LogoSetting,
  YourBoard,
  Board,
  CLogo,
  Toggle,
  ItemManagement,
  LogoManagement,
  ItemProject,
  CCardProject,
  ItemCreateTask,
  LogoCreateTaskProject,
  ItemCreateProject,
  ItemUserManagement,
  LogoUserManagement,
  CToggle,
  LogoCloseProject,
  NameProject,
  CAddCard,
  ItemCreateUser,
  LogoCreateUser,
} from "./SidebarElement";
import { Avatar } from "antd";
import { FormCreateTaskProject } from "~/components/Form";
import { openModal } from "~/reducers/modal";
import { useLocation, useNavigate } from "react-router-dom";
import { removeCardProject } from "~/reducers/projectDetail";
import FormCreateUser from "~/components/Form/FormCreateUser";

const Sidebar = ({ IsToggle, setIsToggle }) => {
  const [isPosition, setposition] = useState("");
  const { cardProject } = useSelector((state) => state.proDetail);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setposition(location.pathname.slice(1));
  }, [location]);
  const handleActive = (value) => {
    if (value === "creatTaskProject") {
      dispatch(
        openModal({
          Component: <FormCreateTaskProject />,
          title: "Create Task Project",
        })
      );
    }
    if (value === "createUser") {
      dispatch(
        openModal({
          Component: <FormCreateUser />,
          title: "Create user",
        })
      );
    }
    setposition(value);
  };
  return (
    <>
      {IsToggle ? (
        <CToggle onClick={() => setIsToggle(!IsToggle)}>
          <Toggle />
        </CToggle>
      ) : (
        <ContainerSidebar>
          <CLogo>
            <SideLogo>4h</SideLogo>
            <Toggle onClick={() => setIsToggle(!IsToggle)} />
          </CLogo>
          <CSidebar>
            <ListSidebar>
              <ItemBoard
                active={isPosition === "board" ? "true" : "false"}
                onClick={() => handleActive("board")}
                to="/"
              >
                <LogoBoard />
              </ItemBoard>
              <ItemManagement
                active={isPosition === "management" ? "true" : "false"}
                onClick={() => handleActive("management")}
                to="/management"
              >
                <LogoManagement />
              </ItemManagement>
              <ItemCreateProject
                active={isPosition === "createProject" ? "true" : "false"}
                onClick={() => handleActive("createProject")}
                to="/createProject"
              >
                <LogoSetting />
              </ItemCreateProject>
              <ItemCreateTask
                active={isPosition === "creatTaskProject" ? "true" : "false"}
                onClick={() => handleActive("creatTaskProject")}
              >
                <LogoCreateTaskProject />
              </ItemCreateTask>
              <ItemUserManagement
                active={isPosition === "userManagement" ? "true" : "false"}
                onClick={() => handleActive("userManagement")}
                to="/userManagement"
              >
                <LogoUserManagement />
              </ItemUserManagement>
              <ItemCreateUser
                active={isPosition === "createUser" ? "true" : "false"}
                onClick={() => handleActive("createUser")}
              >
                <LogoCreateUser />
              </ItemCreateUser>
            </ListSidebar>
            <YourBoard>
              <Board />
            </YourBoard>

            <CCardProject>
              {cardProject?.map((project, index) => {
                return (
                  <CAddCard key={index}>
                    <ItemProject
                      to={`/projectDetail/${project.id}`}
                      active={
                        isPosition === `projectDetail/${project.id}`
                          ? "true"
                          : "false"
                      }
                      onClick={() =>
                        handleActive(`projectDetail/${project.id}`)
                      }
                    >
                      <Avatar size={40}>
                        {project.creator?.name.slice(0, 2)}
                      </Avatar>
                      <NameProject>{project.creator?.name}</NameProject>
                    </ItemProject>
                    <LogoCloseProject
                      onClick={() => {
                        dispatch(removeCardProject(project.id));
                        if (cardProject.length === 1) navigate("/management");
                      }}
                    />
                  </CAddCard>
                );
              })}
            </CCardProject>
          </CSidebar>
        </ContainerSidebar>
      )}
    </>
  );
};

export default memo(Sidebar);
