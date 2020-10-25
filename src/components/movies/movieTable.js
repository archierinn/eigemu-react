import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "./movieContext";
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
  Rate,
} from "antd";
import Axios from "axios";
import { Context } from "../../utils/context";
import moment from "moment";

const MovieTable = () => {
  const { movies, objectDatas, editedIndexs, filters } = useContext(
    MovieContext
  );
  const { history } = useContext(Context);
  const [movieList, setMovielist] = movies;
  const [objectData, setObjectData] = objectDatas;
  const [, setEditedIndex] = editedIndexs;
  const [filterGenre, filterYear] = filters;
  const { Title, Text } = Typography;
  const { Search } = Input;
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filteredValue: filter.title || null,
      onFilter: (value, record) => record.title.includes(value),
      sorter: (a, b) =>
        a.title.toLowerCase() !== b.title.toLowerCase()
          ? a.title.toLowerCase() < b.title.toLowerCase()
            ? -1
            : 1
          : 0,
      sortOrder: sort.columnKey === "title" && sort.order,
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
      title: "Description",
      dataIndex: "description",
      key: "description",
      filteredValue: filter.description || null,
      onFilter: (value, record) =>
        record.description.split(",").includes(value),
      sorter: (a, b) =>
        a.description.toLowerCase() !== b.description.toLowerCase()
          ? a.description.toLowerCase() < b.description.toLowerCase()
            ? -1
            : 1
          : 0,
      sortOrder: sort.columnKey === "description" && sort.order,
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
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: 100,
      filteredValue: filter.year || null,
      onFilter: (value, record) => record.year === value,
      filters: filterYear,
      sorter: (a, b) => (a.year !== b.year ? (a.year < b.year ? -1 : 1) : 0),
      sortOrder: sort.columnKey === "year" && sort.order,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      width: 150,
      sorter: (a, b) =>
        a.duration !== b.duration ? (a.duration < b.duration ? -1 : 1) : 0,
      sortOrder: sort.columnKey === "duration" && sort.order,
      render: (data) => (
        <>
          {Number(data % 60) > 0
            ? ` ${Math.floor(Number(data / 60))} hr. ${Number(data % 60)} min. `
            : ` ${Math.floor(Number(data / 60))} hr. `}
          ({data + " minutes"})
        </>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: "auto",
      filteredValue: filter.rating || null,
      onFilter: (value, record) => record.rating === value,
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
        a.rating !== b.rating ? (a.rating < b.rating ? -1 : 1) : 0,
      sortOrder: sort.columnKey === "rating" && sort.order,
      render: (data) => (
        <>
          <Rate
            allowHalf
            disabled
            defaultValue={Number(data) / 2}
            style={{
              marginBottom: "8px",
              marginLeft: "0px",
              marginRight: "0px",
            }}
          />
          <Text strong>({data}/10)</Text>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      width: 100,
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
      title: "",
      genre: "",
      description: "",
      year: null,
      rating: 0,
      duration: 0,
      review: "",
      image_url: "",
    });
  }, []);

  const handleRefresh = () => {
    setMovielist(null);
  };

  const handleChange = (_pagination, filter, sort) => {
    setFilter(filter);
    setSort(sort);
  };

  const handleAdd = () => {
    history.push("/list-movies/create");
  };

  const handleEdit = (val) => {
    const index = movieList.indexOf(val);
    const object = {
      ...objectData,
      id: val.id,
      title: val.title,
      genre: val.genre,
      description: val.description,
      year: moment(val.year),
      rating: Number(val.rating) / 2,
      duration: Number(val.duration),
      review: val.review,
      image_url: val.image_url,
    };
    setObjectData(object);
    setEditedIndex(index);
    history.push(`/list-movies/edit/${val.id}`);
  };

  const handleDelete = (val) => {
    Axios.delete(`/data-movie/${val.id}`)
      .then((res) => {
        if (res.status === 200) {
          message.success("Success! Data has been deleted");
          setMovielist(null);
        }
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const handleSearch = (val) => {
    let movieLists = null;
    if (val !== "") {
      movieLists = movieList.filter(
        (data) =>
          data.title && data.title.toLowerCase().includes(val.toLowerCase())
      );
    }
    setMovielist(movieLists);
  };

  return (
    <>
      <Title level={2} style={{ textAlign: "center", marginTop: "8px" }}>
        Table List Movie
      </Title>
      <Row>
        <Col span={6}>
          <Search
            placeholder="Search movie"
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
        dataSource={movieList}
        onChange={handleChange}
      />
    </>
  );
};

export default MovieTable;
