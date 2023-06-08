import {
  EyeOutlined,
  FileImageOutlined,
  ProfileOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import CircleChart from "./CircleChart";

const RankSchoolCard = ({ selectedSchool }) => {
  return (
    <Card
      style={{ backgroundColor: "#f2f2f2" }}
      actions={[
        <Link to={`/schooldetail/${selectedSchool.id}/review/`}>
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
            {selectedSchool.tags.map((item) => {
              return <Tag color="#8282ff">{item}</Tag>;
            })}
            <p>
              <a href={selectedSchool.hmpg_ADRES}>
                {selectedSchool.hmpg_ADRES}
              </a>
            </p>
            <table style={{ marginTop: "1rem" }}>
              <tr style={{ margin: "0" }}>
                <td>
                  <ProfileOutlined />
                </td>
                <td>리뷰 수</td>
                <td>{selectedSchool.reviews.length}</td>
              </tr>
              <tr>
                <td>
                  <UserOutlined />
                </td>
                <td> 사용자 수</td>
                <td> {selectedSchool.members.length}</td>
              </tr>
              <tr>
                <td>
                  <EyeOutlined />
                </td>
                <td>조회 수 </td>
                <td>{selectedSchool.views}</td>
              </tr>
            </table>
          </>
        }
      />
      <Card.Meta
        description={
          <CircleChart
            male={selectedSchool.male}
            female={selectedSchool.female}
          />
        }
      />
    </Card>
  );
};
export default RankSchoolCard;
