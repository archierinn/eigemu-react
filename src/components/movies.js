import React, { Component } from "react";
import Axios from "axios";
import { Button, Card, Row, Col, Pagination, Typography } from "antd";
import { Link } from "react-router-dom";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
      min: 0,
      max: 20,
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
  }

  handleChange = (value) => {
    this.setState({
      min: this.state.max,
      max: value * 20,
    });
  };

  render() {
    const { Title, Paragraph } = Typography;
    const { Meta } = Card;
    return (
      <>
        <Title level={2} style={{ textAlign: "center", marginTop: "8px" }}>
          Movie List
        </Title>
        <Row gutter={[16, 16]} style={{ margin: 0 }}>
          {this.state.moviesList.length > 0 &&
            this.state.moviesList
              .slice(this.state.min, this.state.max)
              .map((el, index) => {
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
                        title={<Title level={3}>{el.title}</Title>}
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
        {this.state.moviesList.length > 1 ? (
          <Row style={{ textAlign: "center", marginTop: "16px" }}>
            <Col span={24}>
              <Pagination
                defaultCurrent={1}
                defaultPageSize={10}
                showSizeChanger={false}
                onChange={this.handleChange}
                total={this.state.moviesList.length}
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

export default Movies;
