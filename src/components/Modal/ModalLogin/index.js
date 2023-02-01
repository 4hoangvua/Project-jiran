import React from "react";
import { Modal, Button } from "antd";
import { NavLink } from "react-router-dom";
import { checkArray } from "~/utils";
const ModalLogin = ({ openModal, content }) => {
  return (
    <>
      {checkArray(content) && content.length > 0 ? (
        <Modal
          visible={true}
          title="Thông báo"
          onCancel={openModal}
          footer={[
            <Button key="back" onClick={openModal}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={openModal}>
              <NavLink to={"/signin"}>Go Login</NavLink>
            </Button>,
          ]}
        >
          <ul>
            {content.map((item, index) => {
              return (
                <li key={index}>
                  <span className="text-danger">{item}</span>
                </li>
              );
            })}
          </ul>
        </Modal>
      ) : null}
    </>
  );
};

export default ModalLogin;
