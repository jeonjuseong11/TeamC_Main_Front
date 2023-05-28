import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row } from "antd";
import BoardMenu from "../../components/Board/BoardMenu";
import BoardMiddleList from "../../components/Board/BoardMiddleList";
import BoardSmallList from "../../components/Board/BoardSmallList";
const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];
const SchoolBoard = () => {
  return (
    <>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} md={14}>
          <BoardMenu />
        </Col>
      </Row>
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} md={10}>
          <Input
            style={{
              float: "left",
              height: "3.5rem",
              borderRadius: "50px",
              marginTop: "2rem",
            }}
            prefix={<SearchOutlined />}
            placeholder="관심있는 내용을 검색해보세요"
          />
        </Col>
        <Col xs={24} md={4}>
          <div
            style={{
              backgroundColor: "#f2f2f2",
              marginTop: "2rem",
              borderRadius: "10px",
              height: "5rem",
            }}
          >
            광고
          </div>
        </Col>
      </Row>
      <Row gutter={[24, 24]} justify="center" style={{ marginTop: "1rem" }}>
        <Col xs={24} md={10}>
          <BoardMiddleList data={data} />
        </Col>
        <Col xs={24} md={4}>
          <div
            style={{
              backgroundColor: "#f2f2f2",
              borderRadius: "10px",
              height: "20rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Hot topic(조회수 기준 순위)
          </div>
        </Col>
      </Row>
      <Row gutter={[24, 24]} justify="center" style={{ marginTop: "1rem" }}>
        <Col xs={24} md={5} style={{ textAlign: "left" }}>
          <BoardSmallList data={data} />
        </Col>
        <Col xs={24} md={5} style={{ textAlign: "left" }}>
          <BoardSmallList data={data} />
        </Col>
        <Col md={4}></Col>
      </Row>
    </>
  );
};
export default SchoolBoard;
