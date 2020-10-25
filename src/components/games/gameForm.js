import React, { useContext } from "react";
import {
  message,
  Button,
  Form,
  DatePicker,
  Input,
  Radio,
  Typography,
} from "antd";
import { GameContext } from "./gameContext";
import Axios from "axios";
import { Context } from "../../utils/context";
import { useParams, useLocation } from "react-router-dom";

const GameForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const isCreate = location.pathname === "/list-games/create" ? true : false;
  const { TextArea } = Input;
  const { Title } = Typography;
  const [form] = Form.useForm();
  const { games, editedIndexs, objectDatas } = useContext(GameContext);
  const [, setGame] = games;
  const [editedIndex, setEditedIndex] = editedIndexs;
  const [objectData, setObjectData] = objectDatas;
  const { history } = useContext(Context);

  if (!objectData.id && !isCreate) {
    history.replace("/list-games/list");
  }

  const formItemLayout = {
    labelAlign: "left",
    labelCol: { span: 4, offset: 3 },
    wrapperCol: { span: 14 },
  };

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 7 },
  };

  const handleReset = () => {
    setObjectData({
      ...objectData,
      name: "",
      singlePlayer: null,
      genre: "",
      multiplayer: null,
      platform: "",
      release: "",
      image_url: "",
    });
    setTimeout(() => form.resetFields(), 100);
  };

  const handleSubmit = (val) => {
    if (editedIndex > -1) {
      Axios.put(`/data-game/${id}`, {
        ...val,
        release: val.release.year().toString(),
      })
        .then((res) => {
          if (res.status === 200) {
            message.success("Success! Game has been edited");
            setTimeout(() => {
              setObjectData({
                id: null,
                name: "",
                singlePlayer: null,
                genre: "",
                multiplayer: null,
                platform: "",
                release: "",
                image_url: "",
              });
              setEditedIndex(-1);
              setGame(null);
              history.push("/list-games/list");
            }, 500);
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    } else {
      Axios.post(`/data-game`, {
        ...val,
        release: val.release.year().toString(),
      })
        .then((res) => {
          if (res.status === 201) {
            message.success("Success! Game has been added");
            setTimeout(() => {
              setObjectData({
                id: null,
                name: "",
                singlePlayer: null,
                genre: "",
                multiplayer: null,
                platform: "",
                release: "",
                image_url: "",
              });
              setEditedIndex(-1);
              setGame(null);
              history.push("/list-games/list");
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
        {isCreate ? "ADD GAME" : "EDIT GAME"}
      </Title>
      <Form
        form={form}
        {...formItemLayout}
        name="game-form"
        initialValues={objectData}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Name is required" }]}
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
          name="release"
          label="Release"
          rules={[{ required: true, message: "Release is required" }]}
        >
          <DatePicker picker="year" />
        </Form.Item>
        <Form.Item
          name="platform"
          label="Platform"
          rules={[{ required: true, message: "Platform is required" }]}
        >
          <Input placeholder="ex: Playstation, PC, etc" />
        </Form.Item>
        <Form.Item
          name="singlePlayer"
          label="Single Player"
          rules={[{ required: true, message: "You must choose one" }]}
        >
          <Radio.Group>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="multiplayer"
          label="Multiplayer"
          rules={[{ required: true, message: "You must choose one" }]}
        >
          <Radio.Group>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </Radio.Group>
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

export default GameForm;
