import {
  Space,
  Table,
  Input,
  Modal,
  Button,
  Popconfirm,
  Tag,
  AutoComplete,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { deleteMove, getListAutoComp, getListMovie } from "~/reducers/movie";
import { useHotkeys } from "react-hotkeys-hook";
import { openNotificationAdminMove } from "~/utils";
import { ModalLogin } from "~/components/Modal";
const { Search } = Input;
const ListFilms = ({ openFormFilm, getId, openFormTime }) => {
  const { movie } = useSelector((state) => state.movie);
  const accountUser = useSelector((state) => {
    let data = state.user.userLogin;
    return typeof data === "boolean" ? {} : data;
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState(false);
  const searchRef = useRef();
  const [value, setvalue] = useState("");
  const [dataAutoComp, setDataAutoComp] = useState([]);
  const [noti, setNoti] = useState([]);

  useEffect(() => {
    const featchData = () => {
      dispatch(getListMovie({ tenPhim: "", setLoading }));
    };
    featchData();
  }, []);
  useEffect(() => {
    setDataAutoComp(movie);
  }, [movie]);
  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      value: (text, record) => {
        <span>{text}</span>;
      },
      key: "1",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend"],
      with: "10%",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      render: (text, record) => {
        return (
          <img
            src={record.hinhAnh}
            alt={record.tenPhim}
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
          />
        );
      },
      key: "2",
      sorter: (a, b) => a.age - b.age,
      width: "15%",
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      key: "3",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend"],
      width: "25%",
    },
    {
      title: "Mô Tả Phim",
      dataIndex: "moTa",
      key: "4",
      render: (text, record) => {
        return (
          <Fragment>
            {record.moTa.length > 70
              ? record.moTa.substring(0, 70) + "..."
              : record.moTa}
          </Fragment>
        );
      },
      sorter: (a, b) => {
        let moTaA = a.moTa.toLowerCase().trim();
        let moTaB = b.moTa.toLowerCase().trim();
        if (moTaA > moTaB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend"],
      width: "35%",
    },
    {
      title: "Hành Động",
      dataIndex: "hanhDong",
      render: (text, record) => {
        return (
          <Fragment>
            <Tooltip placement="top" title="Sửa phim">
              <Space
                className="me-2 fs-4 text-primary"
                role={"button"}
                onClick={() => handleEdit(record.maPhim)}
              >
                <EditOutlined />
              </Space>
            </Tooltip>

            <Tooltip placement="top" title="Xóa phim">
              <Popconfirm
                placement="topLeft"
                title="Are you sure to delete this move ?"
                description="Delete the move ?"
                onConfirm={() => handleDelete(record.maPhim)}
                okText="Yes"
                cancelText="No"
              >
                <Space className="me-2 fs-4 text-danger" role={"button"}>
                  <DeleteOutlined />
                </Space>
              </Popconfirm>
            </Tooltip>
            <Tooltip placement="top" title="Tạo lịch chiếu phim">
              <Space
                className="fs-4 text-success"
                role="button"
                onClick={() => handleShowTime(record.maPhim)}
              >
                <CalendarOutlined />
              </Space>
            </Tooltip>
          </Fragment>
        );
      },
      width: "15%",
    },
  ];
  const handleSearch = (e) => {
    dispatch(
      getListMovie({
        tenPhim: e,
        setLoading,
        setIsSearch,
      })
    );
  };
  const handleClickNew = () => {
    if (openFormFilm) {
      openFormFilm();
      getId("");
    }
  };
  const handleEdit = (maPhim) => {
    if (openFormFilm) {
      openFormFilm();
      getId(maPhim);
    }
  };
  const handleShowTime = (maPhim) => {
    if (openFormTime) {
      openFormTime();
      getId(maPhim);
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
  const handleDelete = (maPhim) => {
    if (Object.keys(accountUser).length === 0) {
      setNoti(["Bạn chưa đăng nhập !"]);
    } else if (maPhim && accountUser.maLoaiNguoiDung === "QuanTri") {
      dispatch(deleteMove({ maPhim, setLoading }));
    } else {
      openNotificationAdminMove("warning", "Bạn không đủ quyền !");
    }
  };
  const renderTitle = (tenPhim, hinhAnh) => {
    return (
      <Space key={tenPhim}>
        <img
          src={hinhAnh}
          placeholder="hinh anh"
          width={50}
          height={50}
          style={{ objectFit: "contain" }}
        />
        <span className="text-success">{tenPhim}</span>
      </Space>
    );
  };
  const handleSearchAutoComp = (e) => {
    dispatch(getListAutoComp({ tenPhim: e, setDataAutoComp }));
  };
  return (
    <div className="list-admin">
      <ModalLogin content={noti} openModal={() => setNoti([])} />

      <Space
        style={{
          display: "inline",
        }}
      >
        <h3>Quản Lý Phim</h3>
        <Space align="center">
          <AutoComplete
            className="certain-category-search text-primary"
            dropdownClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={300}
            value={value}
            options={dataAutoComp.map((movie) => {
              return {
                key: movie.maPhim.toString(),
                value: renderTitle(movie.tenPhim, movie.hinhAnh),
              };
            })}
            onChange={(text) => {
              setvalue(text);
            }}
            onSearch={handleSearchAutoComp}
          >
            <Search
              placeholder="Tìm phim"
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
            Thêm Phim
          </Button>
        </Space>
      </Space>
      <Table
        columns={columns}
        dataSource={movie}
        rowKey={"maPhim"}
        loading={loading}
        pagination={{
          pageSize: 10,
        }}
        scroll={{
          y: "calc(100vh - 330px)",
        }}
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default ListFilms;
