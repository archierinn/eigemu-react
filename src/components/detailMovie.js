import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Card,
  Breadcrumb,
  Comment,
  Row,
  Col,
  Rate,
  Typography,
  Tooltip,
} from "antd";
import { Link, useParams } from "react-router-dom";

const DetailMovie = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const { Title, Text, Paragraph } = Typography;
  const { Meta } = Card;
  useEffect(() => {
    if (!movie) {
      Axios.get("/data-movie/" + id)
        .then((res) => {
          if (res.status === 200) {
            setMovie(res.data);
          }
        })
        .catch((error) => console.log(error.message));
    }
    //eslint-disable-next-line
  }, []);
  return (
    <>
      {movie && (
        <>
          <Row gutter={[16, 16]} style={{ margin: 0, marginTop: "16px" }}>
            <Col span={24}>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/">Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/movies">Movies</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{movie.title}</Breadcrumb.Item>
              </Breadcrumb>
              <Card
                className="card"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                cover={
                  <img
                    alt={movie.title}
                    src={movie.image_url}
                    height={400}
                    style={{ objectFit: "scale-down", marginTop: "16px" }}
                  />
                }
              >
                <Meta
                  title={<Title level={3}>{movie.title}</Title>}
                  description={
                    <Row>
                      <Col span={24}>
                        <Text strong>Rating: </Text>
                        <Tooltip title={`(${movie.rating}/10)`}>
                          <Rate
                            allowHalf
                            disabled
                            defaultValue={Number(movie.rating) / 2}
                            style={{
                              marginBottom: "8px",
                              marginLeft: "8px",
                              marginRight: "8px",
                            }}
                          />
                        </Tooltip>
                        <Text strong>({movie.rating}/10)</Text>
                      </Col>
                      <Col span={24}>
                        <Text strong>
                          Duration:{" "}
                          {Number(movie.duration % 60) > 0
                            ? ` ${Math.floor(
                                Number(movie.duration / 60)
                              )} hr ${Number(movie.duration % 60)} min `
                            : ` ${Math.floor(
                                Number(movie.duration / 60)
                              )} hr `}{" "}
                          ({movie.duration + " minutes"})
                        </Text>
                      </Col>
                      <Col span={24}>
                        <Text strong>Year: {movie.year}</Text>
                      </Col>
                      <Col span={24}>
                        <Text strong>Genre: {movie.genre}</Text>
                      </Col>
                      <Col span={24}>
                        <Paragraph>{movie.description}</Paragraph>
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
                          content={<Paragraph>{movie.review || "-"}</Paragraph>}
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

export default DetailMovie;
