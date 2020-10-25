import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "./gameContext";
import {
  message,
  Button,
  Col,
  Popconfirm,
  Row,
  Table,
  Tooltip,
  Typography,
  Input,
} from "antd";
import Axios from "axios";
import { Context } from "../../utils/context";
import moment from "moment";

const GameTable = () => {
  const { games, objectDatas, editedIndexs, filters } = useContext(GameContext);
  const { history } = useContext(Context);
  const [gameList, setGameList] = games;
  const [objectData, setObjectData] = objectDatas;
  const [, setEditedIndex] = editedIndexs;
  const [filterGenre, filterRelease] = filters;
  const { Title } = Typography;
  const { Search } = Input;
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filteredValue: filter.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) =>
        a.name.toLowerCase() !== b.name.toLowerCase()
          ? a.name.toLowerCase() < b.name.toLowerCase()
            ? -1
            : 1
          : 0,
      sortOrder: sort.columnKey === "name" && sort.order,
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      filteredValue: filter.genre || null,
      onFilter: (value, record) => record.genre.includes(value),
      filters: filterGenre,
      sorter: (a, b) =>
        a.genre.toLowerCase() !== b.genre.toLowerCase()
          ? a.genre.toLowerCase() < b.genre.toLowerCase()
            ? -1
            : 1
          : 0,
      sortOrder: sort.columnKey === "genre" && sort.order,
    },
    {
      title: "Platform",
      dataIndex: "platform",
      key: "platform",
      filteredValue: filter.platform || null,
      onFilter: (value, record) => record.genre.split(",").includes(value),
      sorter: (a, b) =>
        a.platform.toLowerCase() !== b.platform.toLowerCase()
          ? a.platform.toLowerCase() < b.platform.toLowerCase()
            ? -1
            : 1
          : 0,
      sortOrder: sort.columnKey === "platform" && sort.order,
      ellipsis: {
        showTitle: false,
      },
      render: (data, _record, index) => (
        <Tooltip key={index} placement="topLeft" title={data}>
          {data}
        </Tooltip>
      ),
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (data, _record, index) => (
        <img
          key={index}
          alt={data}
          src={data}
          width={100}
          height={100}
          style={{ objectFit: "scale-down" }}
        />
      ),
    },
    {
      title: "Release",
      dataIndex: "release",
      key: "release",
      filteredValue: filter.release || null,
      onFilter: (value, record) => record.release.includes(value),
      filters: filterRelease,
      sorter: (a, b) =>
        a.release !== b.release ? (a.release < b.release ? -1 : 1) : 0,
      sortOrder: sort.columnKey === "release" && sort.order,
    },
    {
      title: "Single Player",
      dataIndex: "singlePlayer",
      key: "singlePlayer",
      filteredValue: filter.singlePlayer || null,
      onFilter: (value, record) => record.singlePlayer === value,
      filters: [
        {
          text: "Yes",
          value: 1,
        },
        {
          text: "No",
          value: 0,
        },
      ],
      sorter: (a, b) =>
        a.singlePlayer !== b.singlePlayer
          ? a.singlePlayer < b.singlePlayer
            ? -1
            : 1
          : 0,
      sortOrder: sort.columnKey === "singlePlayer" && sort.order,
      render: (data) => (data ? "Yes" : "No"),
    },
    {
      title: "Multiplayer",
      dataIndex: "multiplayer",
      key: "multiplayer",
      filteredValue: filter.multiplayer || null,
      onFilter: (value, record) => record.singlePlayer === value,
      filters: [
        {
          text: "Yes",
          value: 1,
        },
        {
          text: "No",
          value: 0,
        },
      ],
      sorter: (a, b) =>
        a.multiplayer !== b.multiplayer
          ? a.multiplayer < b.multiplayer
            ? -1
            : 1
          : 0,
      sortOrder: sort.columnKey === "multiplayer" && sort.order,
      render: (data) => (data ? "Yes" : "No"),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (_text, data, index) => (
        <Row key={index}>
          <Col span={24}>
            <Button
              className="btn-warning"
              htmlType="button"
              onClick={() => handleEdit(data)}
              block
            >
              Edit
            </Button>
          </Col>
          <Col span={24}>
            <Popconfirm
              title="Are you sure you want to delete this data?"
              onConfirm={() => handleDelete(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                htmlType="button"
                block
                style={{ marginTop: "8px" }}
              >
                Delete
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      ),
    },
  ];

  useEffect(() => {
    setObjectData({
      id: null,
      name: "",
      singlePlayer: 0,
      genre: "",
      multiplayer: 0,
      platform: "",
      release: "",
      image_url: "",
    });
  }, []);

  const handleRefresh = () => {
    setGameList(null);
  };

  const handleChange = (pagination, filter, sort) => {
    setFilter(filter);
    setSort(sort);
  };

  const handleAdd = () => {
    history.push("/list-games/create");
  };

  const handleEdit = (val) => {
    const index = gameList.indexOf(val);
    const object = {
      ...objectData,
      id: val.id,
      name: val.name,
      genre: val.genre,
      platform: val.platform,
      release: moment(val.release),
      singlePlayer: val.singlePlayer,
      multiplayer: val.multiplayer,
      image_url: val.image_url,
    };
    setObjectData(object);
    setEditedIndex(index);
    history.push(`/list-games/edit/${val.id}`);
  };

  const handleDelete = (val) => {
    Axios.delete(`/data-game/${val.id}`)
      .then((res) => {
        if (res.status === 200) {
          message.success("Success! Data has been deleted");
          setGameList(null);
        }
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const handleSearch = (val) => {
    let gameLists = null;
    if (val !== "") {
      gameLists = gameList.filter(
        (data) =>
          data.name && data.name.toLowerCase().includes(val.toLowerCase())
      );
    }
    setGameList(gameLists);
  };

  return (
    <>
      <Title level={2} style={{ textAlign: "center", marginTop: "8px" }}>
        Table List Game
      </Title>
      <Row>
        <Col span={6}>
          <Search
            placeholder="Search game"
            onSearch={handleSearch}
            enterButton
          />
        </Col>
        <Col span={3} offset={3}>
          <Button
            className="btn-info"
            htmlType="button"
            onClick={handleRefresh}
            style={{
              paddingLeft: "32px",
              paddingRight: "32px",
              marginBottom: "8px",
            }}
            block
          >
            Refresh
          </Button>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button
            className="btn-success"
            htmlType="button"
            onClick={handleAdd}
            style={{
              paddingLeft: "32px",
              paddingRight: "32px",
              marginBottom: "8px",
            }}
          >
            Add
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        pagination={{
          position: ["bottomLeft"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        dataSource={gameList}
        onChange={handleChange}
      />
    </>
  );
};

export default GameTable;
