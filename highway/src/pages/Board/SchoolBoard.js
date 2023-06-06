import { Col, Row } from "antd";
import BoardMenu from "../../components/Board/BoardMenu";
import BoardMain from "../../components/Board/BoardMain";
import BoardMainSearchInput from "../../components/Board/BoardMainSearchInput";
import BoardMainList from "../../components/Board/BoardMainList";
import BoardProfile from "../../components/Board/BoardProfile";

const SchoolBoard = () => {
  return (
    <>
      <BoardMenu />
      <Row gutter={[16, 16]} justify="center">
        <BoardProfile />
        <BoardMainSearchInput />
      </Row>
      <Row gutter={[16, 16]} justify="center"></Row>
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
