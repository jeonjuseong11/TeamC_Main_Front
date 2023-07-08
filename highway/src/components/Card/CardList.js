import { StarOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, List, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { CardItem, IconText } from "./CardStyle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DepartsTags from "../DepartsTags";

const CardList = ({ filterValue }) => {
  const { schools } = useSelector((state) => state.school);
  // 단일 검색
  // const filtedSchool = schools.map((it) => {
  //   const schoolDeparts = it.tags;
  //   const FiltedTag = schoolDeparts.map((item) => item.includes(filterValue));
  //   if (FiltedTag.includes(true)) {
  //     return it;
  //   }
  // });

  const filtedSchool = schools.map((it) => {
    const schoolDeparts = it?.tag;
    const FiltedTag = schoolDeparts?.map((item) => {
      // schools.tags와 filterValue의 값을 하나하나 비교해 동일하면 true를 반환, 아니라면 false를 반환하여 배열을 return
      const FiltedTrueFalse = filterValue.map((v) => {
        if (item === v) {
          return true;
          // 초기값이 ""이기에 설정
        } else if (v === "") {
          return true;
        } else {
          return false;
        }
      });
      return FiltedTrueFalse;
    });
    // 배열속에 true가 존재하면 해당 school 정보를 return
    if (FiltedTag?.some((i) => i.includes(true))) {
      return it;
    }
  });

  const removeUndefinedList = filtedSchool.filter((it) => it !== undefined);
  return (
    <Row justify="center" gutter={[24, 24]} style={{ marginTop: "1rem" }}>
      <Col xs={24} md={15}>
        <List
          grid={{ gutter: 12, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5 }}
          dataSource={schools}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Col>
                <Link to={`/schooldetail/${item.id}`}>
                  <Card
                    hoverable
                    bodyStyle={{
                      padding: "1rem",
                      textAlign: "left",
                    }}
                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                  >
                    <Meta title={item.schoolName} description={item.descript} />
                    <Meta
                      description={
                        <CardItem>
                          {/* <IconText
                            icon={StarOutlined}
                            text={item.reviews.length}
                            key="list-vertical-star-o"
                          /> */}
                          {/* <IconText
                            icon={UserOutlined}
                            text={item.members.length}
                            key="list-vertical-message"
                          /> */}
                        </CardItem>
                      }
                    />
                    {/* <Meta title={<DepartsTags schoolInfo={item} />} /> */}
                  </Card>
                </Link>
              </Col>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

export default CardList;
