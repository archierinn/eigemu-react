import React, { Component } from "react";
import Axios from "axios";
import { Button, Card, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
      gamesList: [],
    };
  }

  componentDidMount() {
    Axios.get("/data-movie")
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          data.sort((a, b) => a.id - b.id);
          data.reverse();
          this.setState({ moviesList: data });
        }
      })
      .catch((error) => console.log(error.message));
    Axios.get("/data-game")
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          data.sort((a, b) => a.id - b.id);
          data.reverse();
          this.setState({ gamesList: data });
        }
      })
      .catch((error) => console.log(error.message));
  }

  render() {
    const { Title, Text, Paragraph } = Typography;
    const { Meta } = Card;
    return (
      <>
        {this.state.moviesList.length > 0 && (
          <>
            <Title level={2} style={{ textAlign: "center", marginTop: "8px" }}>
              New Movie Releases
            </Title>
            <Row gutter={[16, 16]} style={{ margin: 0 }}>
              {this.state.moviesList.slice(0, 4).map((el, index) => {
                return (
                  <Col
                    key={`movie-${index}`}
                    span={6}
                    style={{ display: "flex", alignSelf: "stretch" }}
                  >
                    <Card
                      className="card"
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      cover={
                        <img
                          alt={el.title}
                          src={el.image_url}
                          height={400}
                          style={{ objectFit: "cover" }}
                        />
                      }
                      actions={[
                        <Button>
                          <Link to={`/movies/${el.id}`}>Detail movie</Link>
                        </Button>,
                      ]}
                    >
                      <Meta
                        title={
                          <Title
                            level={3}
                            style={{
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {el.title}
                          </Title>
                        }
                        description={
                          <Paragraph ellipsis={{ rows: 2, expandable: false }}>
                            {el.description}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </>
        )}
        {this.state.gamesList.length > 0 && (
          <>
            <Title level={2} style={{ textAlign: "center", marginTop: "16px" }}>
              New Game Releases
            </Title>
            <Row gutter={[16, 16]} style={{ margin: 0 }}>
              {this.state.gamesList.length > 0 &&
                this.state.gamesList.slice(0, 4).map((el, index) => {
                  return (
                    <Col
                      key={`game-${index}`}
                      span={6}
                      style={{ display: "flex", alignSelf: "stretch" }}
                    >
                      <Card
                        className="card"
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                        cover={
                          <img
                            alt={el.name}
                            src={el.image_url}
                            height={400}
                            style={{ objectFit: "cover" }}
                          />
                        }
                        actions={[
                          <Button>
                            <Link to={`/games/${el.id}`}>Detail game</Link>
                          </Button>,
                        ]}
                      >
                        <Meta
                          title={
                            <Title
                              level={3}
                            >{`${el.name} (${el.release})`}</Title>
                          }
                          description={
                            <Paragraph
                              ellipsis={{ rows: 2, expandable: false }}
                            >
                              <Text strong>Platform: </Text> {el.platform}
                            </Paragraph>
                          }
                        />
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </>
        )}
      </>
    );
  }
}

export default Home;
