import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Switch,
  Skeleton,
  Image,
} from "antd";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addMove, getMovieDetail, uploadMovie } from "~/reducers/movie";
import {
  CloseOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { openNotificationAdminMove } from "~/utils";
import { ModalLogin } from "~/components/Modal";
const FormFilm = ({ openFormFilm, activeId }) => {
  const iCreateMode = useMemo(() => {
    return !activeId ? true : false;
  }, [activeId]);
  const accountUser = useSelector((state) => {
    let data = state.user.userLogin;
    return typeof data === "boolean" ? {} : data;
  });
  const detailMove = useSelector((state) => {
    let data = state.movie.movie;
    let dataNew = data.find((item) => item.maPhim === activeId);
    return dataNew ? dataNew : {};
  });
  const [imgSrc, setImgSrc] = useState(iCreateMode ? "" : detailMove.hinhAnh);
  const [readOnly, setReadOnly] = useState(iCreateMode ? false : true);
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const preDetailMove = useRef({});
  const dispatch = useDispatch();
  const [noti, setNoti] = useState([]);

  const formik = useFormik({
    initialValues: {
      tenPhim: detailMove.tenPhim ? detailMove.tenPhim : "",
      trailer: detailMove.trailer ? detailMove.trailer : "",
      moTa: detailMove.moTa ? detailMove.moTa : "",
      ngayKhoiChieu: detailMove.ngayKhoiChieu
        ? moment(detailMove.ngayKhoiChieu)
        : "",
      dangChieu: detailMove.dangChieu ? detailMove.dangChieu : false,
      sapChieu: detailMove.sapChieu ? detailMove.sapChieu : false,
      hot: true,
      danhGia: detailMove.danhGia ? detailMove.danhGia : "",
      hinhAnh: "",
      maNhom: "GP01",
    },

    onSubmit: async (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          if (key === "ngayKhoiChieu")
            formData.append(key, moment(values[key]).format("DD/MM/YYYY"));
          else {
            formData.append(key, values[key]);
          }
        } else {
          if (values.hinhAnh !== "iCreateMode") {
            formData.append("file", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      if (!iCreateMode) {
        if (Object.keys(accountUser).length === 0) {
          setNoti(["Bạn chưa đăng nhập !"]);
        } else if (accountUser.maLoaiNguoiDung === "QuanTri")
          dispatch(uploadMovie({ formData, setReadOnly, setLoading }));
        else {
          openNotificationAdminMove("warning", "Bạn Không đủ quyền !");
        }
      } else {
        try {
          await dispatch(addMove({ formData, setLoading })).unnwrap();
          formik.resetForm();
        } catch (error) {
          setLoading(false);
        }
      }
    },
    validationSchema: Yup.object({
      tenPhim: Yup.string().required("Tên phim không được để trống"),
      trailer: Yup.string().required("Trailer không được để trống"),
      moTa: Yup.string().required("Mô tả không được để trống"),
      ngayKhoiChieu: Yup.string().required(
        "Ngày khởi chiếu không được để trống"
      ),
      hinhAnh: Yup.mixed().required("File is required"),
    }),
  });
  useEffect(() => {
    if (!iCreateMode) {
      dispatch(getMovieDetail({ activeId, setLoadingForm }));
      formik.setFieldValue("maPhim", detailMove.maPhim);
      formik.setFieldValue("hinhAnh", "iCreateMode");
    }
  }, []);
  useEffect(() => {
    if (!iCreateMode) {
      preDetailMove.current = detailMove;
    }
  }, [detailMove]);

  const handleChaneDatePicker = (e) => {
    formik.setFieldValue("ngayKhoiChieu", e);
  };
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handChangeNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeFile = (e) => {
    // lay file tu e
    let file = e.target.files[0];
    // tao doi tuong de doc file
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
      // dem du lieu file luu vao formik
      formik.setFieldValue("hinhAnh", file);
    }
  };
  const handleCancelSave = () => {
    setReadOnly(true);
    formik.resetForm({
      values: {
        ...preDetailMove.current,
        ngayKhoiChieu: moment(preDetailMove.current?.ngayKhoiChieu),
      },
    });
  };
  return (
    <div className="form-admin">
      <Skeleton loading={loadingForm}>
        <ModalLogin content={noti} openModal={() => setNoti([])} />

        {iCreateMode ? (
          <h3 className="text-center">THÊM MỚI PHIM</h3>
        ) : (
          <h3 className="text-center">SỬA PHIM</h3>
        )}

        <div className="border border-primary">
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
                <Form.Item labelAlign="left" label="Tên phim">
                  <Input
                    name="tenPhim"
                    onChange={formik.handleChange}
                    value={formik.values.tenPhim}
                    readOnly={readOnly}
                  />
                  {formik.errors.tenPhim && formik.touched.tenPhim && (
                    <p>{formik.errors.tenPhim}</p>
                  )}
                </Form.Item>
                <Form.Item labelAlign="left" label="Trailer">
                  <Input
                    name="trailer"
                    onChange={formik.handleChange}
                    value={formik.values.trailer}
                    readOnly={readOnly}
                  />
                  {formik.errors.trailer && formik.touched.trailer && (
                    <p>{formik.errors.trailer}</p>
                  )}
                </Form.Item>
                <Form.Item labelAlign="left" label="Mô tả">
                  <Input
                    name="moTa"
                    onChange={formik.handleChange}
                    value={formik.values.moTa}
                    readOnly={readOnly}
                  />
                  {formik.errors.moTa && formik.touched.moTa && (
                    <p>{formik.errors.moTa}</p>
                  )}
                </Form.Item>
                <Form.Item labelAlign="left" label="Ngày chiếu giờ chiếu">
                  <DatePicker
                    name="ngayKhoiChieu"
                    format={"DD/MM/YYYY"}
                    onChange={handleChaneDatePicker}
                    disabled={readOnly}
                    value={formik.values.ngayKhoiChieu}
                  />
                  {formik.errors.ngayKhoiChieu &&
                    formik.touched.ngayKhoiChieu && (
                      <p>{formik.errors.ngayKhoiChieu}</p>
                    )}
                </Form.Item>
                <Form.Item
                  labelAlign="left"
                  label="Đang chiếu"
                  valuePropName="checked"
                >
                  <Switch
                    onChange={handleChangeSwitch("dangChieu")}
                    disabled={readOnly}
                    defaultChecked={formik.values.dangChieu}
                    name="dangChieu"
                  />
                </Form.Item>
                <Form.Item
                  labelAlign="left"
                  label="Sắp chiếu"
                  valuePropName="checked"
                >
                  <Switch
                    onChange={handleChangeSwitch("sapChieu")}
                    disabled={readOnly}
                    defaultChecked={formik.values.sapChieu}
                    name="sapChieu"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  labelAlign="left"
                  label="Hot"
                  valuePropName="checked"
                >
                  <Switch
                    onChange={handleChangeSwitch("hot")}
                    disabled={readOnly}
                    defaultChecked={formik.values.hot}
                  />
                </Form.Item>
                <Form.Item labelAlign="left" label="Số sao">
                  <InputNumber
                    onChange={handChangeNumber("danhGia")}
                    min={1}
                    max={10}
                    readOnly={readOnly}
                    name="danhGia"
                    value={formik.values.danhGia}
                  />
                </Form.Item>
                <Form.Item labelAlign="left" label="Hình ảnh">
                  <input
                    type="file"
                    onChange={handleChangeFile}
                    accept=".jpg, .jpeg, .png"
                    name="hinhAnh"
                    disabled={readOnly}
                  />
                  {formik.errors.hinhAnh && formik.touched.hinhAnh && (
                    <p>{formik.errors.hinhAnh}</p>
                  )}
                  <br />
                  <Image width={150} src={imgSrc} alt="..." />
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
                        onClick={openFormFilm}
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
                            onClick={openFormFilm}
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
      </Skeleton>
    </div>
  );
};

export default FormFilm;
