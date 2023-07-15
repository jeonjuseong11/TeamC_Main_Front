import { FileImageOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { CardItem, TagsItem } from "./Card/CardStyle";

const RankSchoolCard = ({ selectedSchool }) => {
  return (
    <Card
      style={{ backgroundColor: "#f2f2f2", minWidth: "18rem" }}
      actions={[
        <Link to={`/schooldetail/${selectedSchool.schoolId}`}>
          <SearchOutlined /> 상세 정보 보기
        </Link>,
      ]}
    >
      <Card.Meta
        avatar={
          <Avatar
            style={{ backgroundColor: "white" }}
            icon={<FileImageOutlined style={{ color: "gray" }} />}
            size={64}
          ></Avatar>
        }
        title={selectedSchool.schoolName}
        description={
          <>
            <CardItem>
              {selectedSchool?.tag?.map((v, idx) => {
                return (
                  <TagsItem key={idx} style={{ marginRight: "0.5rem" }}>
                    {v}
                  </TagsItem>
                );
              })}
            </CardItem>
            <p>
              <a href={selectedSchool.websiteAddress}>{selectedSchool.websiteAddress}</a>
            </p>
            {/* <p>
              <ProfileOutlined />
              <span style={{ marginRight: "1rem" }}>리뷰 수</span>
              {selectedSchool.reviews}
            </p> */}
            <p>
              <UserOutlined />
              <span style={{ marginRight: "1rem" }}>사용중인 재학생 수</span>
              {selectedSchool.studentCount}
            </p>
            {/* <p>
              <EyeOutlined />
              <span style={{ marginRight: "1rem" }}>조회 수</span>
              {selectedSchool.views}
            </p> */}
          </>
        }
      />
    </Card>
  );
};
export default RankSchoolCard;
