import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Card, Breadcrumb, Comment, Row, Col, Typography } from "antd";
import { Link, useParams } from "react-router-dom";

const DetailGame = () => {
  const [game, setGame] = useState(null);
  const { id } = useParams();
  const { Title, Text, Paragraph } = Typography;
  const { Meta } = Card;
  useEffect(() => {
    if (!game) {
      Axios.get("/data-game/" + id)
        .then((res) => {
          if (res.status === 200) {
            setGame(res.data);
          }
        })
        .catch((error) => console.log(error.message));
    }
    //eslint-disable-next-line
  }, []);
  return (
    <>
      {game && (
        <>
          <Row gutter={[16, 16]} style={{ margin: 0, marginTop: "16px" }}>
            <Col span={24}>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/">Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/games">Games</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{game.name}</Breadcrumb.Item>
              </Breadcrumb>
              <Card
                className="card"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "8px",
                }}
                cover={
                  <img
                    alt={game.name}
                    src={game.image_url}
                    height={400}
                    style={{ objectFit: "scale-down", marginTop: "16px" }}
                  />
                }
              >
                <Meta
                  title={<Title level={3}>{game.name}</Title>}
                  description={
                    <Row>
                      <Col span={24}>
                        <Text strong>Platform: </Text>
                        <Text>{game.platform}</Text>
                      </Col>
                      <Col span={24}>
                        <Text strong>Releases: </Text>
                        <Text>{game.release}</Text>
                      </Col>
                      <Col span={24}>
                        <Text strong>Single Player: </Text>
                        <Text>{game.singlePlayer ? "Yes" : "No"}</Text>
                      </Col>
                      <Col span={24}>
                        <Text strong>Multiplayer: </Text>
                        <Text>{game.multiplayer ? "Yes" : "No"}</Text>
                      </Col>
                      <Col span={24}>
                        <Text strong>Genre: </Text>
                        <Text>{game.genre}</Text>
                      </Col>
                    </Row>
                  }
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ margin: 0, marginTop: "16px" }}>
            <Col span={24}>
              <Card
                className="card"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Meta
                  description={
                    <Row>
                      <Col span={24}>
                        <Title level={4}>Review</Title>
                      </Col>
                      <Col span={24}>
                        <Comment
                          author={<b>by Anonymous</b>}
                          content={<Paragraph>-</Paragraph>}
                        />
                      </Col>
                    </Row>
                  }
                />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default DetailGame;
