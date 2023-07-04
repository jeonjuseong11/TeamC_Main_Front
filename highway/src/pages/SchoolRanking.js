import { EyeOutlined, FileImageOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
// import CircleChart from "./CircleChart";
import DepartsTags from "./DepartsTags";

const RankSchoolCard = ({ selectedSchool }) => {
  return (
    <Card
      style={{ backgroundColor: "#f2f2f2", minWidth: "18rem" }}
      actions={[
        <Link to={`/schooldetail/${selectedSchool.id}`}>
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
        title={selectedSchool.schul_NM}
        description={
          <>
            <DepartsTags schoolInfo={selectedSchool} />
            <p>
              <a href={selectedSchool.hmpg_ADRES}>{selectedSchool.hmpg_ADRES}</a>
            </p>
            {/* <p>
              <ProfileOutlined />
              <span style={{ marginRight: "1rem" }}>리뷰 수</span>
              {selectedSchool.reviews}
            </p> */}
            <p>
              <UserOutlined />
              <span style={{ marginRight: "1rem" }}>사용자 수</span>
              {selectedSchool.members.length}
            </p>
            <p>
              <EyeOutlined />
              <span style={{ marginRight: "1rem" }}>조회 수</span>
              {selectedSchool.views}
            </p>
          </>
        }
      />
      {/* <Card.Meta
        description={<CircleChart male={selectedSchool.male} female={selectedSchool.female} />}
      /> */}
    </Card>
  );
};
export default RankSchoolCard;
