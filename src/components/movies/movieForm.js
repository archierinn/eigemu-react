import React, { useContext, useState } from "react";
import {
  message,
  Button,
  Form,
  DatePicker,
  Input,
  Rate,
  Typography,
} from "antd";
import { MovieContext } from "./movieContext";
import Axios from "axios";
import { Context } from "../../utils/context";
import { useParams, useLocation } from "react-router-dom";

const MovieForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const isCreate = location.pathname === "/list-movies/create" ? true : false;
  const { TextArea } = Input;
  const { Title } = Typography;
  const [form] = Form.useForm();
  const { movies, editedIndexs, objectDatas } = useContext(MovieContext);
  const [, setMovieList] = movies;
  const [editedIndex, setEditedIndex] = editedIndexs;
  const [objectData, setObjectData] = objectDatas;
  const { history } = useContext(Context);
  const [rating, setRating] = useState(objectData.rating);

  if (!objectData.id && !isCreate) {
    history.replace("/list-movies/list");
  }

  const formItemLayout = {
    labelAlign: "left",
    labelCol: { span: 7, offset: 2 },
    wrapperCol: { span: 14 },
  };

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 9 },
  };

  const handleChange = (val) => {
    console.log(val);
    setRating(val);
  };

  const handleReset = () => {
    setObjectData({
      ...objectData,
      title: "",
      genre: "",
      description: "",
      year: null,
      rating: 0,
      duration: 0,
      review: "",
      image_url: "",
    });
    setTimeout(() => form.resetFields(), 100);
  };

  const handleSubmit = (val) => {
    if (editedIndex > -1) {
      Axios.put(`/data-movie/${id}`, {
        ...val,
        year: parseInt(val.year.year().toString()),
        rating: Number(val.rating) * 2,
        duration: Number(val.duration),
      })
        .then((res) => {
          if (res.status === 200) {
            message.success("Success! Movie has been edited");
            setTimeout(() => {
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
              setEditedIndex(-1);
              setMovieList(null);
              history.push("/list-movies/list");
            }, 500);
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    } else {
      Axios.post(`/data-movie`, {
        ...val,
        year: parseInt(val.year.year().toString()),
        rating: Number(val.rating) * 2,
        duration: Number(val.duration),
      })
        .then((res) => {
          if (res.status === 201) {
            message.success("Success! Movie has been added");
            setTimeout(() => {
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
              setEditedIndex(-1);
              setMovieList(null);
              history.push("/list-movies/list");
            }, 500);
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  };

  return (
    <>
      <Title level={3} style={{ textAlign: "center" }}>
        {isCreate ? "ADD MOVIE" : "EDIT MOVIE"}
      </Title>
      <Form
        form={form}
        {...formItemLayout}
        name="movie-form"
        initialValues={objectData}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="genre"
          label="Genre"
          rules={[{ required: true, message: "Genre is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="year"
          label="Year"
          rules={[{ required: true, message: "Year is required" }]}
        >
          <DatePicker picker="year" />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration (minutes)"
          rules={[{ required: true, message: "Duration is required" }]}
        >
          <Input placeholder="120" type="number" />
        </Form.Item>
        <Form.Item label="Rating (0 - 10, value of 1 full star means 2)">
          <Form.Item
            name="rating"
            rules={[{ required: true }, { type: "number" }]}
            noStyle
          >
            <Rate
              allowHalf
              tooltips={[2, 4, 6, 8, 10]}
              style={{
                marginBottom: "8px",
                marginRight: "8px",
                paddingLeft: "16px",
                paddingRight: "16px",
                paddingBottom: "4px",
                backgroundColor: "#fff",
              }}
              onChange={handleChange}
            />
          </Form.Item>
          ({Number(rating * 2)}/10)
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="review" label="Review">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="image_url"
          label="Image URL"
          rules={[{ required: true, message: "Image URL is required" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            htmlType="reset"
            onClick={handleReset}
            style={{ marginLeft: "8px" }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default MovieForm;
