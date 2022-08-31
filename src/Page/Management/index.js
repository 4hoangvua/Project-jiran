import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  CloseSquareOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Popconfirm,
  Avatar,
  Popover,
  AutoComplete,
  Tooltip,
  Tag,
  Spin,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserProject,
  deleteProject,
  getAllProject,
  getProjectSearch,
  removeUserFromProject,
} from "~/reducers/projectCategory";

import { CLoading, ContainerManagement, Title } from "./ManagementElement";
import { openModal } from "~/reducers/modal";
import { FormEdit } from "~/components/Form";
import { openNotification } from "~/util/NotificationJiran";
import { getUserSearch } from "~/reducers/login";
import { NavLink } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";

const { Search } = Input;
const Management = () => {
  const { allProject, allProjectSearch } = useSelector(
    (state) => state.category
  );
  const { userSearch } = useSelector((state) => state.log);
  const [searchText, setSearchText] = useState("");
  const searchRef = useRef("null");
  const isRef = useRef(false);
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [value, setvalue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const featchData = async () => {
      await dispatch(getAllProject()).unwrap();
      setIsLoading(true);
    };
    featchData();
  }, []);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const data = allProject;
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      with: "10%",
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      sortDirections: ["descend"],
      ...getColumnSearchProps("id"),
    },
    {
      title: "Project name",
      key: "projectName",
      dataIndex: "projectName",
      render: (text, record, index) => {
        return (
          <NavLink to={`/projectDetail/${record.id}`}>
            <Tooltip title="Go detail" color="gold" key="gold">
              <span className=" d-block col-12 text-truncate">{text}</span>
            </Tooltip>
          </NavLink>
        );
      },
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName.trim().toLowerCase();
        let projectName2 = item2.projectName.trim().toLowerCase();
        if (projectName2 < projectName1) return -1;
        return 1;
      },

      width: "20%",
      // ...getColumnSearchProps("projectName"),
    },
    {
      title: "Category name",
      dataIndex: "categoryName",
      key: "categoryName",
      width: "15%",
      filters: [
        {
          text: "Dự án web",
          value: "Dự án web",
        },
        {
          text: "Dự án phần mềm",
          value: "Dự án phần mềm",
        },
        {
          text: "Dự án di động",
          value: "Dự án di động",
        },
      ],
      onFilter: (value, record) => record.categoryName.includes(value),
    },
    {
      title: "Member",
      key: "member",
      dataIndex: "menber",
      with: "20%",
      render: (text, record, index) => {
        return (
          <>
            <Popover
              key={index}
              placement="bottom"
              title={<h6 className="text-center fw-bold">Member</h6>}
              arrowPointAtCenter
              content={() => {
                return (
                  <table className="table bg-light">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.members?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.userId}</td>
                            <td>
                              <img
                                src={item.avatar}
                                width="30"
                                height="30"
                                className="rounded-circle"
                                alt={item.name}
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>
                              <Tooltip
                                placement="bottom"
                                title={<small>Delete</small>}
                              >
                                <Button
                                  onClick={async () => {
                                    await dispatch(
                                      removeUserFromProject({
                                        projectId: record.id,
                                        userId: item.userId,
                                      })
                                    ).unwrap();
                                    await dispatch(getAllProject()).unwrap();
                                  }}
                                  type="text"
                                  icon={
                                    <CloseSquareOutlined className="text-danger" />
                                  }
                                />
                              </Tooltip>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                );
              }}
            >
              {record.members?.slice(0, 3).map((member, index) => {
                return <Avatar key={index} src={member.avatar} />;
              })}
              {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            </Popover>
            <Popover
              placement="topLeft"
              title={"Add user"}
              content={() => {
                return (
                  <AutoComplete
                    options={userSearch.map((user) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    value={value}
                    style={{
                      width: "100%",
                    }}
                    onChange={(text) => {
                      setvalue(text);
                    }}
                    onSelect={(valueSelect, option) => {
                      setvalue(option.label);
                      handleAddUserProject(record.id, Number(valueSelect));
                    }}
                    onSearch={(value) => {
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch(getUserSearch(value));
                      }, 300);
                    }}
                    placeholder="Enter user"
                  />
                );
              }}
              trigger="click"
            >
              <span href="#" data-bs-toggle="tooltip" title="Add user">
                <Button type="link" icon={<PlusSquareOutlined />} />
              </span>
            </Popover>
          </>
        );
      },
    },
    {
      title: "Creator",
      key: "id",
      dataIndex: "creator",
      with: "10%",
      render: (text, record, index) => {
        return <div>{record.creator.name}</div>;
      },
    },
    {
      title: "Action",
      key: "action",
      with: "15%",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <EditOutlined
              className="text-primary fs-4"
              role="button"
              onClick={() => {
                dispatch(
                  openModal({
                    Component: <FormEdit project={record} />,
                    title: `Edit Project ${record.projectName}`,
                  })
                );
              }}
            />
            <Popconfirm
              placement="topRight"
              title={
                <div>
                  Delete project{" "}
                  <span className="text-danger">{record.projectName}</span>
                </div>
              }
              onConfirm={() => handlePop(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined className="text-danger fs-4" role="button" />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const handlePop = async (projectId) => {
    try {
      await dispatch(deleteProject(projectId)).unwrap();
      await dispatch(getAllProject()).unwrap();
      openNotification("success", "Delete Complete.");
    } catch (error) {
      openNotification("error", "Delete Fail.");
    }
  };
  const handleAddUserProject = async (projectId, userId) => {
    try {
      await dispatch(
        addUserProject({
          projectId: projectId,
          userId: userId,
        })
      ).unwrap();
      await dispatch(getAllProject()).unwrap();
      setvalue("");
    } catch (error) {}
  };

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
      dispatch(getProjectSearch(keyword));
    }, 300);
    if (!keyword) dispatch(getAllProject());
  };
  const focusInput = () => {
    searchRef.current.focus();
  };

  const renderTitle = (title, id, name) => (
    <space>
      <Tag color="gold">
        {id}
        {" : "}
      </Tag>
      <Tag color="lime">{name}</Tag>
      <span className="text-success"> {title}</span>
    </space>
  );
  return (
    <ContainerManagement>
      {isLoading ? (
        <>
          <Title>Project Management</Title>
          <AutoComplete
            className="certain-category-search text-primary"
            onSearch={onSearch}
            options={allProjectSearch.map((project) => {
              return {
                label: renderTitle(
                  project.projectName,
                  project.creator.id,
                  project.creator.name
                ),
                value: project.projectName,
              };
            })}
            dropdownClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={300}
            value={value}
            onChange={(text) => {
              setvalue(text);
            }}
            onSelect={(valueSelect) => {
              setvalue(valueSelect);
              dispatch(getAllProject(valueSelect));
            }}
          >
            <Search
              placeholder=""
              loading={false}
              enterButton
              className="mb-2 text-opacity-50"
              ref={searchRef}
              suffix={<Tag>Ctrl + k</Tag>}
              allowClear
            />
          </AutoComplete>
          <Table
            pagination={{
              defaultPageSize: "5",
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "15"],
            }}
            columns={columns}
            rowKey={"id"}
            dataSource={data}
          />
        </>
      ) : (
        <CLoading>
          <Spin tip="Loading..." />
        </CLoading>
      )}
    </ContainerManagement>
  );
};

export default Management;
