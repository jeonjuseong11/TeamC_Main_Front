import { StarOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, List, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { CardItem, IconText, TagsItem } from "./CardStyle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CardList = ({ filterValue }) => {
  const { schools } = useSelector((state) => state.school);
  const filteredSchools = schools.filter((school) => {
    if (school?.schoolId === 0) {
      return false;
    }
    if (filterValue.length === 0 || (filterValue.length === 1 && filterValue[0] === "")) {
      return true;
    }
    return (
      school?.tag?.some((tag) => filterValue.includes(tag)) ||
      school.schoolName.includes(filterValue)
    );
  });

  return (
    <Row justify="center" gutter={[16, 16]}>
      <Col xs={24} md={15}>
        <List
          style={{ marginTop: "1rem" }}
          grid={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5 }}
          dataSource={filteredSchools}
          pagination={{
            pageSize: 5,
            position: "bottom",
            align: "center",
          }}
          renderItem={(item) => (
            <List.Item key={item.schoolId} style={{ marginRight: "1rem" }}>
              <Link to={`/schooldetail/${item.schoolId}`}>
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
                  <Meta title={item.schoolName} />
                  <Meta
                    description={
                      <CardItem>
                        <IconText
                          icon={UserOutlined}
                          text={item.studentCount}
                          key="list-vertical-message"
                        />
                      </CardItem>
                    }
                  />
                  <Meta
                    title={
                      <CardItem>
                        {item.tag?.map((v, idx) => (
                          <TagsItem key={idx} style={{ marginRight: "0.5rem" }}>
                            {v}
                          </TagsItem>
                        ))}
                      </CardItem>
                    }
                  />
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

export default CardList;
