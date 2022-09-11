import React, { useEffect, useRef, useState } from "react";
import {
  AutoComplete,
  Avatar,
  Input,
  Popconfirm,
  Space,
  Spin,
  Table,
  Tag,
} from "antd";
import { Container, Title } from "./UserManagementElement";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteUser, getUser, getUserSearch } from "~/reducers/login";
import { useHotkeys } from "react-hotkeys-hook";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { openModal } from "~/reducers/modal";
import FormEditUser from "~/components/Form/FormEditUser";
const { Search } = Input;

const UserManagement = () => {
  const { userSearch, userAll } = useSelector((state) => state.log);

  const [isBegin, setBegin] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const featData = async () => {
      await dispatch(getUser()).unwrap();
      setBegin(true);
    };
    featData();
  }, []);
  const data = userAll;
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (text, record, index) => {
        return <Avatar src={record.avatar} alt={record.name} />;
      },
      width: "10%",
    },
    {
      title: "ID",
      dataIndex: "userId",
      sorter: (a, b) => a.userId - b.userId,
      sortDirections: ["descend"],
      with: "10%",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
      with: "15%",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
      sortDirections: ["descend"],
      with: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
      with: "15%",
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <EditOutlined
              className="text-primary fs-4"
              role="button"
              onClick={() => {
                dispatch(
                  openModal({
                    Component: <FormEditUser user={record} />,
                    title: `Edit user ${record.name}`,
                  })
                );
              }}
            />
            <Popconfirm
              placement="topRight"
              title={
                <div>
                  Delete project
                  <span className="text-danger">{record.projectName}</span>
                </div>
              }
              onConfirm={() => handlePop(record.userId)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined className="text-danger fs-4" role="button" />
            </Popconfirm>
          </Space>
        );
      },
      with: "15%",
    },
  ];
  const searchRef = useRef();
  const isRef = useRef(false);
  const [value, setvalue] = useState("");
  useHotkeys("ctrl+k", (e) => {
    e.stopPropagation();
    e.preventDefault();
    focusInput();
  });
  const is = true;
  useHotkeys(
    "Escape",
    (e) => {
      searchRef.current.blur();
    },
    { enableOnTags: ["INPUT"] }
  );
  const onSearch = (keyword) => {
    if (isRef.current) {
      clearTimeout(isRef.current);
    }
    isRef.current = setTimeout(() => {
      dispatch(getUserSearch(keyword));
    }, 300);
    if (!keyword) dispatch(getUser());
  };
  const focusInput = () => {
    searchRef.current.focus();
  };

  const handlePop = (userId) => {
    dispatch(deleteUser(userId));
  };
  const renderTitle = (title, avatar) => (
    <space key={title}>
      <Avatar src={avatar} />
      <span className="text-success"> {title}</span>
    </space>
  );
  return (
    <>
      {isBegin ? (
        <Container>
          <Title>User Management</Title>
          <AutoComplete
            className="certain-category-search text-primary"
            onSearch={onSearch}
            options={userSearch.map((user) => {
              return {
                label: renderTitle(user.name, user.avatar),
                value: user.userId.toString(),
              };
            })}
            dropdownClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={300}
            value={value}
            onChange={(text) => {
              setvalue(text);
            }}
            onSelect={(valueSelect, option) => {
              setvalue(option.label.key);
              dispatch(getUser(valueSelect));
            }}
          >
            <Search
              placeholder=""
              loading={false}
              // onChange={onSearch}
              enterButton
              className="mb-2 text-opacity-50"
              ref={searchRef}
              suffix={<Tag>Ctrl + k</Tag>}
              allowClear
            />
          </AutoComplete>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={"userId"}
            pagination={{
              defaultPageSize: "5",
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "15"],
            }}
          />
        </Container>
      ) : (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <Spin tip="Loading..." />
        </div>
      )}
    </>
  );
};

export default UserManagement;
