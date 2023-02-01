import { Button, Form, Input, Row, Col, Select, Skeleton } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  CloseOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  addUser,
  getTypeUser,
  getUserDetail,
  updateInfoUser,
} from "~/reducers/user";
import { openNotificationAdminMove } from "~/utils";
import { ModalLogin } from "~/components/Modal";

const FormUser = ({ openFormUser, activeId }) => {
  const iCreateMode = useMemo(() => {
    return !activeId ? true : false;
  }, [activeId]);
  const userDetail = useSelector((state) => {
    let data = state.adminUser.user;
    let dataNew = data.find((item) => item.taiKhoan === activeId);
    return dataNew ? dataNew : {};
  });
  const accountUser = useSelector((state) => {
    let data = state.user.userLogin;
    return typeof data === "boolean" ? {} : data;
  });
  const [readOnly, setReadOnly] = useState(iCreateMode ? false : true);
  const [loading, setLoading] = useState(false);
  const [typeUser, setTypeUser] = useState([]);
  const [loadingForm, setLoadingForm] = useState(false);
  const preDetailMove = useRef(userDetail);
  const [noti, setNoti] = useState([]);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: userDetail.taiKhoan ? userDetail.taiKhoan : "",
      hoTen: userDetail.hoTen ? userDetail.hoTen : "",
      email: userDetail.email ? userDetail.email : "",
      soDT: userDetail.soDT ? userDetail.soDT : "",
      matKhau: userDetail.matKhau ? userDetail.matKhau : "",
      maLoaiNguoiDung: userDetail.maLoaiNguoiDung
        ? userDetail.maLoaiNguoiDung
        : "KhachHang",
      maNhom: "GP01",
    },

    onSubmit: async (values) => {
      if (iCreateMode) {
        if (Object.keys(accountUser).length === 0) {
          setNoti(["Bạn chưa đăng nhập !"]);
        } else if (accountUser.maLoaiNguoiDung === "QuanTri") {
          try {
            await dispatch(addUser({ userInfo: values, setLoading })).unnwrap();
            formik.resetForm();
          } catch (error) {}
        } else {
          openNotificationAdminMove("warning", "Bạn Không đủ quyền !");
        }
      } else {
        if (accountUser.maLoaiNguoiDung === "QuanTri")
          dispatch(
            updateInfoUser({ userInfo: values, setReadOnly, setLoading })
          );
        else {
          openNotificationAdminMove("warning", "Bạn Không đủ quyền !");
        }
      }
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Tài khoản không được để trống"),
      hoTen: Yup.string().required("Họ tên không được để trống"),
      email: Yup.string()
        .required("Email không được để trống")
        .email("Email không đúng định dạng"),
      matKhau: Yup.string()
        .required("* Mật khẩu không được để trống")
        .matches(
          /^[a-zA-Z0-9]*$/,
          "Mật khẩu ít nhất một chữ cái, một số và ít nhất 8 kí tự"
        ),
    }),
  });
  useEffect(() => {
    const fetchData = () => {
      dispatch(getTypeUser(setTypeUser));
      if (!iCreateMode) {
        dispatch(getUserDetail({ activeId, setLoadingForm }));
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (!iCreateMode) {
      preDetailMove.current = userDetail;
    }
  }, [userDetail]);

  const handleCancelSave = () => {
    setReadOnly(true);
    formik.resetForm({
      values: {
        ...preDetailMove.current,
      },
    });
  };
  const handleChangeType = (e) => {
    formik.setFieldValue("maLoaiNguoiDung", e);
  };
  return (
    <div className="form-admin h-100">
      <Skeleton loading={loadingForm}>
        <ModalLogin content={noti} openModal={() => setNoti([])} />

        <div className=" d-flex justify-content-center align-items-center flex-column h-100">
          {iCreateMode ? (
            <h3 className="text-center">THÊM MỚI NGƯỜI DÙNG</h3>
          ) : (
            <h3 className="text-center">SỬA NGƯỜI DÙNG</h3>
          )}

          <div className="border border-primary" style={{ minWidth: 1000 }}>
            <Form
              onSubmitCapture={formik.handleSubmit}
              labelCol={{
                span: 7,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              initialValues={{
                size: "default",
              }}
              size="default"
              style={{ padding: 15 }}
            >
              <Row>
                <Col span={12}>
                  <Form.Item labelAlign="left" label="Tài khoản">
                    <Input
                      name="taiKhoan"
                      onChange={formik.handleChange}
                      value={formik.values.taiKhoan}
                      readOnly={readOnly}
                    />
                    {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                      <p>{formik.errors.taiKhoan}</p>
                    )}
                  </Form.Item>
                  <Form.Item labelAlign="left" label="Họ tên">
                    <Input
                      name="hoTen"
                      onChange={formik.handleChange}
                      value={formik.values.hoTen}
                      readOnly={readOnly}
                    />
                    {formik.errors.hoTen && formik.touched.hoTen && (
                      <p>{formik.errors.hoTen}</p>
                    )}
                  </Form.Item>
                  <Form.Item labelAlign="left" label="Email">
                    <Input
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      readOnly={readOnly}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p>{formik.errors.email}</p>
                    )}
                  </Form.Item>
                  <Form.Item labelAlign="left" label="Số điện thoại">
                    <Input
                      name="soDT"
                      onChange={formik.handleChange}
                      value={formik.values.soDT}
                      readOnly={readOnly}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item labelAlign="left" label="Mật khẩu">
                    <Input.Password
                      readOnly={readOnly}
                      name="matKhau"
                      onChange={formik.handleChange}
                      value={formik.values.matKhau}
                    />
                    {formik.errors.matKhau && formik.touched.matKhau && (
                      <small className="text-danger d-block">
                        {formik.errors.matKhau}
                      </small>
                    )}
                  </Form.Item>
                  <Form.Item labelAlign="left" label="Loại người dùng">
                    <Select
                      name="maLoaiNguoiDung"
                      options={typeUser.map((type) => {
                        return {
                          label: type.tenLoai,
                          value: type.maLoaiNguoiDung,
                        };
                      })}
                      defaultValue={
                        iCreateMode ? "KhachHang" : userDetail.maLoaiNguoiDung
                      }
                      disabled={readOnly}
                      onBlur={formik.handleBlur}
                      onChange={handleChangeType}
                    />
                  </Form.Item>
                  <Form.Item labelAlign="left">
                    {iCreateMode ? (
                      <>
                        {" "}
                        <Button
                          htmlType="submit"
                          className="mt-2"
                          type="primary"
                          icon={
                            <PlusCircleOutlined
                              style={{ position: "relative", bottom: 3 }}
                            />
                          }
                          style={{ marginRight: 10 }}
                          loading={loading}
                        >
                          Tạo
                        </Button>
                        <Button
                          onClick={openFormUser}
                          icon={
                            <CloseOutlined
                              style={{ position: "relative", bottom: 3 }}
                            />
                          }
                        >
                          Hủy tạo
                        </Button>
                      </>
                    ) : (
                      <>
                        {readOnly ? (
                          <>
                            <Button
                              className="mt-2"
                              type="primary"
                              icon={
                                <EditOutlined
                                  style={{ position: "relative", bottom: 3 }}
                                />
                              }
                              style={{ marginRight: 10 }}
                              onClick={() => setReadOnly(false)}
                            >
                              Sửa
                            </Button>
                            <Button
                              onClick={openFormUser}
                              icon={
                                <CloseOutlined
                                  style={{ position: "relative", bottom: 3 }}
                                />
                              }
                            >
                              Hủy bỏ
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              htmlType="submit"
                              loading={loading}
                              className="mt-2"
                              type="text"
                              icon={
                                <EditOutlined
                                  style={{ position: "relative", bottom: 3 }}
                                />
                              }
                              style={{
                                marginRight: 10,
                                backgroundColor: "red",
                                color: "#fff",
                              }}
                            >
                              Lưu
                            </Button>
                            <Button
                              onClick={handleCancelSave}
                              icon={
                                <CloseOutlined
                                  style={{ position: "relative", bottom: 3 }}
                                />
                              }
                              type="default"
                            >
                              Hủy lưu
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

export default FormUser;
