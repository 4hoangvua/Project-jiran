import { Col, Row, Tag } from "antd";
import HTMLReactParser from "html-react-parser";
import React from "react";
const Info = ({ projectDetail }) => {
  return (
    <>
      <Row className="text-white fs-3">
        <Col className="d-flex justify-content-center align-items-center">
          <Tag color="volcano">Creator:</Tag>
        </Col>
        <Col>{projectDetail.creator?.name}</Col>
      </Row>
      <Row className="text-white fs-4">
        <Col>
          <Tag color="lime">Description: </Tag>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          {Object.keys(projectDetail).length > 0
            ? HTMLReactParser(projectDetail.description)
            : ""}
        </Col>
      </Row>
    </>
  );
};

export default Info;
