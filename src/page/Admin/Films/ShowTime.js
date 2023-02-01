import {
  Card,
  Form,
  Skeleton,
  Button,
  InputNumber,
  DatePicker,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createShowTimeTheater,
  getListTheater,
  getListTheaterInfo,
} from "~/reducers/showtime";
import moment from "moment";
import { openNotificationAdminMove } from "~/utils";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { ModalLogin } from "~/components/Modal";
const { Meta } = Card;
const ShowTime = ({ openFormTime, activeId }) => {
  const detailMove = useSelector(
    (state) => {
      let data = state.movie.movie;
      let dataNew = data.find((item) => item.maPhim === activeId);
      return dataNew ? dataNew : {};
    },
    (prev, next) => prev === next
  );
  const accountUser = useSelector((state) => {
    let data = state.user.userLogin;
    return typeof data === "boolean" ? {} : data;
  });
  const [systemShowTime, setSystemShowTime] = useState([]);
  const [loadingForm, setLoadingForm] = useState(false);
  const [listTheaterInfo, setListTheaterInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noti, setNoti] = useState([]);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      maPhim: activeId,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      if (Object.keys(accountUser).length === 0) {
        setNoti(["Bạn chưa đăng nhập !"]);
      } else if (accountUser.maLoaiNguoiDung === "QuanTri")
        dispatch(createShowTimeTheater({ info: values, setLoading }));
      else {
        openNotificationAdminMove("warning", "Bạn Không đủ quyền !");
      }
    },
    validationSchema: Yup.object({
      ngayChieuGioChieu: Yup.string().required(
        "Ngày chiếu không được để trống"
      ),
      maRap: Yup.string().required("Mã rạp không được để trống"),
      giaVe: Yup.string().required("Giá vé không được để trống"),
    }),
  });
  useEffect(() => {
    dispatch(getListTheater({ setLoadingForm, setSystemShowTime }));
  }, []);
  const handleSelectTheater = (theater) => {
    dispatch(getListTheaterInfo({ theater, setListTheaterInfo }));
  };
  const handleChangeListTheaterInfo = (values) => {
    formik.setFieldValue("maRap", values);
  };
  const handleChangePicker = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const handleChangePrice = (values) => {
    formik.setFieldValue("giaVe", values);
  };
  return (
    <div className="show-time-admin">
      <Skeleton loading={loadingForm}>
        <ModalLogin content={noti} openModal={() => setNoti([])} />

        <div className=" d-flex justify-content-center align-items-center flex-column h-100">
          <h3>{`Tạo lịch chiếu - ${detailMove.tenPhim}`}</h3>
          <div
            className="d-flex justify-content-center align-items-center p-2 border border-primary"
            style={{ minWidth: 1000 }}
          >
            <Card
              hoverable
              style={{
                maxWidth: 240,
              }}
              cover={<img alt="hinhAnh" src={detailMove.hinhAnh} />}
            >
              <Meta
                title={detailMove.tenPhim}
                description={detailMove.trailer}
              />
            </Card>
            <Form
              onSubmitCapture={formik.handleSubmit}
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              initialValues={{
                size: "default",
              }}
              size="default"
              style={{ padding: 15, flex: 1 }}
            >
              <Form.Item labelAlign="left" label="Hệ thống rạp">
                <Select
                  placeholder="Chọn hệ thống rạp"
                  options={systemShowTime.map((lTheater) => {
                    return {
                      label: lTheater.tenHeThongRap,
                      value: lTheater.maHeThongRap,
                    };
                  })}
                  onBlur={formik.handleBlur}
                  onChange={handleSelectTheater}
                />
              </Form.Item>
              <Form.Item labelAlign="left" label="Cụm rạp">
                <Select
                  options={listTheaterInfo.map((lInfo) => {
                    return {
                      label: lInfo.tenCumRap,
                      value: lInfo.maCumRap,
                    };
                  })}
                  onChange={handleChangeListTheaterInfo}
                  placeholder="Chọn cụm rạp"
                />
                {formik.errors.maRap && formik.touched.maRap && (
                  <small className="text-danger d-block">
                    {formik.errors.maRap}
                  </small>
                )}
              </Form.Item>
              <Form.Item labelAlign="left" label="Ngày chiếu giờ chiếu">
                <DatePicker
                  format={"DD/MM/YYYY hh:mm:ss"}
                  showTime
                  onChange={handleChangePicker}
                />
                {formik.errors.ngayChieuGioChieu &&
                  formik.touched.ngayChieuGioChieu && (
                    <small className="text-danger d-block">
                      {formik.errors.ngayChieuGioChieu}
                    </small>
                  )}
              </Form.Item>
              <Form.Item labelAlign="left" label="Giá vé">
                <InputNumber
                  min={75000}
                  max={150000}
                  onChange={handleChangePrice}
                  formatter={(value) =>
                    `${value}`
                      .replace(/\./, ",")
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  }
                  parser={(x) =>
                    parseInt(
                      `${x}`
                        .replace(/,/, "#")
                        .replace(/\./g, "")
                        .replace(/#/, ",")
                    )
                  }
                />
                {formik.errors.giaVe && formik.touched.giaVe && (
                  <small className="text-danger d-block">
                    {formik.errors.giaVe}
                  </small>
                )}
              </Form.Item>
              <Form.Item labelAlign="left" label="Chức năng">
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
                  onClick={openFormTime}
                  icon={
                    <CloseOutlined
                      style={{ position: "relative", bottom: 3 }}
                    />
                  }
                >
                  Hủy tạo
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

export default ShowTime;
