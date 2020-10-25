import React, { useContext } from "react";
import { Layout, Menu, Modal } from "antd";
import { Link } from "react-router-dom";
import Routes from "../utils/routes";
import { Context } from "../utils/context";

const Layouts = () => {
  const { Header, Content, Footer, Sider } = Layout;
  //const { Text } = Typography;
  const dates = new Date();
  const { logins, history } = useContext(Context);
  const [login, setLogin] = logins;
  const menus = [
    { title: "Home", to: "/", float: "left" },
    { title: "Movies", to: "/movies", float: "left" },
    { title: "Games", to: "/games", float: "left" },
  ];
  const { confirm } = Modal;
  const handleLogout = () => {
    confirm({
      title: "Do you want to log out?",
      centered: true,
      okText: "Yes",
      cancelText: "No",
      onOk() {
        setLogin(null);
        sessionStorage.clear();
        history.push("/login");
      },
      onCancel() {
        return;
      },
    });
  };

  return (
    <>
      {login ? (
        <Layout style={{ minHeight: "100vh", width: "100vw" }}>
          <Sider
            width={200}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              background: "rgba(255, 255, 255, 0.2)",
              left: 0,
            }}
          >
            <Menu
              mode="vertical"
              theme="dark"
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="1" style={{ marginTop: "16px" }}>
                <Link to="/list-movies/list">Movie Editor</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/list-games/list">Game Editor</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/profile/changepwd">Change Password</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header style={{ paddingLeft: "16px", paddingRight: "16px" }}>
              <div
                style={{
                  width: "120px",
                  height: "31px",
                  background: "rgba(255, 255, 255, 0.2)",
                  margin: "16px 24px 16px 0",
                  float: "left",
                }}
              />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                {menus.map((el, index) => {
                  return (
                    <Menu.Item key={index + 1} style={{ float: el.float }}>
                      <Link to={el.to}>{el.title}</Link>
                    </Menu.Item>
                  );
                })}
                {login ? (
                  <Menu.Item
                    key={menus.length + 1}
                    style={{ float: "right" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Menu.Item>
                ) : (
                  <Menu.Item key={menus.length + 1} style={{ float: "right" }}>
                    <Link to="/login">Login</Link>
                  </Menu.Item>
                )}
              </Menu>
            </Header>
            <Content
              style={{
                padding: 24,
                margin: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Routes />
            </Content>
            <Footer
              style={{
                textAlign: "center",
                backgroundColor: "#212121",
                color: "#ffffff",
                marginTop: "16px",
              }}
            >
              Copyright &copy; {dates.getFullYear()}. Developed by ArchieRinn
            </Footer>
          </Layout>
        </Layout>
      ) : (
        <Layout style={{ minHeight: "100vh", width: "100vw" }}>
          <Header style={{ paddingLeft: "16px", paddingRight: "16px" }}>
            <div
              style={{
                width: "120px",
                height: "31px",
                background: "rgba(255, 255, 255, 0.2)",
                margin: "16px 24px 16px 0",
                float: "left",
              }}
            />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
              {menus.map((el, index) => {
                return (
                  <Menu.Item key={index + 1} style={{ float: el.float }}>
                    <Link to={el.to}>{el.title}</Link>
                  </Menu.Item>
                );
              })}
              {login ? (
                <Menu.Item
                  key={menus.length + 1}
                  style={{ float: "right" }}
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              ) : (
                <Menu.Item key={menus.length + 1} style={{ float: "right" }}>
                  <Link to="/login">Login</Link>
                </Menu.Item>
              )}
            </Menu>
          </Header>
          <Content
            style={{
              padding: 24,
              margin: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Routes />
          </Content>
          <Footer
            style={{
              textAlign: "center",
              backgroundColor: "#212121",
              color: "#ffffff",
              marginTop: "16px",
            }}
          >
            Copyright &copy; {dates.getFullYear()}. Developed by ArchieRinn
          </Footer>
        </Layout>
      )}
    </>
  );
};

export default Layouts;
