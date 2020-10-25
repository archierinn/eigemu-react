import React, { useState, useContext } from "react";
import { Alert, Button, Card, Form, Input, Row, Col, Typography } from "antd";
import Axios from "axios";
import { Context } from "../utils/context";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    show: false,
    message: "",
    type: "",
  });
  const { logins, history } = useContext(Context);
  const [, setLogin] = logins;
  const { Title, Text, Link } = Typography;

  const handleSubmit = (data) => {
    if (isRegister) {
      Axios.post("register", data)
        .then((res) => {
          if (res.status === 201) {
            setAlertMessage({
              show: true,
              message: "Success! Account has been created. Please login",
              type: "success",
            });
            setIsRegister(false);
          } else {
            setAlertMessage({
              show: true,
              message: "Failed! Please try again",
              type: "error",
            });
          }
        })
        .catch((error) => {
          setAlertMessage({
            show: true,
            message: `Error! ${error.message}`,
            type: "error",
          });
        });
    } else {
      Axios.post("/user-login", data)
        .then((res) => {
          if (res.status === 201) {
            setAlertMessage({
              show: true,
              message: "Success! Logging in...",
              type: "success",
            });
            sessionStorage.setItem("login", JSON.stringify(res.data));
            setLogin(res.data);
            history.push("/");
          } else {
            setAlertMessage({
              show: true,
              message: "Failed! Please try again",
              type: "error",
            });
          }
        })
        .catch((error) => {
          setAlertMessage({
            show: true,
            message: `Error! ${error.message}`,
            type: "error",
          });
        });
    }
  };

  return (
    <Row style={{ margin: "auto" }}>
      <Col style={{ display: "flex", alignSelf: "stretch" }}>
        <Card style={{ width: "30vw", margin: "auto" }}>
          <Title level={3} style={{ textAlign: "center" }}>
            {isRegister ? "REGISTER" : "LOGIN"}
          </Title>
          {alertMessage.show && (
            <Alert
              message={alertMessage.message}
              type={alertMessage.type}
              closable
              style={{ marginBottom: "16px" }}
            />
          )}
          <Form layout="vertical" name="login" onFinish={handleSubmit}>
            {isRegister && (
              <Form.Item>
                <Text strong>Name</Text>
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input your Name!" },
                  ]}
                  noStyle
                >
                  <Input placeholder="Name" style={{ marginTop: "8px" }} />
                </Form.Item>
              </Form.Item>
            )}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { pattern: /.+@.+\..+/, message: "Not a valid email" },
              ]}
            >
              <Input placeholder="Email" style={{ marginTop: "8px" }} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                type="password"
                placeholder="Password"
                style={{ marginTop: "8px" }}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  paddingLeft: "32px",
                  paddingRight: "32px",
                  marginTop: "8px",
                }}
              >
                {isRegister ? "REGISTER" : "LOGIN"}
              </Button>
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              {isRegister ? (
                <>
                  Already have an account?{" "}
                  <Link onClick={() => setIsRegister(false)}>Login now!</Link>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <Link onClick={() => setIsRegister(true)}>Create now!</Link>
                </>
              )}
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
