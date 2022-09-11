import { Col, Modal, Row, Tag } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import img from "~/assets/image";
import { onChangeBackground } from "~/reducers/bgTemplates";
import { Container } from "./HomeElement";
const { templates } = img;
const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { bgTemplate } = useSelector((state) => state.bgTemplate);
  const dispatch = useDispatch();
  const isRef = useRef(0);
  const showModal = (index) => {
    isRef.current = index;
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch(onChangeBackground(isRef.current));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Container>
      <Row
        gutter={32}
        className="w-100 bg-image hover-overlay p-5"
        style={{ height: 200 }}
      >
        {templates.map((template, index) => {
          return (
            <Col
              style={{
                backgroundImage: `url(${template.bg})`,
                backgroundSize: "content",
                backgroundClip: "content-box",
                backgroundPosition: "center",
                maxHeight: 100,
                overflow: "hidden",
                borderRadius: 20,
              }}
              span={6}
              key={index}
              onClick={() => showModal(index)}
            >
              <div className="p-2 position-relative">
                <Tag>Template</Tag>
                <div className="text-light mt-2">{template.name}</div>
                {index === bgTemplate ? (
                  <CheckOutlined className="text-white fs-3 fw-bold position-absolute top-0 end-0" />
                ) : (
                  ""
                )}
              </div>
            </Col>
          );
        })}
      </Row>
      <Modal
        title="Change Background"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={300}
      />
    </Container>
  );
};

export default Home;
