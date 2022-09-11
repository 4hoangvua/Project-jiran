import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectDetail } from "~/reducers/projectDetail";
import Detail from "./Detail";
import Header from "./Header";
import Info from "./Info";
import {
  CProjectDetail,
  CHeader,
  CInfo,
  CDetail,
  CLoading,
} from "./ProjectDetailElement";
const ProjectDetail = () => {
  const { projectDetail } = useSelector((state) => state.proDetail);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  let { projectId } = useParams();
  useEffect(() => {
    const featchData = () => {
      dispatch(getProjectDetail(projectId)).then(() => {
        setIsLoading(true);
      });
    };
    featchData();
  }, [projectId]);
  return (
    <>
      {isLoading ? (
        <>
          <CProjectDetail>
            <CHeader>
              <Header projectDetail={projectDetail} />
            </CHeader>
            <CInfo>
              <Info projectDetail={projectDetail} />
            </CInfo>
            <CDetail>
              <Detail projectDetail={projectDetail} />
            </CDetail>
          </CProjectDetail>
        </>
      ) : (
        <CLoading>
          <Spin tip="Loading..." />
        </CLoading>
      )}
    </>
  );
};

export default ProjectDetail;
