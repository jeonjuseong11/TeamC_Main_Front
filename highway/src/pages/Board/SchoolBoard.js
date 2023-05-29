import { Col, Row } from "antd";
import BoardMenu from "../../components/Board/BoardMenu";
import BoardMain from "../../components/Board/BoardMain";
import BoardMainSearchInput from "../../components/Board/BoardMainSearchInput";
import BoardMainList from "../../components/Board/BoardMainList";

const SchoolBoard = () => {
  return (
    <>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} md={14}>
          <BoardMenu />
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <BoardMainSearchInput />
      </Row>
      <Row gutter={[16, 16]} justify="center" style={{ marginTop: "1rem" }}>
        <BoardMain />
      </Row>
      <Row gutter={[16, 16]} justify="center" style={{ marginTop: "1rem" }}>
        <BoardMainList />
      </Row>
    </>
  );
};
export default SchoolBoard;
