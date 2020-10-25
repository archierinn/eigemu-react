import React, { Component } from "react";
import Axios from "axios";
import { Button, Card, Row, Col, Pagination, Typography } from "antd";
import { Link } from "react-router-dom";

class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gamesList: [],
      min: 0,
      max: 20,
    };
  }

  handleChange = (value) => {
    this.setState({
      min: this.state.max,
      max: value * 20,
    });
  };

  componentDidMount() {
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
        <Title level={2} style={{ textAlign: "center", marginTop: "8px" }}>
          Game List
        </Title>
        <Row gutter={[16, 16]} style={{ margin: 0 }}>
          {this.state.gamesList.length > 0 &&
            this.state.gamesList
              .slice(this.state.min, this.state.max)
              .map((el, index) => {
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
                          <Paragraph ellipsis={{ rows: 2, expandable: false }}>
                            <Text strong>Platform: </Text> {el.platform}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </Col>
                );
              })}
        </Row>
        {this.state.gamesList.length > 1 ? (
          <Row style={{ textAlign: "center", marginTop: "16px" }}>
            <Col span={24}>
              <Pagination
                defaultCurrent={1}
                defaultPageSize={10}
                showSizeChanger={false}
                onChange={this.handleChange}
                total={this.state.gamesList.length}
              />
            </Col>
          </Row>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default Games;
