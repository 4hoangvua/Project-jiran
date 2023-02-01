import {
  Space,
  Table,
  Input,
  Button,
  Popconfirm,
  Tag,
  AutoComplete,
  Tooltip,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { useHotkeys } from "react-hotkeys-hook";
import { getListUser, getListAutoComp, deleteUser } from "~/reducers/user";
import { openNotificationAdminMove } from "~/utils";
import { ModalLogin } from "~/components/Modal";
const { Search } = Input;
const ListUsers = ({ openFormUser, getId }) => {
  const accountUser = useSelector((state) => {
    let data = state.user.userLogin;
    return typeof data === "boolean" ? {} : data;
  });
  const { user } = useSelector((state) => state.adminUser);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState(false);
  const searchRef = useRef();
  const [value, setvalue] = useState("");
  const [dataAutoComp, setDataAutoComp] = useState([]);
  const [noti, setNoti] = useState([]);
  useEffect(() => {
    const featchData = () => {
      dispatch(getListUser({ tuKhoa: "", setLoading }));
    };
    featchData();
  }, []);
  useEffect(() => {
    setDataAutoComp(user);
  }, [user]);

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      width: "10%",
      sorter: (a, b) => a.taiKhoan - b.taiKhoan,
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      width: "15%",
      sorter: (a, b) => a.hoTen - b.hoTen,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      width: "10%",
    },
    {
      title: "Mã loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      width: "15%",
    },
    {
      title: "Hành Động",
      dataIndex: "hanhDong",
      render: (text, record) => {
        return (
          <Fragment>
            <Tooltip placement="top" title="Sửa người dùng">
              <Space
                className="me-2 fs-4 text-primary"
                role={"button"}
                onClick={() => handleEdit(record.taiKhoan)}
              >
                <EditOutlined />
              </Space>
            </Tooltip>
            <Tooltip placement="top" title="Sửa người dùng"></Tooltip>
            <Tooltip placement="top" title="Xóa người dùng">
              <Popconfirm
                placement="topLeft"
                title="Are you sure to delete this move ?"
                description="Delete the move ?"
                onConfirm={() => handleDelete(record.taiKhoan)}
                okText="Yes"
                cancelText="No"
              >
                <Space className="fs-4 text-danger" role={"button"}>
                  <DeleteOutlined />
                </Space>
              </Popconfirm>
            </Tooltip>
          </Fragment>
        );
      },
      width: "10%",
    },
  ];
  const handleSearch = (e) => {
    dispatch(
      getListUser({
        tuKhoa: e,
        setLoading,
        setIsSearch,
      })
    );
  };
  const handleClickNew = () => {
    if (openFormUser) {
      openFormUser();
      getId("");
    }
  };
  const handleEdit = (id) => {
    if (Object.keys(accountUser).length === 0) {
      setNoti(["Bạn chưa đăng nhập !"]);
    } else if (openFormUser && accountUser.maLoaiNguoiDung === "QuanTri") {
      openFormUser();
      getId(id);
    } else {
      openNotificationAdminMove("warning", "Bạn không đủ quyền !");
    }
  };
  useHotkeys("ctrl+k", (e) => {
    e.stopPropagation();
    e.preventDefault();
    focusInput();
  });
  const focusInput = () => {
    searchRef.current.focus();
  };
  const handleDelete = (taiKhoan) => {
    if (Object.keys(accountUser).length === 0) {
      setNoti(["Bạn chưa đăng nhập !"]);
    } else if (taiKhoan && accountUser.maLoaiNguoiDung === "QuanTri") {
      dispatch(deleteUser({ taiKhoan, setLoading }));
    } else {
      openNotificationAdminMove("warning", "Bạn không đủ quyền !");
    }
  };
  const renderTitle = (taiKhoan, email) => {
    return (
      <Space key={taiKhoan}>
        <Tag color="volcano">{taiKhoan}</Tag>
        <span className="text-success">{email}</span>
      </Space>
    );
  };
  const handleSearchAutoComp = (e) => {
    dispatch(getListAutoComp({ taiKhoan: e, setDataAutoComp }));
  };
  return (
    <div className="list-admin">
      <ModalLogin content={noti} openModal={() => setNoti([])} />
      <Space
        style={{
          display: "inline",
        }}
      >
        <h3>Quản Lý Người Dùng</h3>
        <Space align="center">
          <AutoComplete
            className="certain-category-search text-primary"
            dropdownClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={300}
            value={value}
            options={dataAutoComp.map((user) => {
              return {
                key: user.taiKhoan.toString(),
                value: renderTitle(user.taiKhoan, user.email),
              };
            })}
            onChange={(text) => {
              setvalue(text);
            }}
            onSearch={handleSearchAutoComp}
          >
            <Search
              placeholder="Tìm người dùng"
              loading={isSearch}
              onSearch={handleSearch}
              enterButton
              allowClear
              suffix={<Tag>Ctrl + k</Tag>}
              style={{ width: 304 }}
              ref={searchRef}
            />
          </AutoComplete>
          <Button
            type="primary"
            icon={<PlusOutlined style={{ position: "relative", bottom: 3 }} />}
            onClick={handleClickNew}
            disabled={loading}
          >
            Thêm người dùng
          </Button>
        </Space>
      </Space>
      <Table
        columns={columns}
        dataSource={user}
        rowKey={"maPhim"}
        loading={loading}
        pagination={{
          pageSize: 10,
        }}
        scroll={{
          y: "calc(100vh - 350px)",
        }}
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default ListUsers;
